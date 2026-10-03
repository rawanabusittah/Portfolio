# Banipal: Accessible E-Library with AI and Computer Vision

> بانيبال: مكتبة إلكترونية لذوي الهمم باستخدام الذكاء الصنعي والإبصار الحاسوبي

Graduation project, Department of Computer and Automation Engineering, Damascus University (2022-2023).
Team: Rawan Omar Abu Sitteh, Rahaf Mahmoud Hamat, Hind Mohammad Samir Al-Qaddah. Supervisor: Eng. Mahdi Aliwi.

![Home page](docs/home.jpg)

## The problem
Most e-libraries assume the reader can use a mouse, keyboard and screen. Banipal lets people with disabilities browse, search and listen to books **without using their hands**.

## Features
- **Head and eye control:** move the cursor with head movement; blink/eye-closure and mouth-opening ratios trigger left click, right click and scroll.
- **Voice assistant:** speech to text, then commands that find and play audiobooks.
- **AI book summaries:** DistilBART (`sshleifer/distilbart-cnn-12-6`, trained on CNN/DailyMail).
- **Most-searched books:** counts search frequency and shows the most requested titles.
- About 1,000 books in categories (novels, Arabic grammar, programming, ...), author pages with each author's works in tables, search, and an admin area to add books and managers.

## Architecture
| Layer | Technology |
|---|---|
| Front end | HTML, CSS, JavaScript, Bootstrap |
| Back end | PHP, MySQL |
| Face control | Python, OpenCV, Dlib, NumPy, PyAutoGUI |
| Summarization | DistilBART (Hugging Face Transformers) |
| Modeling | Prototype-based development, UML use-case diagrams |

**How face control works:** capture a frame, locate the face and landmarks with Dlib, compute the eye aspect ratio and mouth-opening ratio, compare with thresholds, then trigger the click/scroll or move the cursor with PyAutoGUI.

## Getting started
> TODO: replace the placeholders below with the real file names from this repository.

1. Put the web files in your PHP server folder (e.g. XAMPP `htdocs`).
2. Create a MySQL database and import `<your-sql-file>.sql`.
3. Set the database credentials in `<your-config-file>.php`.
4. Face control module:
   ```bash
   pip install opencv-python dlib numpy pyautogui
   python <your-face-control-script>.py
   ```
   (Dlib needs its facial-landmark model file; add its download link here.)

## Evaluation
- Usability: tested with a visitor with a disability who navigated by head movement and read using only voice.
- Summaries: BLEU = 0.9. *Note:* BLEU measures lexical overlap and this value is unusually high for abstractive summarization; the sample size and reference summaries should be stated, and ROUGE plus human evaluation are recommended.

## Limitations and future work
- Face control is sensitive to lighting, camera angle and per-user thresholds.
- Summarization works on English text; Arabic summaries are future work.
- Planned: 1,000,000 books, more audiobooks, whole-site voice control, personalized recommendations, reader discussion space.
