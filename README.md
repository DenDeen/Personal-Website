# Mikkel Skovdal's Personal Website ✨

[![Deploy Sphinx site to Pages](https://github.com/dendeen/dendeen.github.io/actions/workflows/deploy-sphinx.yml/badge.svg)](https://github.com/dendeen/dendeen.github.io/actions/workflows/deploy-sphinx.yml)

**🚀 Live Site:** [**https://dendeen.github.io/**](https://dendeen.github.io/) _(Replace `dendeen` with your actual GitHub username!)_

<!-- ### Add a cool screenshot of your site here! -->
<!-- ![Website Screenshot](link/to/your/screenshot.png) -->
<!-- Example: -->
<!-- <p align="center"><img src="docs/_static/images/screenshot_example.png" width="70%"></p> -->

---

## 👋 Welcome!

Hey there! This repository holds the source code for my personal little corner of the internet. It's built with **Sphinx** and hosted on **GitHub Pages**.

Think of it as my digital playground where I showcase:

*   My journey and experience in **AI Engineering** and **Data Science**.
*   Cool **projects** I've worked on (especially my MSc Thesis at Imec!).
*   My burning passion for the **intersection of AI and Semiconductor Technology** 🤖 + ⚡️.

Basically, it's my enhanced CV, project portfolio, and nerdy interest hub all rolled into one, designed to give you a better idea of who I am and what makes me tick.

## 🛠️ Tech Stack

This site is built using:

*   **[Sphinx](https://www.sphinx-doc.org/en/master/):** A powerful Python documentation generator, great for structured content.
*   **[Furo Theme](https://pradyunsg.me/furo/):** A clean, modern, and highly customizable Sphinx theme with awesome light/dark mode support (dark mode FTW! 🌙).
*   **reStructuredText (`.rst`):** The primary markup language used by Sphinx.
*   **HTML/CSS:** With a sprinkle of custom CSS (`_static/css/custom.css`) for personalization.
*   **Python:** For Sphinx itself.
*   **GitHub Pages:** For hosting the static HTML output.
*   **GitHub Actions:** For automating the build and deployment process (see `.github/workflows/deploy-sphinx.yml`).

*(Why Sphinx? After exploring other options, I landed on Sphinx for its robust structure, great theming (especially Furo!), and its natural fit within the Python ecosystem I work in daily.)*

## 💻 Running Locally

Want to tinker or see how it builds?

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dendeen/dendeen.github.io.git
    cd dendeen.github.io
    ```
    _(Replace `dendeen` with your username!)_

2.  **Create and activate a virtual environment** (Recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Build the HTML site:**
    ```bash
    sphinx-build -b html docs docs/_build/html
    # Or if you have 'make' setup (common with sphinx-quickstart):
    # make html
    ```

5.  **Open the site:**
    Open the `docs/_build/html/index.html` file in your favorite web browser. Voila!

## 🚀 Deployment

This site is automatically deployed to GitHub Pages via a GitHub Actions workflow defined in `.github/workflows/deploy-sphinx.yml`.

*   Every push to the `main` branch triggers the action.
*   The action builds the static HTML using Sphinx.
*   The resulting files from `docs/_build/html` are pushed to the `gh-pages` branch.
*   GitHub Pages is configured to serve the site from the `gh-pages` branch.
*   The `.nojekyll` file in the root ensures GitHub Pages doesn't try to process the site with Jekyll.

## 🤔 Contributing / Feedback

While this is primarily my personal site, feel free to open an issue if you spot a typo, a broken link, or have a suggestion!

---

Thanks for stopping by! Feel free to connect via the links on the site. 😄
