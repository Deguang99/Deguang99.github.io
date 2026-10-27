# Deguang Li — academic website

A lightweight static website (HTML, CSS, JavaScript), with all images hosted locally. No build system, paid hosting, tracking, or third-party fonts required.

## Publish with GitHub Pages (beginner-friendly)

1. Download and unzip the website package.
2. Open your GitHub repository `Deguang99/Deguang99.github.io`.
3. Select **Add file → Upload files** (or upload from the repository file view).
4. Drag **the contents** of the `deguang-website` folder into the repository, including `index.html`, `style.css`, `script.js`, and the entire `assets` folder. Do **not** upload the enclosing `deguang-website` folder as one extra level.
5. Select **Commit changes**.
6. Under **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/ (root)`; save. If already configured, no changes needed.
7. Visit `https://deguang99.github.io/` after deployment (often a few minutes).

## Updating

- Text: edit `index.html` (use GitHub's pencil icon).
- Appearance: edit `style.css`.
- Interactions, map notes, heatmap labels: edit `script.js`.
- Images: replace matching files in `assets`.
- CV: replace `assets/Deguang_Li_CV.pdf` with a current public-safe PDF.

## Publication checklist

- Confirm the selected heatmap labels against the original QGIS project; the Paris slides showed four titles for five supplied exports, so only four have been used.
- Check the historic-map, modern-map, and reproduced-source attribution/licensing before public release.
- Approximate annotated map marker positions are visual references to the user's presentation, **not geospatial measurements**. Verify or remove any marker that doesn't align.
- Confirm publication statuses, dissertation supervisor names, and institutional details before applying for fellowships.
- Review the CV for contact details and other information before posting publicly.
- GitHub Pages availability in mainland China can vary; this build avoids external CDNs but cannot guarantee access.

This site intentionally does not publish the research corpus or archival reproductions as a downloadable dataset.
