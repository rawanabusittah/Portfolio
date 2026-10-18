(() => {
  const translations = {
    "ux-web-design": `
      <header>
        <h1>Why Beautiful Websites Fail Without UX..?</h1>
        <p class="article-meta">Design & UX · By Rawan Abu Sittah · <time datetime="2026-10-15">Published October 15, 2026</time> · 10 min read</p>
        <img class="article-hero" src="../images/articles/ux-web-design.webp" alt="A hand tapping a phone screen showing an app interface labelled UX and UI with a chart" width="1563" height="1006" fetchpriority="high" decoding="async" onerror="this.remove()" />
      </header>

      <p class="article-lead">They say a successful product is one a user can understand in under a minute. This article explains what user experience is, why it is central to website design, and how it affects usability, conversion, and accessibility.</p>

      <aside class="key-points" aria-labelledby="kp-title">
        <h2 id="kp-title">The short version</h2>
        <ul>
          <li>User experience is broader than visual appeal: it covers browsing, content, behavior, and technology together<sup><a class="citation" href="#ref-1">[1]</a></sup>.</li>
          <li>Usability means ease of learning, speed of completing tasks, and few errors<sup><a class="citation" href="#ref-2">[2]</a></sup>.</li>
          <li>A small detail in a purchase or sign-up path can separate a completed action from an abandoned one.</li>
          <li>Accessibility is part of UX, not an add-on, and it widens the user base.</li>
        </ul>
      </aside>

      <nav class="toc" aria-labelledby="toc-title">
        <h2 id="toc-title">Contents</h2>
        <ol>
          <li><a href="#example">An example: a shoe store</a></li>
          <li><a href="#what-is">What is user experience?</a></li>
          <li><a href="#why">Why is it central?</a></li>
          <li><a href="#usability">Ease of use and performance</a></li>
          <li><a href="#conversion">Conversion rates</a></li>
          <li><a href="#accessibility">Inclusion and accessibility</a></li>
          <li><a href="#workflow">A practical path in five steps</a></li>
          <li><a href="#faq">Frequently asked questions</a></li>
          <li><a href="#conclusion">Conclusion</a></li>
          <li><a href="#references">References</a></li>
        </ol>
      </nav>

      <h2 id="example">A Simple Shopping Experience That Shows UX in Action</h2>
      <p>Imagine a user visiting an online store to buy running shoes. The search button is clearly visible at the top, the categories are neatly organized, the photos are sharp, and each product comes with short, direct information. They pick the right pair, choose color and size with ease, then reach a checkout with clear steps, several payment methods, and a plain explanation of shipping fees, delivery date, and return policy. They finish the purchase without hesitation or confusion and leave feeling satisfied and confident. What happened here is a practical application of user experience (UX) in web design.</p>
      <figure>
        <img class="article-hero" src="../images/articles/ux-shopping-journey.webp" alt="A six-step phone shopping journey: search, categories, choosing color and size, shipping and returns, payment, order confirmation" width="1536" height="1024" loading="lazy" decoding="async" onerror="this.remove()" />
        <figcaption class="article-meta" style="text-align: center">A clear purchase journey, from search to order confirmation, without confusion.</figcaption>
      </figure>

      <h2 id="what-is">What is user experience on websites?</h2>
      <p>User experience (UX) is the sum of impressions and interactions a user goes through while using a website, from the moment they arrive until they leave. UX is not only about how a site looks; it covers ease of browsing, clarity of information, logical ordering, speed of reaching the goal, and the user's sense of comfort and trust. In other words, UX is a blend of design, behavior, content, and technology that works together to serve the user's needs and respect their time and effort. This is the logic of user-centered design for the web that Garrett lays out<sup><a class="citation" href="#ref-1">[1]</a></sup>.</p>

      <h2 id="why">Why is UX central to website design?</h2>
      <p>UX matters because it is where the user's goals meet the site owner's goals. Users want to finish a task in the least time and effort; owners want a clear outcome such as more sales, more readers, or more sign-ups. A well-considered experience makes reaching those goals smoother and turns the site from an information front into an effective tool that delivers tangible results.</p>
      <p>In practice, a site with good UX is less likely to lose users in their first seconds and more likely to keep them exploring other pages. These behaviors show up in metrics such as bounce rate, average session duration, and pages per visit, which measure a site's quality and ease of use. The table below summarizes four main aspects with their questions and metrics.</p>
      <div class="rp-table-wrap">
        <table class="rp-table types-table">
          <caption class="visually-hidden">UX aspects, the questions they answer, and the metrics to follow</caption>
          <thead>
            <tr><th scope="col">Aspect</th><th scope="col">Question it answers</th><th scope="col">Store example</th><th scope="col">Metric to follow</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Usability</th><td>Can the user finish the task easily?</td><td>A clear search button and familiar categories</td><td>Task time, error rate</td></tr>
            <tr><th scope="row">Engagement and retention</th><td>Does the user stay and explore?</td><td>Sharp photos and short information</td><td>Bounce rate, session duration, pages per visit</td></tr>
            <tr><th scope="row">Conversion</th><td>Does the user complete the goal?</td><td>Clear checkout steps and a stated return policy</td><td>Conversion rate, abandoned carts</td></tr>
            <tr><th scope="row">Accessibility</th><td>Can everyone use it?</td><td>Enough contrast, image descriptions, keyboard support</td><td>Compliance with WCAG guidelines</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="usability">How UX affects usability and performance</h2>
      <p>One of the most important dimensions of UX is usability: how easy the site is to learn, how fast tasks get done, and how few mistakes users make<sup><a class="citation" href="#ref-2">[2]</a></sup>. When interface elements are clear, buttons stand out, and navigation paths are logical, users can do what they came for without instructions. In the shoe-store example, the clear search button, understandable categories such as "sports shoes" and "running shoes", and familiar labels all reduce cognitive load and make the experience feel almost automatic.</p>
      <p>From a human-computer interaction (HCI) perspective, every unnecessary step, vague message, and inconsistent element adds mental load and raises the chance of abandonment or error. So a core goal of UX is to remove unjustified complexity, shorten the path to the goal, and give clear feedback at every stage of interaction.</p>
      <figure>
        <img class="article-hero" src="../images/articles/Bad_Good.png" alt="An illustration comparing a bad user experience with a complicated and confusing interface leaving the user frustrated, and a good user experience with a simple, organized interface making the user feel comfortable and satisfied." width="1536" height="1024" loading="lazy" decoding="async" onerror="this.remove()" />
        <figcaption class="article-meta" style="text-align: center">A bad user experience versus a good one.</figcaption>
      </figure>

      <h2 id="conversion">The role of UX in raising conversion rates</h2>
      <p>UX is not only about user comfort; it directly affects business metrics such as conversion rates. On commercial sites, the difference between a completed purchase and an abandoned cart can be small UX details: a long, complicated payment form, an unclear confirm button, or no explanation of the return policy. When checkout pages and sign-up forms are designed carefully, with organized fields, clear labels, and understandable alerts, the chance of completing the process grows.</p>
      <p>This means investing in UX can translate directly into more revenue, subscribers, or leads. Improving UX on a single critical path, such as the purchase path, can raise conversions without any change in visitor numbers.</p>
      <p class="note-line"><strong>Note:</strong> the size of the improvement differs from site to site, and a figure from one site should not be carried over to another; measure the effect on your own site before and after a change.</p>

      <h2 id="accessibility">Inclusion and accessibility within UX</h2>
      <p>An essential part of adopting UX principles is a commitment to accessibility: making sure the widest possible range of users can use the site, including people with visual, hearing, motor, or cognitive disabilities. Following guidelines such as WCAG means, for example:</p>
      <ul class="checklist">
        <li>Sufficient color contrast between text and background.</li>
        <li>Text descriptions for images.</li>
        <li>Full keyboard operability.</li>
        <li>Screen-reader support.</li>
      </ul>
      <p>These practices reflect human and ethical respect, and they also widen the pool of potential users and the situations and devices the site works on. In addition, many jurisdictions have begun to make digital accessibility a legal requirement, which adds a regulatory dimension to adopting UX principles in this area.</p>
      <p class="note-line"><strong>Note:</strong> While building one of my own projects, I noticed that users rarely struggled with the features themselves. Instead, they got lost between pages because the navigation path was unclear. After simplifying the structure and reducing the number of steps, completing tasks became much easier.</p>


      <h2 id="workflow">A practical path to better UX in five steps</h2>
      <ol class="flow-steps ux-workflow">
        <li><strong>A clear goal</strong><span>What does the user want? What do we want?</span></li>
        <li><strong>A simpler path</strong><span>As few steps as possible</span></li>
        <li><strong>Feedback</strong><span>A clear message after every click</span></li>
        <li><strong>Access for all</strong><span>Contrast, image text, keyboard</span></li>
        <li><strong>Test and measure</strong><span>With a real user, before and after</span></li>
      </ol>
      <p>This path rests on the idea that a design is judged by actual experience with users, not by impressions alone<sup><a class="citation" href="#ref-2">[2]</a></sup>.</p>

      <h2 id="faq">Frequently asked questions</h2>
      <div class="faq">
        <details>
          <summary>What is the difference between UX and UI?</summary>
          <p>UI is the visual interface the user sees (colors, buttons, layout); UX is the whole experience from arrival to departure, and the interface is one part of it.</p>
        </details>
        <details>
          <summary>Where do I start improving UX on my site?</summary>
          <p>Pick one critical path (purchase, sign-up, or contact), try it with a real person who did not help design it, then fix what blocks them and measure the result.</p>
        </details>
        <details>
          <summary>Is accessibility only for a small group?</summary>
          <p>No. It widens the user base and helps in different conditions and on different devices, and many jurisdictions now treat it as a legal requirement.</p>
        </details>
      </div>

      <h2 id="conclusion">Conclusion</h2>
      <p>UX is not a cosmetic layer added at the end of a project; it is a series of small decisions made with every button, heading, form, and step. The measure of success is simple: did the visitor accomplish what they came for with minimal effort and with confidence? If so, the site owner's goal, whether a sale, a read, or a sign-up, is usually met as a result.</p>
      <p>Before launching any page, ask yourself:</p>
      <ul class="checklist">
        <li>Can a visitor tell what to do on this page within seconds?</li>
        <li>Does the most important path take as few steps as possible?</li>
        <li>Are messages and labels clear, and does the user know what happened after each click?</li>
        <li>Can the page be used by keyboard, with enough color contrast?</li>
        <li>Have you tested it with a real person who did not help design it?</li>
      </ul>
      <p>Start with one critical path on your site, improve it, and measure the effect before moving on; gradual, measured improvement beats a full redesign with no measurement.</p>
    `,
    "data-analysis-basics": `
      <header>
        <h1>Data Analysis Basics: Types, Data Collection and Data Cleaning</h1>
        <p class="article-meta">Data Analysis · By Rawan Abu Sittah · <time datetime="2026-10-14">Published October 14, 2026</time> · <time datetime="2026-10-15">Updated October 16, 2026</time> · 6 min read</p>
        <img class="article-hero" src="../images/articles/data-analysis-basics.webp" alt="Two people working on laptops with printed charts and infographics spread across the desk" width="1600" height="1066" fetchpriority="high" decoding="async" onerror="this.remove()" />
      </header>

      <p class="article-lead">Good decisions start with sound data and a sound way of reading it. This article explains what data analysis is, its four types, and how data is collected and cleaned before it is analyzed, along with the main tools at each stage.</p>

      <aside class="key-points" aria-labelledby="kp-title">
        <h2 id="kp-title">The short version</h2>
        <ul>
          <li>Data analysis turns raw data into information that supports decisions<sup><a class="citation" href="#ref-1">[1]</a></sup>.</li>
          <li>The four types answer different questions: what happened, why, what will happen, and what should we do?</li>
          <li>Define the purpose before collecting data; knowing how the information will be used improves how it is collected<sup><a class="citation" href="#ref-3">[3]</a></sup>.</li>
          <li>Cleaning (empty values, duplicates, consistent formats) is a condition for accurate results.</li>
        </ul>
      </aside>

      <nav class="toc" aria-labelledby="toc-title">
        <h2 id="toc-title">Contents</h2>
        <ol>
          <li><a href="#what-is">What is data analysis?</a></li>
          <li><a href="#types">Types of data analysis</a></li>
          <li><a href="#collection">Data collection</a></li>
          <li><a href="#cleaning">Data cleaning</a></li>
          <li><a href="#workflow">The full path in five steps</a></li>
          <li><a href="#faq">Frequently asked questions</a></li>
          <li><a href="#conclusion">Conclusion</a></li>
          <li><a href="#references">References</a></li>
        </ol>
      </nav>

      <h2 id="what-is">What is data analysis?</h2>
      <p>Data analysis is the process of collecting, cleaning, and transforming data to discover useful information, identify patterns, and support decision-making. In other words, its goal is to turn raw data into insights that move organizations to a better level and, as a result, achieve better outcomes (financial, political, and so on). The research literature also treats data preparation as coming before the choice of analysis method<sup><a class="citation" href="#ref-1">[1]</a></sup>.</p>

      <h2 id="types">Types of data analysis</h2>
      <p>Each type answers a different question, moving from describing what happened to recommending what to do. The table summarizes them, and each is explained below.</p>
      <div class="rp-table-wrap">
        <table class="rp-table types-table">
          <caption class="visually-hidden">Comparison of the four types of data analysis</caption>
          <thead>
            <tr><th scope="col">Type</th><th scope="col">Question it answers</th><th scope="col">Example</th><th scope="col">Common techniques</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Descriptive</th><td>What happened?</td><td>Total sales per month</td><td>Pivot tables, averages, charts</td></tr>
            <tr><th scope="row">Diagnostic</th><td>Why did it happen?</td><td>Why sales dropped in a given month</td><td>Probability, regression, time series</td></tr>
            <tr><th scope="row">Predictive</th><td>What will happen?</td><td>Forecasting next quarter's sales</td><td>Regression, decision trees, neural networks</td></tr>
            <tr><th scope="row">Prescriptive</th><td>What should we do?</td><td>Choosing the best campaign to lift sales</td><td>Combines the results of the other three</td></tr>
          </tbody>
        </table>
      </div>
      <p class="note-line">Note: this four-type classification is common in practice. The research literature divides analysis methods in other ways; Taherdoost presents six main categories and then covers descriptive, explanatory, and inferential analysis, followed by qualitative analysis<sup><a class="citation" href="#ref-1">[1]</a></sup>.</p>

      <h3>1. Descriptive analytics: what happened?</h3>
      <p>It answers "What happened?". This type is not concerned with why something happened or with cause-and-effect relationships. It involves two kinds of operations:</p>
      <ul>
        <li>Collecting data and presenting it in a concise way.</li>
        <li>Mining and exploring data to look for patterns.</li>
      </ul>

      <h3>2. Diagnostic analytics: why did it happen?</h3>
      <p>It answers "Why did it happen?". This type identifies and addresses anomalies in the data, and several techniques can be used, including:</p>
      <ul>
        <li>Probability theory.</li>
        <li>Regression analysis.</li>
        <li>Time series analysis.</li>
      </ul>

      <h3>3. Predictive analytics: what is likely to happen in the future?</h3>
      <p>Using past patterns and trends, analysts build predictive models that estimate the occurrence of an event or outcome in the future. The most prominent techniques are:</p>
      <ul>
        <li><strong>Regression analysis:</strong> estimating the relationships between a set of variables to determine how one input affects another.</li>
        <li><strong>Decision trees:</strong> classification models that lay out the possible choices and their outcomes in a "tree"-like structure.</li>
        <li><strong>Neural networks:</strong> they model complex, non-linear relationships in the data.</li>
      </ul>

      <h3>4. Prescriptive analytics: what is the best course of action?</h3>
      <p>It analyzes what happened, why it happened, and what may happen, in order to determine the next step.</p>
      <p>For the statistical foundations behind these types, such as descriptive statistics and statistical inference, see Bulmer's book<sup><a class="citation" href="#ref-2">[2]</a></sup>.</p>

      <h2 id="collection">What is "data collection"?</h2>
      <p>Data collection is a systematic process of obtaining and recording information from various sources for the purposes of research, analysis, and decision-making.</p>

      <h3>Sources of data</h3>
      <ul>
        <li>Individuals.</li>
        <li>Documents and business systems.</li>
        <li>Websites.</li>
        <li>Sensors.</li>
        <li>Experiments.</li>
      </ul>
      <p class="note-line"><strong>Note:</strong> having a large amount of data is not proof of its quality. There are millions of records of little use if they are not clearly defined or come from unreliable sources.</p>

      <h3>Steps of data collection</h3>
      <ol>
        <li><strong>Define the goal:</strong> what is the data for? Analyzing sales? Understanding why a methodology failed? The Head Start training handbook stresses that people collect information better when they know how it will be used<sup><a class="citation" href="#ref-3">[3]</a></sup>.</li>
        <li><strong>Define the design:</strong> how will the samples be collected?</li>
        <li><strong>Build and test the tool:</strong> check that the chosen tool works and can reach the intended goal.</li>
        <li><strong>Collect and monitor the data:</strong> once a tool is approved, collection begins from reliable sources and references.</li>
        <li><strong>Validate, store, and document the data:</strong> the result is a dataset that can be traced and analyzed.</li>
      </ol>

      <h3>Common challenges in data collection</h3>
      <ul>
        <li><strong>An unclear goal:</strong> teams collect data that supports no decision.</li>
        <li><strong>Sample bias:</strong> the sample excludes important groups of the population.</li>
        <li><strong>Missing or duplicate records:</strong> this leads to inaccurate results and unreliable statistics.</li>
        <li><strong>Privacy violations:</strong> data is collected illegally or without permission.</li>
      </ul>

      <h3>Useful tools for data collection</h3>
      <ul>
        <li><strong>QuestionPro:</strong> a library of ready-made templates for questionnaires and surveys.</li>
        <li><strong>Google Forms:</strong> simple and easy to use, suitable for basic questionnaires.</li>
        <li><strong>SurveyMonkey:</strong> a cloud platform for creating online surveys and quizzes easily.</li>
      </ul>

      <h2 id="cleaning">What is "data cleaning"?</h2>
      <p>Data cleaning is the process of identifying and correcting errors, inconsistencies, and missing values in the collected dataset; clean data is an essential condition for accurate results<sup><a class="citation" href="#ref-1">[1]</a></sup>. The process usually includes:</p>
      <ul class="checklist">
        <li>Handling empty values.</li>
        <li>Removing duplicate data.</li>
        <li>Standardizing categories.</li>
        <li>Fixing formatting problems.</li>
      </ul>

      <h3>Common challenges in data cleaning</h3>
      <ul>
        <li><strong>Missing values:</strong> it is hard to know why some fields were left empty, and so hard to decide whether to delete the rows or fill them with estimates without distorting the results.</li>
        <li><strong>Inconsistent formats and patterns:</strong> the same information entered in different ways (for example, "ذكر" in some fields and "Male" in others) appears as separate entities in charts.</li>
        <li><strong>Wrongly stored data types:</strong> numbers, currencies, or dates saved as text, which prevents calculations on them.</li>
      </ul>

      <h3>Useful tools for data cleaning</h3>
      <ul>
        <li><strong>Microsoft Excel:</strong> tools for filtering data, removing duplicates, and formatting cells. To get started with it, see my book <a href="../books/excel.html">Excel Guide</a>.</li>
        <li><strong>OpenRefine:</strong> an open-source tool for standardizing and cleaning large, messy datasets.</li>
        <li><strong>Python:</strong> libraries such as Pandas and NumPy handle missing values, remove duplicates, and standardize scales.</li>
      </ul>

      <h2 id="workflow">The full path in five steps</h2>
      <ol class="flow-steps">
        <li><strong>A clear question</strong><span>What do I want to know?</span></li>
        <li><strong>Systematic collection</strong><span>From reliable sources</span></li>
        <li><strong>Cleaning</strong><span>Empty values, duplicates, formats</span></li>
        <li><strong>Analysis</strong><span>Descriptive first, then what is needed</span></li>
        <li><strong>Decision</strong><span>An actionable conclusion</span></li>
      </ol>
      <p>I applied this path in my own projects: the <a href="../data-analysis/reading-analysis.html">reading habits analysis</a> (83 books), the <a href="../data-analysis/adventure-works.html">inventory risk analysis</a>, and the <a href="../data-analysis/sales-analysis.html">sales analysis project</a>.</p>

      <h2 id="faq">Frequently asked questions</h2>
      <div class="faq">
        <details>
          <summary>Where do I start learning data analysis?</summary>
          <p>Start with descriptive analysis on a small Excel file: clean the data, then build one pivot table and one chart. After that, move on to Python and the Pandas library.</p>
        </details>
        <details>
          <summary>What is the difference between descriptive and diagnostic analysis?</summary>
          <p>Descriptive analysis describes what happened (for example, a drop in sales); diagnostic analysis looks for the cause (why did it drop?).</p>
        </details>
        <details>
          <summary>Why clean data before analyzing it?</summary>
          <p>Because errors, duplicates, and conflicting formats distort results and lead to unreliable conclusions.</p>
        </details>
      </div>

      <h2 id="conclusion">Conclusion</h2>
      <p>Data analysis starts with a clear question, then a systematic collection of data from reliable sources, then cleaning that ensures accuracy, and only then does the analyst choose the suitable type: descriptive, diagnostic, predictive, or prescriptive.</p>
    `,
    "ai-agents": `
      <header>
        <h1>AI Agents: From Science Fiction to Scientific Reality</h1>
        <p class="article-meta">AI &amp; Technology · By Rawan Abu Sittah · <time datetime="2026-10-15">Published October 15, 2026</time> · 7 min read</p>
        <img class="article-hero" src="../images/articles/article-3.png" alt="A friendly robot on a translucent interface titled AI Agents, showing planning, reasoning and action steps above a laptop" width="1677" height="938" fetchpriority="high" decoding="async" onerror="this.remove()" />
      </header>

      <p class="article-lead">Have you imagined talking with a machine for hours without getting bored? Or wished a system could handle repetitive tasks, search for jobs, follow applications, or turn lectures into study notes? These scenarios are no longer pure science fiction. They are among the possibilities associated with AI agents.</p>
      <aside class="key-points" aria-labelledby="kp-title">
        <h2 id="kp-title">The short version</h2>
        <ul>
          <li>An agent works toward a goal and breaks it into actionable tasks.</li>
          <li>It may use digital tools and interact with its environment instead of returning a single answer.</li>
          <li>Its capabilities depend on the planning, tools, memory, and review mechanisms available to it.</li>
          <li>Human review remains important for sensitive information and actions.</li>
        </ul>
      </aside>
      <nav class="toc" aria-labelledby="toc-title">
        <h2 id="toc-title">Contents</h2>
        <ol>
          <li><a href="#agent-definition">What are AI agents?</a></li>
          <li><a href="#agent-components">What makes up an agent?</a></li>
          <li><a href="#agent-workflow">How does it carry out a task?</a></li>
          <li><a href="#agent-challenges">Challenges and risks</a></li>
          <li><a href="#agent-users">Do you need technical skills?</a></li>
          <li><a href="#agent-conclusion">Conclusion</a></li>
          <li><a href="#agent-references">References</a></li>
        </ol>
      </nav>
      <section class="agent-section" id="agent-definition">
        <span class="agent-kicker">01 / CONCEPT</span>
        <h2>What are AI agents?</h2>
        <p>AI agents are software systems that receive a goal, choose steps to pursue it, and may carry out some of those steps through connected tools. Unlike a traditional tool that performs one direct command, an agent can plan, interact with websites, applications, or databases, then review the result and adjust what it does next<sup><a class="citation" href="#agent-ref-1">[1]</a></sup>.</p>
        <p>An agent can be viewed as a digital assistant that goes beyond answering a question to coordinating a workflow, such as organizing email, preparing a recurring report, or following parts of a hiring process. Its permissions and human oversight remain part of the design<sup><a class="citation" href="#agent-ref-2">[2]</a></sup>.</p>
        <figure class="agent-loop" aria-labelledby="agent-loop-title">
          <figcaption id="agent-loop-title"><strong>An agent's working loop</strong><span>A clear goal, followed by execution and review</span></figcaption>
          <ol class="agent-loop-steps">
            <li><b>Goal</b><span>What outcome is needed?</span></li>
            <li><b>Plan</b><span>Which steps make sense?</span></li>
            <li><b>Act</b><span>Which tool can do the step?</span></li>
            <li><b>Review</b><span>Was the outcome achieved?</span></li>
          </ol>
        </figure>
      </section>
      <section class="agent-section" id="agent-components">
        <span class="agent-kicker">02 / ARCHITECTURE</span>
        <h2>What makes up an agent?</h2>
        <p>An agent typically combines a model for understanding, a way to choose steps, connections to tools, and context that helps it track a task. The exact design varies by application.</p>
        <div class="agent-components">
          <article class="agent-component"><span class="agent-component-index">A</span><h3>Language model</h3><p>Interprets instructions and drafts plans or content in natural language.</p></article>
          <article class="agent-component"><span class="agent-component-index">B</span><h3>Planning and decisions</h3><p>Breaks a broad goal into smaller steps, explicitly or through natural-language planning.</p></article>
          <article class="agent-component"><span class="agent-component-index">C</span><h3>External tools</h3><p>Connects to browsers, email, calendars, databases, and business systems.</p></article>
          <article class="agent-component"><span class="agent-component-index">D</span><h3>Memory and context</h3><p>Tracks the current task and may retrieve prior preferences or information when needed.</p></article>
          <article class="agent-component agent-component-wide"><span class="agent-component-index">E</span><h3>Evaluation and correction</h3><p>Checks the outcome, retries, or asks for clarification when the goal has not been met.</p></article>
        </div>
        <p class="agent-note">Long-term memory is not present in every agent. It may rely on separate files or records, so it is important to know what is retained and how it is used.</p>
      </section>
      <section class="agent-section" id="agent-workflow">
        <span class="agent-kicker">03 / IN PRACTICE</span>
        <h2>How does an agent carry out a task?</h2>
        <p>If the goal is to find a suitable job, an agent might gather information about a user's skills, search job platforms, filter results, prepare tailored applications, and follow responses. This is an illustrative sequence; what an agent can actually do depends on its tools and granted permissions<sup><a class="citation" href="#agent-ref-2">[2]</a></sup>.</p>
        <ol class="agent-sequence">
          <li><b>Understand the goal</b><span>Collect the skills and criteria set by the user.</span></li>
          <li><b>Search</b><span>Query the available sources or platforms.</span></li>
          <li><b>Filter results</b><span>Compare findings with the requested criteria.</span></li>
          <li><b>Prepare an action</b><span>Draft an application for review.</span></li>
          <li><b>Follow up safely</b><span>Do not submit or approve a sensitive action without clear consent.</span></li>
        </ol>
      </section>
      <section class="agent-section" id="agent-challenges">
        <span class="agent-kicker">04 / RESPONSIBILITY</span>
        <h2>What challenges come with using agents?</h2>
        <div class="agent-challenges">
          <article class="agent-challenge"><h3>Accuracy and reliability</h3><p>Models can produce inaccurate information that sounds convincing; sensitive tasks need human verification.</p></article>
          <article class="agent-challenge"><h3>Privacy and data security</h3><p>An agent may need email or personal files. Limit its access and protect data from exposure.</p></article>
          <article class="agent-challenge"><h3>Bias and ethics</h3><p>Recommendations may reflect biases in training data, especially in decisions such as hiring.</p></article>
          <article class="agent-challenge"><h3>Reliability and cost</h3><p>Continuous connections require stable infrastructure, may raise costs, and can encourage overreliance.</p></article>
          <article class="agent-challenge agent-challenge-wide"><h3>Explainability</h3><p>It can be difficult to understand why a model chose a particular action, a significant challenge in sensitive areas such as medicine and finance.</p></article>
        </div>
      </section>
      <section class="agent-section" id="agent-users">
        <span class="agent-kicker">05 / WHO CAN USE THEM?</span>
        <h2>Do you need technical skills?</h2>
        <p>Not necessarily. Greater technical awareness does, however, expand what you can customize and control.</p>
        <div class="agent-audiences">
          <article class="agent-audience"><span>EVERYDAY USE</span><h3>For non-technical users</h3><ul><li>Use ready-made agents through a simple interface.</li><li>State goals and instructions clearly.</li><li>Understand the agent's limits and review its actions.</li></ul></article>
          <article class="agent-audience agent-audience-technical"><span>CUSTOMIZATION AND BUILDING</span><h3>For technical or semi-technical users</h3><ul><li>Connect agents to additional tools and services.</li><li>Design compound tasks with no-code platforms or programming.</li><li>Set access policies, monitor performance, and update the agent.</li></ul></article>
        </div>
      </section>
      <section class="agent-section" id="agent-conclusion">
        <span class="agent-kicker">06 / CONCLUSION</span>
        <h2>Toward a new collaboration between people and agents</h2>
        <p>Agents represent a shift from tools that execute one command to systems that can interpret a goal, plan steps, and interact with digital tools. The challenge is not their existence alone, but how they are designed, governed, and kept accountable to people.</p>
        <p>Used thoughtfully, agents can save time and reduce routine work, provided their permissions are limited and their outputs reviewed. Without oversight, they can put privacy and reliability at risk. The more important question is how to make this collaboration useful, safe, and responsible.</p>
      </section>
    `,
    "ai-for-people-with-disabilities": `
      <header>
        <h1>AI Technologies for People with Disabilities</h1>
        <p class="article-meta">AI &amp; Accessibility · By Rawan Abu Sittah · <time datetime="2026-10-15">Published October 15, 2026</time> · 8 min read</p>
        <img class="article-hero" src="../images/articles/ai_hand.jpg" alt="A robotic hand and a human hand reaching toward each other, representing collaboration between people and AI" loading="eager" fetchpriority="high" decoding="async" onerror="this.remove()" />
      </header>

      <p class="article-lead">Have you ever tried closing your eyes and walking, writing, or studying? Or tried to complete a piece of writing without using your hands? What may be a brief experiment for one person is a daily reality for many people with disabilities. Reading a book, using a phone, taking a bus, or communicating can involve repeated barriers. AI can help reduce some of those barriers and support greater independence, not change or define the person.</p>
      <aside class="key-points" aria-labelledby="kp-title">
        <h2 id="kp-title">The short version</h2>
        <ul>
          <li>Computer vision can turn images and visible text into accessible information.</li>
          <li>Speech technologies offer alternative ways to communicate and write.</li>
          <li>Alternative interfaces can adapt device control to a user's needs.</li>
          <li>Useful solutions must also address inclusive design, privacy, bias, and cost.</li>
        </ul>
      </aside>
      <nav class="toc" aria-labelledby="toc-title">
        <h2 id="toc-title">Contents</h2>
        <ol>
          <li><a href="#barriers">Common access barriers</a></li>
          <li><a href="#visual-access">Vision and text</a></li>
          <li><a href="#speech-access">Speech and communication</a></li>
          <li><a href="#motor-access">Alternative interfaces</a></li>
          <li><a href="#learning-access">Personalized learning</a></li>
          <li><a href="#mobility-access">Mobility and smart cities</a></li>
          <li><a href="#access-risks">Risks and challenges</a></li>
          <li><a href="#access-conclusion">Conclusion</a></li>
          <li><a href="#access-references">References</a></li>
        </ol>
      </nav>

      <section class="access-section" id="barriers">
        <span class="access-kicker">01 / THE STARTING POINT</span>
        <h2>Common access barriers</h2>
        <p>Challenges vary across visual, hearing, motor, and cognitive disabilities, and often overlap in everyday life. Common barriers include:</p>
        <div class="access-grid access-grid-five">
          <article class="access-card"><span class="access-index">01</span><h3>Access to information</h3><p>Images, diagrams, and visual text may not work with screen readers, while audio content may lack captions or transcripts.</p></article>
          <article class="access-card"><span class="access-index">02</span><h3>Digital interaction</h3><p>Many interfaces assume people can use their hands and eyes together, or present buttons and icons without descriptions.</p></article>
          <article class="access-card"><span class="access-index">03</span><h3>Mobility and independence</h3><p>Reading signs, identifying directions, and detecting obstacles can become complex tasks.</p></article>
          <article class="access-card"><span class="access-index">04</span><h3>Education and work</h3><p>Inaccessible environments can make lectures, meetings, and digital systems harder to use.</p></article>
          <article class="access-card"><span class="access-index">05</span><h3>Social barriers</h3><p>Isolation, overreliance on others, and difficulty expressing needs can amplify daily barriers.</p></article>
        </div>
        <p class="access-callout">AI can be an enabling layer that reduces the impact of barriers; it does not remove disability itself.</p>
      </section>

      <section class="access-section" id="visual-access">
        <span class="access-kicker">02 / VISION AND INFORMATION</span>
        <h2>Recognizing images and text</h2>
        <p>Computer vision can turn visual content into descriptions or text that can be read aloud or enlarged. This includes recognizing text, objects, and scenes in a person's surroundings<sup><a class="citation" href="#access-ref-1">[1]</a></sup>.</p>
        <figure class="access-figure">
          <img src="../images/articles/AI%20Vision%20Labels%20a%20Red%20Car.png" alt="A phone camera identifies a red car in a street scene" loading="lazy" decoding="async" />
          <figcaption>Computer vision can describe elements in the environment and turn them into spoken or written information.</figcaption>
        </figure>
        <div class="access-feature-row">
          <article class="access-feature"><h3>Optical character recognition (OCR)</h3><p>Photograph a page or street sign and convert its visible text into digital text that can be read aloud or enlarged.</p></article>
          <article class="access-feature"><h3>Object and scene recognition</h3><p>Describe what a camera sees, such as a person by a door or a stop sign, to help someone understand their surroundings.</p></article>
          <article class="access-feature"><h3>Image descriptions on the web</h3><p>Suggest alternative text for screen readers, with human review to check that the description is accurate.</p></article>
        </div>
      </section>

      <section class="access-section" id="speech-access">
        <span class="access-kicker">03 / SPEECH AND COMMUNICATION</span>
        <h2>Recognizing and converting speech</h2>
        <p>Natural language processing, speech recognition, and text-to-speech create alternative ways to write, follow a conversation, or communicate<sup><a class="citation" href="#access-ref-2">[2]</a></sup>.</p>
        <figure class="access-figure access-figure-inline">
          <img src="../images/articles/article-5.jpg" alt="A person with a prosthetic hand typing on a laptop while holding a phone in the other hand" loading="lazy" decoding="async" />
          <figcaption>Input and output tools can work together to fit different communication needs.</figcaption>
        </figure>
        <div class="access-feature-row">
          <article class="access-feature"><h3>Voice dictation</h3><p>Dictate text for email, university assignments, or workplace software instead of typing.</p></article>
          <article class="access-feature"><h3>Speech to text</h3><p>Display lectures, meetings, and video speech as live text that can be saved and searched.</p></article>
          <article class="access-feature"><h3>Text to speech</h3><p>Turn typed or selected words into understandable speech for people who cannot speak.</p></article>
        </div>
        <p class="access-callout">The aim is two-way communication: understanding others and expressing oneself clearly.</p>
      </section>

      <section class="access-section" id="motor-access">
        <span class="access-kicker">04 / INTERACTION AND CONTROL</span>
        <h2>Alternative interfaces for motor disabilities</h2>
        <p>AI can make digital and physical environments more flexible through control methods that do not rely only on a keyboard or mouse.</p>
        <div class="access-grid">
          <article class="access-card"><span class="access-index">A</span><h3>Eye or head movement</h3><p>Tracking systems can turn eye or head movement into a pointer for selecting controls and entering text.</p></article>
          <article class="access-card"><span class="access-index">B</span><h3>Gesture recognition</h3><p>Interfaces can respond to simple movements, such as tilting the head or moving one finger.</p></article>
          <article class="access-card"><span class="access-index">C</span><h3>Advanced voice control</h3><p>Carry out multi-step requests, such as opening email and finding a message from a particular person<sup><a class="citation" href="#access-ref-3">[3]</a></sup>.</p></article>
          <article class="access-card"><span class="access-index">D</span><h3>Smart prosthetics</h3><p>Machine-learning systems can adapt to a user's movement patterns and adjust their response over time.</p></article>
        </div>
      </section>

      <section class="access-section" id="learning-access">
        <span class="access-kicker">05 / LEARNING</span>
        <h2>Learning that adapts to the learner</h2>
        <p>Personalized learning can account for disability and learning pace, provided the tools are accessible and appropriate for the educational setting.</p>
        <div class="access-learning">
          <article class="access-learning-card"><span>01</span><h3>For visual disabilities</h3><p>Screen-reader-ready materials, oral assessments, and content prepared to accessibility standards.</p></article>
          <article class="access-learning-card"><span>02</span><h3>For hearing disabilities</h3><p>Live captions, written materials, and lectures that can be summarized or rephrased.</p></article>
          <article class="access-learning-card"><span>03</span><h3>For learning and cognitive disabilities</h3><p>Alternative explanations, examples, and formats, with progress tracking to support educators and learners.</p></article>
        </div>
      </section>

      <section class="access-section" id="mobility-access">
        <span class="access-kicker">06 / MOBILITY AND CITIES</span>
        <h2>Mobility and inclusion in smart cities</h2>
        <p>Location services, computer vision, and urban data can be combined to offer more accessible navigation, while protecting privacy and safety.</p>
        <ol class="access-route">
          <li><b>Audio navigation</b><span>Apps can explain directions, traffic signals, obstacles, and nearby points of interest.</span></li>
          <li><b>Responsive environments</b><span>Urban systems can adapt to the needs of wheelchair users or people with visual disabilities.</span></li>
          <li><b>Help in public spaces</b><span>Robots in airports, hospitals, and malls can guide visitors and provide spoken or written information.</span></li>
        </ol>
      </section>

      <section class="access-section" id="access-risks">
        <span class="access-kicker">07 / RESPONSIBLE USE</span>
        <h2>Risks to consider</h2>
        <div class="access-risks">
          <article class="access-risk"><h3>Overreliance</h3><p>Relying entirely on a system may reduce practice of alternative skills and increase risk if it fails.</p></article>
          <article class="access-risk"><h3>Privacy and sensitive data</h3><p>Tools may collect health, voice, or movement data; access and protection need clear limits.</p></article>
          <article class="access-risk"><h3>Bias and digital exclusion</h3><p>Models may perform poorly when training data does not represent diverse accents, communication styles, and disabilities.</p></article>
          <article class="access-risk"><h3>Cost and availability</h3><p>High costs, modern-device requirements, or continuous internet access can exclude many people.</p></article>
          <article class="access-risk access-risk-wide"><h3>Standards and oversight</h3><p>Solutions should be tested with people with disabilities for safety and usability before deployment.</p></article>
        </div>
      </section>

      <section class="access-section access-conclusion" id="access-conclusion">
        <span class="access-kicker">08 / CONCLUSION</span>
        <h2>Technology that enables people</h2>
        <p>AI can support reading, communication, control, learning, and mobility. Its benefits are strongest when solutions are designed with people with disabilities, support their independence, protect their privacy, and remain an aid rather than the only way to participate.</p>
      </section>
    `,
    /*
  استبدل بهذا المدخل الكامل المدخل القديم "will-ai-replace-human-jobs"
  داخل الكائن translations في js/article-i18n.js
  (من سطر "will-ai-replace-human-jobs": ` حتى الـ ` و , التي تغلقه).
*/
    "will-ai-replace-human-jobs": `
      <header>
        <h1>Will AI Replace Human Jobs? Blessing or Curse?</h1>
        <p class="article-meta">AI & Technology · By Rawan Abu Sittah · <time datetime="2026-10-15">Published October 15, 2026</time> · 5 min read</p>
        <img class="article-hero" src="../images/articles/article-2.png" alt="Two glowing chat bubbles, one reading AI, floating over a screen of source code" width="1677" height="938" fetchpriority="high" decoding="async" onerror="this.remove()" />
      </header>

      <p class="article-lead">Will artificial intelligence take over human jobs? Is it a blessing or a curse? This article explains what AI is, how it speeds up work, which tasks it threatens, what it takes to learn it, and how to integrate it into your career instead of running from it.</p>

      <aside class="key-points" aria-labelledby="kp-title">
        <h2 id="kp-title">The short version</h2>
        <ul>
          <li>AI speeds up work and redistributes effort: machines take the repetitive tasks and people move to higher-level ones.</li>
          <li>AI may change the tasks within an occupation without necessarily eliminating the occupation itself.</li>
          <li>Learning it takes mathematics, programming, an understanding of data, awareness of ethics, and continuous learning.</li>
          <li>The answer is not to withdraw but to integrate it into your existing career path; what you studied is the foundation for that.</li>
        </ul>
      </aside>

      <nav class="toc" aria-labelledby="toc-title">
        <h2 id="toc-title">Contents</h2>
        <ol>
          <li><a href="#scenario">A scene from reality</a></li>
          <li><a href="#what-is">What is artificial intelligence?</a></li>
          <li><a href="#speed">Its role in speeding up work</a></li>
          <li><a href="#tasks">The tasks it will eliminate</a></li>
          <li><a href="#requirements">What it takes to learn AI</a></li>
          <li><a href="#integration">Integrating AI into career paths</a></li>
          <li><a href="#workflow">A practical path in five steps</a></li>
          <li><a href="#faq">Frequently asked questions</a></li>
          <li><a href="#conclusion">Conclusion: between blessing and curse</a></li>
          <li><a href="#references">References</a></li>
        </ol>
      </nav>

      <h2 id="scenario">A scene from reality</h2>
      <p>A student in an information engineering faculty, in their graduation year, looks at today's technical reality and sees that many of the tasks they spent years learning, such as programming, data analysis, and software development, can now be done by AI systems quickly and accurately, and sometimes at a quality beyond their current ability. A feeling creeps in that their effort was wasted, and they start thinking of leaving the field entirely and finding a job unrelated to their major. This scenario is no longer hypothetical; it circulates in universities and the job market alike: will AI take over human jobs? And is it a blessing or a curse?</p>
      <p>To answer, we need to understand what AI is, its role in speeding up work, the kinds of tasks it threatens, then look at what it takes to learn it and how to integrate it with career paths instead of fleeing from them.</p>

      <h2 id="what-is">What is artificial intelligence?</h2>
      <p>Artificial Intelligence is a branch of computer science that aims to develop systems able to perform tasks that normally require human intelligence, such as pattern recognition, decision-making, natural language processing, and computer vision<sup><a class="citation" href="#ref-1">[1]</a></sup>. Modern AI relies heavily on Machine Learning and Deep Learning algorithms, which learn from data instead of depending on fixed, pre-programmed rules<sup><a class="citation" href="#ref-2">[2]</a></sup>.</p>
      <p>These systems do not "understand" the world the way humans do, but they can process huge amounts of data and extract hidden relationships and patterns, then use those patterns to predict, classify, or generate. This is what we see in text-generation models, machine translation systems, image and video analysis programs, and programming assistants.</p>

      <h2 id="speed">The role of AI in speeding up work</h2>
      <p>One of AI's most prominent roles is speeding up workflows across sectors:</p>
      <ul>
        <li><strong>Tech companies:</strong> programming assistants suggest ready code, detect errors, and improve performance, reducing the time needed to build systems.</li>
        <li><strong>Medicine:</strong> deep learning models help analyze radiology images very quickly, supporting doctors' decisions and improving diagnostic accuracy.</li>
        <li><strong>Finance:</strong> algorithms are used to analyze markets, detect fraud, and assess risk.</li>
      </ul>
      <p>This speed-up does not necessarily mean removing the human role; it redistributes effort. Machines take the repetitive, tedious tasks, while people move to higher-level work such as setting strategy, making complex decisions, designing systems, and handling human and ethical interaction. From this perspective, AI becomes a tool that amplifies human abilities, not a complete replacement for them.</p>

      <h2 id="tasks">The tasks AI will eliminate</h2>
      <p>Even so, some categories of tasks will clearly shrink in importance or gradually disappear through automation and AI. The tasks most exposed to replacement are repetitive, routine ones that can be described precisely and turned into clear data. Examples:</p>
      <ul class="checklist">
        <li>Data entry and routine file processing.</li>
        <li>Some first-line technical support tasks (repeated answers to common questions).</li>
        <li>Writing boilerplate parts of code or standard reports.</li>
        <li>Simple statistical analysis that follows fixed steps.</li>
      </ul>
      <p>But these shifts do not remove the need for specialists; they change the nature of their work. A programmer who used to write routine code may move to designing system architecture, tuning AI models, reviewing their outputs, and ensuring their reliability and safety. AI may therefore change the tasks within an occupation without necessarily eliminating the occupation itself.</p>
      <p>Recent evidence points the same way. The ILO (2025) concludes that transformation, not replacement, is the most likely effect of generative AI on most occupations: about one in four jobs is exposed to some degree, only 3.3% of global employment falls in the highest-exposure category, and clerical work is the most exposed<sup><a class="citation" href="#ref-3">[3]</a></sup>. The World Economic Forum's Future of Jobs Report 2025 projects 170 million new roles and 92 million displaced by 2030, a net gain of 78 million<sup><a class="citation" href="#ref-4">[4]</a></sup>. These are exposure estimates and projections, not final facts about actual job losses.</p>

      <h2 id="requirements">What it takes to learn AI</h2>
      <p>To face this shift, fear or withdrawal is not enough; one must understand what learning AI requires and engage with it. The most important requirements:</p>
      <ul>
        <li><strong>A strong foundation in mathematics:</strong> especially linear algebra, probability, and statistics; they form the theoretical structure of machine learning and deep learning algorithms<sup><a class="citation" href="#ref-2">[2]</a></sup>.</li>
        <li><strong>Advanced programming skills:</strong> usually in languages such as Python, with knowledge of libraries such as NumPy, Pandas, TensorFlow, or PyTorch, plus software engineering skills to build scalable systems.</li>
        <li><strong>A deep understanding of data:</strong> collecting, cleaning, analyzing, and verifying data quality, because model performance depends heavily on the quality of the available data.</li>
        <li><strong>Awareness of ethics and governance:</strong> understanding the risks of model bias, privacy, the social impact of automated decisions, and compliance with regulatory frameworks.</li>
        <li><strong>The ability to keep learning:</strong> the field changes quickly, which demands continuous following of new research and tools, and involvement in scientific and professional communities.</li>
      </ul>

      <h2 id="integration">Integrating AI into career paths</h2>
      <p>The decisive point is not to flee from AI but to integrate it into existing career paths. An information engineering student who feels their traditional skills are threatened can redirect their knowledge toward fields that benefit from AI instead of competing with it directly. The diagram shows how existing expertise can grow into AI-enabled roles.</p>
      <figure class="ai-career-chart" aria-labelledby="ai-career-title">
        <figcaption id="ai-career-title">
          <strong>How can a career path evolve?</strong>
          <span>Existing expertise + AI tools = a broader role</span>
        </figcaption>
        <ol class="ai-career-lanes">
          <li class="ai-career-lane">
            <span class="ai-career-node"><small>Existing expertise</small><strong>Software development</strong></span>
            <span class="ai-career-bridge">Integrate AI</span>
            <span class="ai-career-node"><small>Evolving path</small><strong>Intelligent and hybrid systems</strong></span>
            <p>Build solutions, review model outputs, and improve reliability.</p>
          </li>
          <li class="ai-career-lane">
            <span class="ai-career-node"><small>Existing expertise</small><strong>Data analysis</strong></span>
            <span class="ai-career-bridge">Integrate AI</span>
            <span class="ai-career-node"><small>Evolving path</small><strong>Data science and forecasting</strong></span>
            <p>Move from describing results to models that support prediction and decisions.</p>
          </li>
          <li class="ai-career-lane">
            <span class="ai-career-node"><small>Existing expertise</small><strong>Networks and systems</strong></span>
            <span class="ai-career-bridge">Integrate AI</span>
            <span class="ai-career-node"><small>Evolving path</small><strong>MLOps and DevOps</strong></span>
            <p>Build infrastructure to run and monitor models at scale.</p>
          </li>
        </ol>
      </figure>
      <p>AI can also be integrated directly into non-technical fields such as medicine, education, media, and industry, by developing smart solutions that support specialists in these sectors. This means AI is not exclusive to one path; it is a horizontal layer that can be added on top of most existing career paths.</p>

      <h2 id="workflow">A practical path in five steps</h2>
      <ol class="flow-steps">
        <li><strong>Know what you have</strong><span>Programming, algorithms, data structures</span></li>
        <li><strong>Strengthen the base</strong><span>Linear algebra, probability, statistics</span></li>
        <li><strong>Master the tools</strong><span>Python, libraries, and data</span></li>
        <li><strong>Pick an integration path</strong><span>A technical or non-technical field</span></li>
        <li><strong>Keep learning</strong><span>Research, tools, professional communities</span></li>
      </ol>

      <h2 id="faq">Frequently asked questions</h2>
      <div class="faq">
        <details>
          <summary>Will AI replace programmers?</summary>
          <p>It eliminates routine tasks more than the profession itself; a programmer may move from writing routine code to designing system architecture, tuning models, reviewing their outputs, and ensuring their reliability and safety.</p>
        </details>
        <details>
          <summary>Were my years of study wasted?</summary>
          <p>No. What you studied in programming, algorithms, data structures, and operating systems is a necessary foundation for understanding and developing AI systems, and it can become a launchpad to a higher level of specialization.</p>
        </details>
        <details>
          <summary>Where do I start learning AI?</summary>
          <p>Start with the mathematical foundation (linear algebra, probability, and statistics) and Python, then go deeper into collecting, cleaning, and understanding data, and do not neglect ethics.</p>
        </details>
      </div>

      <h2 id="conclusion">Conclusion: between blessing and curse</h2>
      <p>The question remains: is AI a blessing or a curse? The answer depends on the point of view and the way we interact with it. From a scientific and practical perspective, AI is a powerful tool that can boost productivity, improve the quality of decisions, and open new horizons for research and innovation. On the other hand, ignoring or resisting it out of fear may turn it into a real threat to career paths that do not evolve.</p>
      <p>The student who thinks their years of study were wasted may need to re-read reality: what they studied in programming, algorithms, data structures, and operating systems is a necessary foundation for understanding and developing AI systems. Instead of withdrawing, that foundation can become a starting point for a higher level of specialization. In the end, AI is not a substitute for humans but a multiplier of their abilities; whether it becomes a blessing or a curse depends on our readiness to learn, reshape our roles, and engage with it with awareness and responsibility.</p>
    `,
  };

  const main = document.querySelector("main[data-article]");
  if (!main) return;
  const article = main.querySelector("article");
  if (!article || !translations[main.dataset.article]) return;
  const arabicContent = article.innerHTML;
  const relatedTranslations = {
    "ux-web-design": `
      <h2>Related Articles</h2>
      <div class="related-grid">
        <a class="related-card" href="data-analysis-basics.html"><span>Data Analysis</span><strong>Data Analysis Basics: Types, Data Collection and Data Cleaning</strong></a>
        <a class="related-card" href="will-ai-replace-human-jobs.html"><span>AI & Technology</span><strong>Will AI Replace Human Jobs? Blessing or Curse?</strong></a>
      </div>
      <p><a class="btn btn-secondary" href="../writing.html#articles">All Articles</a></p>
    `,
    "data-analysis-basics": `
      <h2>Related Articles</h2>
      <div class="related-grid">
        <a class="related-card" href="ai-agents.html"><span>AI &amp; Technology</span><strong>AI Agents: From Science Fiction to Scientific Reality</strong></a>
        <a class="related-card" href="will-ai-replace-human-jobs.html"><span>AI & Technology</span><strong>Will AI Replace Human Jobs? Blessing or Curse?</strong></a>
      </div>
      <p><a class="btn btn-secondary" href="../writing.html#articles">All Articles</a></p>
    `,
    "ai-agents": `
      <h2>Related Articles</h2>
      <div class="related-grid">
        <a class="related-card" href="will-ai-replace-human-jobs.html"><span>AI & Technology</span><strong>Will AI Replace Human Jobs? Blessing or Curse?</strong></a>
        <a class="related-card" href="data-analysis-basics.html"><span>Data Analysis</span><strong>Data Analysis Basics: Types, Data Collection and Data Cleaning</strong></a>
      </div>
      <p><a class="btn btn-secondary" href="../writing.html#articles">All Articles</a></p>
    `,
    "ai-for-people-with-disabilities": `
      <h2>Related Articles</h2>
      <div class="related-grid">
        <a class="related-card" href="ux-web-design.html"><span>Design & UX</span><strong>Why Beautiful Websites Fail Without UX..?</strong></a>
        <a class="related-card" href="ai-agents.html"><span>AI &amp; Technology</span><strong>AI Agents: From Science Fiction to Scientific Reality</strong></a>
      </div>
      <p><a class="btn btn-secondary" href="../writing.html#articles">All Articles</a></p>
    `,
    "will-ai-replace-human-jobs": `
      <h2>Related Articles</h2>
      <div class="related-grid">
        <a class="related-card" href="data-analysis-basics.html"><span>Data Analysis</span><strong>Data Analysis Basics: Types, Data Collection and Data Cleaning</strong></a>
        <a class="related-card" href="ai-for-people-with-disabilities.html"><span>AI &amp; Accessibility</span><strong>AI Technologies for People with Disabilities</strong></a>
      </div>
      <p><a class="btn btn-secondary" href="../writing.html#articles">All Articles</a></p>
    `,
  };
  const related = main.querySelector(".related");
  const arabicRelated = related ? related.innerHTML : "";
  const breadcrumb = main.querySelector(".breadcrumb");
  const arabicBreadcrumb = breadcrumb ? breadcrumb.innerHTML : "";
  const breadcrumbTranslations = {
    "ux-web-design":
      '<a href="../index.html">Home</a> / <a href="../writing.html#articles">Articles</a> / <span>Design & UX</span>',
    "data-analysis-basics":
      '<a href="../index.html">Home</a> / <a href="../writing.html#articles">Articles</a> / <span>Data Analysis</span>',
    "ai-agents":
      '<a href="../index.html">Home</a> / <a href="../writing.html#articles">Articles</a> / <span>AI &amp; Technology</span>',
    "ai-for-people-with-disabilities":
      '<a href="../index.html">Home</a> / <a href="../writing.html#articles">Articles</a> / <span>AI &amp; Accessibility</span>',
    "will-ai-replace-human-jobs":
      '<a href="../index.html">Home</a> / <a href="../writing.html#articles">Articles</a> / <span>AI & Technology</span>',
  };
  const update = () => {
    if (document.documentElement.dir === "ltr") {
      article.innerHTML = translations[main.dataset.article];
      if (related)
        related.innerHTML = relatedTranslations[main.dataset.article];
      if (breadcrumb) {
        breadcrumb.innerHTML = breadcrumbTranslations[main.dataset.article];
        breadcrumb.setAttribute("aria-label", "Breadcrumb");
      }
    } else {
      article.innerHTML = arabicContent;
      if (related) related.innerHTML = arabicRelated;
      if (breadcrumb) {
        breadcrumb.innerHTML = arabicBreadcrumb;
        breadcrumb.setAttribute("aria-label", "مسار التنقل");
      }
    }
    const heading = article.querySelector("h1");
    if (heading)
      document.title = `${heading.textContent.trim()} | Rawan Abu Sittah`;
  };
  update();
  window.addEventListener("languagechange", update);
})();
