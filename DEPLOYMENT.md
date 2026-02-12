# Deployment Guide

Step-by-step instructions for deploying "Will I Have A Job?" to GitHub Pages.

## Prerequisites

- Git installed on your system
- GitHub account created
- Repository created at: `https://github.com/forpublicai/willihaveajob`

## Step 1: Initialize Git Repository

```bash
cd /Users/ahnjili_harmony/Documents/willihaveajob
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: Will I Have A Job satirical website

- Complete HTML structure with all sections
- Garish lottery ticket aesthetic CSS
- Occupation prediction system with 60+ jobs
- Deterministic hash algorithm for consistency
- Countdown timer with urgency levels
- Slot machine odds calculator
- Sparkle and confetti animation systems
- Web Audio API with autoplay handling
- Escalating popup system
- Rotating vulnerable profiles
- Fake urgent timer
- Accessibility features (keyboard nav, reduced motion)
- Responsive design (mobile, tablet, desktop)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Step 4: Add Remote Repository

```bash
git remote add origin https://github.com/forpublicai/willihaveajob.git
```

## Step 5: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Step 6: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/forpublicai/willihaveajob`
2. Click on **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

## Step 7: Verify Deployment

Your site will be live at: `https://forpublicai.github.io/willihaveajob/`

### Check for Issues:

1. Open browser console (F12)
2. Look for any 404 errors
3. Verify all CSS/JS files load
4. Test basic functionality:
   - Search an occupation
   - Check countdown timer
   - Verify popups appear
   - Test profile rotation

## Optional: Add Custom Domain

If you want to use a custom domain:

1. In GitHub repository settings → Pages
2. Enter your custom domain
3. Update your DNS records:
   - Add CNAME record pointing to `forpublicai.github.io`
   - Or add A records to GitHub's IP addresses

## Optional: Add Audio Files

If you want to include sound effects:

1. Obtain royalty-free audio files (see `assets/sounds/README.md`)
2. Add them to `assets/sounds/`:
   - `slot-machine.mp3`
   - `winner.mp3`
   - `ding.mp3`
3. Commit and push:

```bash
git add assets/sounds/*.mp3
git commit -m "Add audio files"
git push
```

## Optional: Add Profile Images

If you want real profile images:

1. Generate faces from [ThisPersonDoesNotExist.com](https://thispersondoesnotexist.com/)
2. Save 10 images as `profile1.jpg` through `profile10.jpg`
3. Place in `assets/images/profiles/`
4. Commit and push:

```bash
git add assets/images/profiles/*.jpg
git commit -m "Add profile images"
git push
```

## Troubleshooting

### Site not loading after enabling Pages

- Wait 2-3 minutes, GitHub needs time to build
- Check GitHub Pages settings are correct
- Verify branch name is `main` (not `master`)

### CSS/JS not loading

- Check file paths in `index.html` are relative
- Verify capitalization matches exactly
- Check browser console for 404 errors

### Audio not working

- Make sure audio files exist in `assets/sounds/`
- Check file names match exactly
- Click "Activate Predictions" button if overlay appears
- Check browser console for errors

### Images not loading

- Verify images exist in `assets/images/profiles/`
- Check file names match (`profile1.jpg` not `Profile1.jpg`)
- Fallback SVG placeholders will show if images missing

## Updating the Site

After making changes locally:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically rebuild (usually takes 1-2 minutes).

## Performance Optimization

### Optional: Compress Images

If profile images are large:

```bash
# Using ImageMagick
for img in assets/images/profiles/*.jpg; do
  convert "$img" -quality 85 -resize 400x400 "$img"
done
```

### Optional: Minify Files

For even better performance, you can minify CSS/JS:

- Use [CSS Minifier](https://cssminifier.com/)
- Use [JavaScript Minifier](https://javascript-minifier.com/)

But this is optional - the site is already fast enough.

## Analytics (Optional)

If you want to track visitors:

1. Create Google Analytics account (or use privacy-respecting alternatives like Plausible)
2. Add tracking code to `index.html` before `</head>`
3. Commit and push

## Social Media Preview

To make the site look good when shared:

Add these meta tags to `index.html` in the `<head>`:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://forpublicai.github.io/willihaveajob/">
<meta property="og:title" content="Will I Have A Job? AI Replacement Prediction">
<meta property="og:description" content="Find out when AI will make your occupation obsolete! (Satire)">
<meta property="og:image" content="https://forpublicai.github.io/willihaveajob/preview.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://forpublicai.github.io/willihaveajob/">
<meta property="twitter:title" content="Will I Have A Job? AI Replacement Prediction">
<meta property="twitter:description" content="Find out when AI will make your occupation obsolete! (Satire)">
<meta property="twitter:image" content="https://forpublicai.github.io/willihaveajob/preview.jpg">
```

Then create a `preview.jpg` (1200x630px) screenshot of the site.

## Backup Strategy

Keep backups of your work:

1. GitHub already serves as a backup
2. Consider downloading repository as ZIP periodically
3. Or clone to multiple locations:

```bash
git clone https://github.com/forpublicai/willihaveajob.git backup/
```

## License

This project is public domain / MIT licensed. Update the README if you want to specify a different license.

## Questions?

- Check GitHub Issues for common problems
- Review the TESTING.md checklist
- Consult the main README.md

Happy deploying! 🎰
