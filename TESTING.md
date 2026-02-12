# Testing Checklist

Use this checklist to verify all functionality before deployment.

## ✅ File Structure Verification

- [x] index.html exists in root
- [x] assets/css/main.css exists
- [x] assets/css/animations.css exists
- [x] assets/css/popup.css exists
- [x] assets/js/main.js exists
- [x] assets/js/occupations.js exists
- [x] assets/js/animations.js exists
- [x] assets/js/audio.js exists
- [x] assets/js/popup.js exists
- [ ] README.md explains the project
- [ ] .gitignore excludes system files

## 🔍 Manual Testing Checklist

### Search Functionality
- [ ] Occupation input accepts text
- [ ] Search button triggers search
- [ ] Enter key triggers search
- [ ] Empty search shakes input field
- [ ] Same occupation returns consistent results
- [ ] Different occupations return different results
- [ ] Results section appears after search
- [ ] Scroll to results works smoothly

### Countdown Timer
- [ ] Timer displays correctly (days:hours:minutes:seconds)
- [ ] Timer updates every second
- [ ] Numbers are zero-padded correctly
- [ ] Urgency styling applies correctly:
  - [ ] < 30 days = critical (red, blinking)
  - [ ] < 365 days = warning (orange)
  - [ ] > 365 days = moderate (yellow)
- [ ] Past dates show "ALREADY OBSOLETE!"

### Odds Calculator
- [ ] All odds start at 0.0
- [ ] Numbers "roll" like slot machine
- [ ] Augment odds animate to 0.3%
- [ ] Replace odds animate to 47.0%
- [ ] Upskill odds animate to 99.9%
- [ ] Ding sound plays (if audio enabled)
- [ ] Jackpot flash effect triggers
- [ ] Confetti burst appears

### Animation Systems

#### Sparkles
- [ ] Sparkles appear continuously
- [ ] Maximum 20 sparkles on screen
- [ ] Sparkles float upward
- [ ] Sparkles twinkle/fade
- [ ] No memory leaks (check over time)

#### Confetti
- [ ] Confetti appears on jackpot
- [ ] Particles fall with gravity
- [ ] Particles rotate
- [ ] Multiple colors appear
- [ ] Canvas clears when particles are gone
- [ ] Performance is smooth (60fps)

### Audio System
- [ ] Audio unlock overlay appears (if autoplay blocked)
- [ ] "Click to Win" button unlocks audio
- [ ] Background music loops (if enabled)
- [ ] Winner sound plays on jackpot
- [ ] Ding sound plays on odds complete
- [ ] Volume is reasonable
- [ ] No audio errors in console
- [ ] Works without audio files (fails gracefully)

### Popup System
- [ ] First popup appears after 15 seconds
- [ ] Popup content is satirical
- [ ] Popup can be dismissed with X button
- [ ] Popup can be dismissed with CTA button
- [ ] Popup can be dismissed with Escape key
- [ ] Popup can be dismissed by clicking overlay
- [ ] Frequency increases after dismissing
- [ ] Eventually reaches 5-second minimum
- [ ] Popup shake animation works
- [ ] Focus moves to close button

### Vulnerable Profiles
- [ ] First profile displays on load
- [ ] Profile rotates every 10 seconds
- [ ] Previous button works
- [ ] Next button works
- [ ] Manual navigation resets auto-rotation
- [ ] All 10 profiles are accessible
- [ ] Counter shows current/total correctly
- [ ] Profile images load (or show placeholder)
- [ ] Transition animation works smoothly
- [ ] All profile data displays correctly

### Urgent Timer
- [ ] Timer shows initial random time (3-15 min)
- [ ] Timer counts down every second
- [ ] Timer resets when reaching zero
- [ ] "TIMER EXTENDED!" flash appears
- [ ] Timer has blinking effect
- [ ] Timer stays fixed at top

### CTA Section
- [ ] "START UPSKILLING NOW!" button visible
- [ ] Clicking button hides it
- [ ] Satire reveal text appears
- [ ] Popups stop after revealing
- [ ] Success popup appears
- [ ] Confetti burst triggers

## 📱 Responsive Design Testing

### Desktop (1920x1080)
- [ ] Layout looks correct
- [ ] All elements are readable
- [ ] No horizontal scroll
- [ ] Spacing is appropriate

### Tablet (768x1024)
- [ ] Layout adapts correctly
- [ ] Text sizes are readable
- [ ] Buttons are tappable
- [ ] Cards stack properly

### Mobile (375x667)
- [ ] Single column layout
- [ ] All content is accessible
- [ ] Text is readable without zooming
- [ ] Buttons are large enough to tap
- [ ] No content is cut off
- [ ] Countdown fits on screen

## 🌐 Browser Testing

### Chrome/Edge (Chromium)
- [ ] All features work
- [ ] Animations are smooth
- [ ] Audio works (after unlock)
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] Animations are smooth
- [ ] Audio works
- [ ] No console errors

### Safari (Desktop)
- [ ] All features work
- [ ] Animations are smooth
- [ ] Audio works
- [ ] No console errors

### Safari (iOS)
- [ ] Touch interactions work
- [ ] Animations perform well
- [ ] Audio unlock works
- [ ] No layout issues

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab key moves through interactive elements
- [ ] Enter activates buttons
- [ ] Escape closes popups
- [ ] Focus indicators are visible
- [ ] Tab order is logical

### Screen Reader
- [ ] Page structure is logical
- [ ] ARIA labels are present
- [ ] Dynamic content is announced
- [ ] Images have alt text
- [ ] Headings are hierarchical

### Reduced Motion
- [ ] Sparkles are disabled
- [ ] Confetti is disabled
- [ ] Animations are simplified
- [ ] Essential transitions remain
- [ ] Site is still usable

### High Contrast
- [ ] Text is readable
- [ ] Borders are visible
- [ ] Focus indicators work
- [ ] Color contrast is sufficient

## ⚡ Performance Testing

### Lighthouse Audit
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### Load Time
- [ ] Initial load < 2 seconds (good connection)
- [ ] Initial load < 5 seconds (3G connection)
- [ ] Images lazy load or optimized
- [ ] No render-blocking resources

### Memory Usage
- [ ] No memory leaks over 5 minutes
- [ ] Sparkle cleanup works
- [ ] Confetti cleanup works
- [ ] Intervals are cleared properly

## 🚀 Deployment Verification

### GitHub Pages
- [ ] Repository pushed to GitHub
- [ ] GitHub Pages enabled in settings
- [ ] Site accessible at GitHub Pages URL
- [ ] All assets load correctly (relative paths)
- [ ] No 404 errors in console
- [ ] Audio files load (if present)
- [ ] Images load (if present)

### Cross-Origin Issues
- [ ] No CORS errors
- [ ] Audio loads from same origin
- [ ] Images load from same origin

## 🐛 Known Issues / Future Improvements

Document any issues found during testing:

1. **Audio files not included**: Site works without them, but experience is diminished
2. **Profile images not included**: Placeholders work but look less polished
3. **No caching strategy**: Could add service worker for offline support
4. **No analytics**: Could add privacy-respecting analytics
5. **Limited occupation data**: Could expand to 100+ occupations

## 📝 Test Notes

Add notes here about specific test results, bugs found, or observations:

```
Date: ___________
Tester: ___________

Notes:
-
-
-
```

## ✨ Final Checklist Before Launch

- [ ] All critical tests pass
- [ ] No console errors
- [ ] README is complete and accurate
- [ ] .gitignore includes necessary files
- [ ] License information is clear
- [ ] Contact/attribution information is included
- [ ] Satire disclaimer is prominent
- [ ] Site works on major browsers
- [ ] Site works on mobile devices
- [ ] Performance is acceptable
- [ ] Accessibility baseline is met
