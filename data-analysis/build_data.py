"""Builds every number shown on the three data-analysis pages, so nothing there is typed by hand.

    pip install -r data-analysis/requirements.txt
    python data-analysis/build_data.py          # from the site root

Reads : data-analysis/data/Inventory.xlsx, reading_log_2026.xlsx, sales_analysis_project.xlsx
Writes: js/data.js (window.RD, window.AW, window.SALES), data-analysis/images/inventory-preview.svg
"""
import json, os, warnings
import openpyxl
import pandas as pd
from scipy import stats

warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)  # site root
DATA = os.path.join(HERE, "data")
THRESH_OVERSTOCK = 20           # stock >= 20x the reorder level counts as overstock (stated on the page)
THRESHOLDS = (10, 20, 30)       # sensitivity check on that choice


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("wrote", os.path.relpath(path, ROOT))


# --------------------------------------------------------------------------- inventory
def snapshot(p, th=THRESH_OVERSTOCK):
    """Headline metrics for one version of the table (with or without repeated rows)."""
    act = p[~p.is_disc]
    r = act[act.reorder > 0]
    over = r[r.stock / r.reorder >= th]
    zero = act[act.reorder == 0]
    disc = p[p.is_disc & (p.stock > 0)]
    return dict(lines=len(p), value=p.value.sum(), over_lines=len(over), over_value=over.value.sum(),
                zero_lines=len(zero), zero_value=zero.value.sum(), disc_value=disc.value.sum(),
                frames_share=p[p.cat == "Frames"].value.sum() / p.value.sum())


def adventure():
    f = os.path.join(DATA, "Inventory.xlsx")
    p = pd.read_excel(f, sheet_name="Products")
    # ProductsA holds the same 150 rows in another order plus a SUM row: verify, then ignore it.
    a_full = pd.read_excel(f, sheet_name="ProductsA")
    key = ["Category", "Product Name", "Supplier", "Unit Price", "Units In Stock",
           "Units On Order", "Reorder Level", "Discontinued"]
    assert p[key].sort_values(key).reset_index(drop=True).equals(
        a_full.iloc[:150][key].sort_values(key).reset_index(drop=True)), "Products and ProductsA differ"

    # Date Entered holds =TODAY()+n formulas in some rows: count them from the raw cells.
    ws = openpyxl.load_workbook(f)["Products"]
    formula_dates = sum(1 for (v,) in ws.iter_rows(min_row=2, min_col=2, max_col=2, values_only=True)
                        if isinstance(v, str) and v.startswith("="))

    p.columns = ["cat", "date", "name", "supplier", "price", "stock", "onorder", "reorder", "disc"]
    p["value"] = p.price * p.stock
    p["is_disc"] = p.disc.eq("Yes")
    total = p.value.sum()
    dedup = p.drop_duplicates()

    cats = []
    for c, g in p.groupby("cat"):
        cats.append(dict(cat=c, supplier=g.supplier.iloc[0], lines=len(g), value=g.value.sum(),
                         share=g.value.sum() / total, disc=int(g.is_disc.sum()),
                         no_reorder=int((g.reorder == 0).sum()), stock=int(g.stock.sum())))
    cats.sort(key=lambda r: -r["value"])
    assert abs(sum(c["value"] for c in cats) - total) < 1e-6, "category totals do not add up"

    r = p[p.reorder > 0].copy()
    r["cover"] = r.stock / r.reorder
    bins = [("< 1x", r.cover < 1), ("1-5x", (r.cover >= 1) & (r.cover < 5)),
            ("5-10x", (r.cover >= 5) & (r.cover < 10)), ("10-20x", (r.cover >= 10) & (r.cover < 20)),
            ("20x+", r.cover >= 20)]
    cover = [dict(bin=b, lines=int(m.sum()), value=r[m].value.sum()) for b, m in bins]
    over = r[r.cover >= THRESH_OVERSTOCK]

    zero = p[p.reorder == 0]
    zero_active = zero[~zero.is_disc]
    over_active = over[~over.is_disc]
    stockout = p[p.stock == 0]
    silent = stockout[(stockout.reorder == 0) & (~stockout.is_disc)]
    disc_stock = p[p.is_disc & (p.stock > 0)]

    q1, q3 = p.price.quantile([.25, .75])
    fence = q3 + 1.5 * (q3 - q1)
    spread = p.groupby(["cat", "name"]).price.agg(["min", "max"])
    spread["x"] = spread["max"] / spread["min"]
    wi = spread["x"].idxmax()
    worst = spread.loc[wi]

    def rows(df, n):
        df = df.drop_duplicates(["cat", "name", "price", "stock"]).sort_values("value", ascending=False).head(n)
        return [dict(cat=x.cat, name=x.name, price=x.price, stock=int(x.stock),
                     reorder=int(x.reorder), value=x.value, disc=bool(x.is_disc)) for x in df.itertuples()]

    top = p.sort_values("value", ascending=False)
    thresholds = []
    for th in THRESHOLDS:
        s = snapshot(p, th)
        thresholds.append(dict(th=th, over_lines=s["over_lines"], over_value=s["over_value"],
                               share=s["over_value"] / total))
    return dict(
        kpi=dict(lines=len(p), distinct=int(p.groupby(["cat", "name"]).ngroups), units=int(p.stock.sum()),
                 value=total, categories=int(p.cat.nunique())),
        cats=cats,
        quality=dict(sumrow_avg_price=float(a_full["Unit Price"].mean()), clean_avg_price=float(p.price.mean()),
                     exact_dups=int(p.duplicated().sum()), dup_value=total - dedup.value.sum(),
                     dedup_value=dedup.value.sum(), dedup_lines=len(dedup), formula_dates=formula_dates,
                     lower_names=sorted(n for n in p.name.unique() if n[0].islower()),
                     outlier_fence=fence, outlier_lines=int((p.price > fence).sum()),
                     worst_product=f"{wi[1]} ({wi[0]})", worst_spread=worst.x,
                     worst_min=worst["min"], worst_max=worst["max"]),
        replen=dict(no_reorder=len(zero), no_reorder_value=zero.value.sum(),
                    active_lines=int((~p.is_disc).sum()),
                    no_reorder_active=len(zero_active), no_reorder_active_value=zero_active.value.sum(),
                    no_reorder_active_by_cat={k: int(v) for k, v in zero_active.groupby("cat").size().items()},
                    stockouts_disc=int(stockout.is_disc.sum()),
                    active_stockouts=sorted(stockout[~stockout.is_disc].name.unique()),
                    active_stockouts_on_order=bool((stockout[~stockout.is_disc].onorder > 0).all()),
                    over_active=len(over_active), over_active_value=over_active.value.sum(),
                    stockouts=len(stockout), silent_stockouts=len(silent),
                    onorder_lines=int((p.onorder > 0).sum()), onorder_units=int(p.onorder.sum()),
                    over_lines=len(over), over_value=over.value.sum(), over_threshold=THRESH_OVERSTOCK,
                    cover=cover),
        disc=dict(lines=int(p.is_disc.sum()), with_stock=len(disc_stock), value=disc_stock.value.sum(),
                  share=disc_stock.value.sum() / total, on_order=int(p[p.is_disc].onorder.sum())),
        supplier=dict(top=p.groupby("supplier").value.sum().idxmax(),
                      line_share=p.supplier.value_counts(normalize=True).iloc[0],
                      value_share=p.groupby("supplier").value.sum().max() / total),
        action=dict(overstock=rows(over, 5), disc=rows(disc_stock, 5)),
        top20_share=top.head(20).value.sum() / total,
        # How much do the headline numbers move under other reasonable assumptions?
        sens=dict(thresholds=thresholds, all=snapshot(p), dedup=snapshot(dedup)),
    )


def preview_svg(d):
    """A small data-driven cover image for the project card (replaces a stock photo)."""
    cats = d["cats"]
    w, h, left, top, bar_h, gap = 640, 400, 190, 112, 30, 16
    mx = cats[0]["value"]
    font = 'font-family="Arial,Helvetica,sans-serif"'
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" '
             f'aria-label="Inventory value by category">',
             f'<rect width="{w}" height="{h}" rx="14" fill="#063b2a"/>',
             f'<text x="32" y="48" fill="#b7f5ce" {font} font-size="13" letter-spacing="2">INVENTORY VALUE</text>',
             f'<text x="32" y="86" fill="#ffffff" {font} font-size="34" font-weight="700">${d["kpi"]["value"] / 1e6:.2f}M</text>',
             f'<text x="{w - 32}" y="86" text-anchor="end" fill="#b7f5ce" {font} font-size="14">{d["kpi"]["lines"]} lines · {d["kpi"]["categories"]} categories</text>']
    for i, c in enumerate(cats):
        y = top + i * (bar_h + gap)
        bw = (w - left - 110) * c["value"] / mx
        parts += [f'<text x="32" y="{y + 21}" fill="#e6fff0" {font} font-size="14">{c["cat"]}</text>',
                  f'<rect x="{left}" y="{y}" width="{bw:.1f}" height="{bar_h}" rx="6" fill="#a5edbd"/>',
                  f'<text x="{left + bw + 10:.1f}" y="{y + 21}" fill="#ffffff" {font} font-size="14">${c["value"] / 1000:,.0f}K</text>']
    parts.append("</svg>")
    return "\n".join(parts) + "\n"


# --------------------------------------------------------------------------- reading log
def reading():
    df = pd.read_excel(os.path.join(DATA, "reading_log_2026.xlsx"), sheet_name="Books")
    df.columns = ["title", "author", "cat", "pages", "fmt", "rating"]
    g = df.groupby("cat").agg(n=("title", "count"), avg=("rating", "mean")).sort_values("n", ascending=False)
    bins = pd.cut(df.pages, [0, 100, 200, 300, 400, 10_000], right=True,
                  labels=["< 100", "100–200", "200–300", "300–400", "400+"])
    ln = df.groupby(bins, observed=True).agg(n=("title", "count"), avg=("rating", "mean"))
    fm = df.groupby("fmt").agg(n=("title", "count"), avg=("rating", "mean"))
    au = df.groupby("author").agg(n=("title", "count"), avg=("rating", "mean"))
    best = au[au.n >= 3].avg.idxmax()          # highest-rated author with at least 3 books
    most = au.n.idxmax()
    by_best = df.author == best
    hist = df[df.cat == "تاريخ وسير"]
    rho, _ = stats.spearmanr(df.pages, df.rating)
    return dict(
        kpi=dict(books=len(df), pages=int(df.pages.sum()), avg_pages=round(df.pages.mean()),
                 avg_rating=round(df.rating.mean(), 2), authors=int(df.author.nunique())),
        cats=[[c, int(x.n), round(x.avg, 2)] for c, x in g.iterrows()],
        lens=[[str(b), int(x.n), round(x.avg, 2)] for b, x in ln.iterrows()],
        fmt=dict(paper=[int(fm.loc["ورقي"].n), round(fm.loc["ورقي"].avg, 2)],
                 ebook=[int(fm.loc["إلكتروني"].n), round(fm.loc["إلكتروني"].avg, 2)]),
        r=round(stats.pearsonr(df.pages, df.rating)[0], 2), rho=round(rho, 2),
        r_wo_best=round(stats.pearsonr(df[~by_best].pages, df[~by_best].rating)[0], 2), n_wo_best=int((~by_best).sum()),
        best=dict(name=best, n=int(au.loc[best].n), avg=round(au.loc[best].avg, 2)),
        most=dict(name=most, n=int(au.loc[most].n), avg=round(au.loc[most].avg, 2)),
        hist=dict(n=len(hist), by_best=int((hist.author == best).sum())),
    )


# --------------------------------------------------------------------------- sales
SALES_TARGET = 2_220_000  # annual target, sheet "الأهداف"
EN = {"أثاث": "Furniture", "إلكترونيات": "Electronics", "مستلزمات مكتبية": "Office supplies",
      "أجهزة منزلية": "Home appliances", "عناية شخصية": "Personal care", "رياضة": "Sports",
      "الوسطى": "Central", "الغربية": "Western", "الشرقية": "Eastern", "الجنوبية": "Southern",
      "متجر": "Store", "أونلاين": "Online", "جملة": "Wholesale",
      "مكتب عمل": "Office desk", "هاتف ذكي": "Smartphone", "طابعة ليزر": "Laser printer",
      "شاشة 27 بوصة": "27-inch monitor", "حاسوب محمول": "Laptop", "كرسي مريح": "Ergonomic chair"}


def sales():
    df = pd.read_excel(os.path.join(DATA, "sales_analysis_project.xlsx"), sheet_name="البيانات")
    df = df[df["رقم الطلب"].astype(str).str.startswith("ORD")].iloc[:, :21]
    rev, prof, ok = "الإيراد الصافي", "الربح", df["الحالة"].eq("مكتمل")
    name = lambda a: {"ar": a, "en": EN.get(a, a)}

    def group(col, n=None):
        g = df.groupby(col).agg(rev=(rev, "sum"), prof=(prof, "sum")).sort_values("rev", ascending=False)
        return [dict(name=name(k), rev=float(r.rev), profit=float(r.prof)) for k, r in g.head(n).iterrows()]

    df["التاريخ"] = pd.to_datetime(df["التاريخ"])
    df["m"] = df["التاريخ"].dt.strftime("%Y-%m")
    mo = df.groupby("m").agg(rev=(rev, "sum"), prof=(prof, "sum"))
    prods = group("المنتج")
    cum = pd.Series([p["rev"] for p in prods]).cumsum() / df[rev].sum()
    ret = (~ok).groupby(df["القناة"]).mean()
    cust = df.groupby("رقم العميل")[rev].sum().sort_values(ascending=False)
    out = dict(
        period=[df["التاريخ"].min().strftime("%Y-%m-%d"), df["التاريخ"].max().strftime("%Y-%m-%d")],
        rows=len(df), customers=int(df["رقم العميل"].nunique()), products=int(df["المنتج"].nunique()),
        revenue=float(df[rev].sum()), profit=float(df[prof].sum()), completed=int(ok.sum()),
        returned=int((~ok).sum()), target=SALES_TARGET,
        discountCorrelation=float(df.assign(d=df["الخصم"])["d"].corr(df["هامش الربح"])),
        top10CustomersShare=float(cust.head(10).sum() / cust.sum()),
        monthly=[dict(m=k, rev=float(r.rev), profit=float(r.prof)) for k, r in mo.iterrows()],
        categories=group("الفئة"), regions=group("المنطقة"), channels=group("القناة"),
        products_top=group("المنتج", 6), pareto_a=int((cum <= .8).sum() + 1), pareto_total=len(prods),
        returnByChannel={name(k)["en"]: float(v) for k, v in ret.items()},
        quality=dict(missing=int(df.iloc[:, :14].isna().sum().sum()), duplicates=int(df["رقم الطلب"].duplicated().sum())),
        workbook=dict(sheets=15, charts=26),
    )
    return out



if __name__ == "__main__":
    aw = adventure()
    write(os.path.join(HERE, "images", "inventory-preview.svg"), preview_svg(aw))
    dump = lambda var, obj: f"window.{var}=" + json.dumps(obj, ensure_ascii=False, separators=(",", ":")) + ";\n"
    write(os.path.join(ROOT, "js", "data.js"),
          "// Generated by data-analysis/build_data.py (window.RD, window.AW, window.SALES). Do not edit by hand.\n"
          + dump("RD", reading()) + dump("AW", aw) + dump("SALES", sales()))
