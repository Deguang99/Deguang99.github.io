# Website maintenance — stable v7.12 source cleanup

## Scope of this cleanup
- Source: `Deguang_Li_Academic_Website_v7_12_Cambridge_archives.zip`.
- Only removed one byte-identical, redundant CSS rule: `.press-image-wrap{position:relative}` (the other copy remains).
- `index.html`, `script.js`, and every file in `assets/` are **byte-for-byte unchanged**. No maps, markers, coordinates, or images were edited.
- Added this maintenance note and `SHA256SUMS.txt`. No content/data restructuring was attempted because that could affect working interactions.

## Updating a GitHub Pages site
1. Keep the original v7.12 ZIP as a rollback copy.
2. If desired, upload the contents of `academic-website/` to the existing repository root, replacing the existing files. The site will automatically redeploy if Pages uses the `main` branch root.
3. This cleanup is **optional** to deploy: it makes no intended visual or functional change. You can instead retain this ZIP locally and keep published v7.12 unchanged.
4. For future changes, edit the repository source files and commit changes; keep the original ZIP separately.
5. Do not upload the containing `academic-website/` directory as a nested folder if GitHub Pages expects `index.html` at repository root.

## Verification
- Compare `SHA256SUMS.txt` with local files to verify backup integrity.
- Check maps, click interactions, and GIS points after any future functional edits.
