/**
 * Will I Have A Job? - Main Application
 *
 * Orchestrates all systems: search, countdown, odds, profiles, timers, etc.
 */

// ============================================
// Application State
// ============================================

const AppState = {
    currentPrediction: null,
    countdownInterval: null,
    urgentTimerInterval: null,
    profileRotationInterval: null,
    currentProfileIndex: 0,
    searchPerformed: false
};

// ============================================
// Profile Data
// ============================================

const VULNERABLE_PROFILES = [
    {
        name: "Jennifer K.",
        title: "Marketing Manager",
        company: "TechCorp Solutions",
        experience: "12 years",
        lastUpskill: "2019",
        probability: "89%",
        daysRemaining: 342,
        note: "Still using social media strategies from 2018. AI can now generate campaigns in seconds.",
        image: "assets/images/profiles/profile1.jpg"
    },
    {
        name: "Michael T.",
        title: "Data Analyst",
        company: "Finance Global Inc",
        experience: "8 years",
        lastUpskill: "2020",
        probability: "76%",
        daysRemaining: 198,
        note: "Spends 80% of time on Excel. AI can do that analysis before his coffee gets cold.",
        image: "assets/images/profiles/profile2.jpg"
    },
    {
        name: "Sarah L.",
        title: "Content Writer",
        company: "Media Dynamics",
        experience: "6 years",
        lastUpskill: "2021",
        probability: "92%",
        daysRemaining: 156,
        note: "Hasn't learned about GPT-4. Meanwhile, GPT-5 is writing bestsellers.",
        image: "assets/images/profiles/profile3.jpg"
    },
    {
        name: "David R.",
        title: "Graphic Designer",
        company: "Creative Studio LLC",
        experience: "15 years",
        lastUpskill: "2018",
        probability: "81%",
        daysRemaining: 287,
        note: "Still manually designing logos. AI generates 100 variations in 10 seconds.",
        image: "assets/images/profiles/profile4.jpg"
    },
    {
        name: "Emily W.",
        title: "Customer Service Rep",
        company: "RetailMart",
        experience: "5 years",
        lastUpskill: "2022",
        probability: "94%",
        daysRemaining: 89,
        note: "Chatbots already handle 70% of queries. She handles the angry ones. For now.",
        image: "assets/images/profiles/profile5.jpg"
    },
    {
        name: "Robert H.",
        title: "Accountant",
        company: "Numbers & Associates",
        experience: "20 years",
        lastUpskill: "2017",
        probability: "73%",
        daysRemaining: 421,
        note: "Proudly uses the same Excel macros from 2015. AI doesn't need macros.",
        image: "assets/images/profiles/profile6.jpg"
    },
    {
        name: "Amanda P.",
        title: "HR Coordinator",
        company: "People First Corp",
        experience: "9 years",
        lastUpskill: "2020",
        probability: "68%",
        daysRemaining: 512,
        note: "Screens 50 resumes per day. AI screens 50,000 per second.",
        image: "assets/images/profiles/profile7.jpg"
    },
    {
        name: "James C.",
        title: "Financial Analyst",
        company: "Investment Partners",
        experience: "11 years",
        lastUpskill: "2019",
        probability: "79%",
        daysRemaining: 234,
        note: "Makes quarterly predictions. AI makes microsecond predictions. See the problem?",
        image: "assets/images/profiles/profile8.jpg"
    },
    {
        name: "Lisa M.",
        title: "Social Media Manager",
        company: "Brand Builders",
        experience: "7 years",
        lastUpskill: "2021",
        probability: "87%",
        daysRemaining: 167,
        note: "Posts 10 times a day manually. AI influencers post 1000x and never sleep.",
        image: "assets/images/profiles/profile9.jpg"
    },
    {
        name: "Christopher B.",
        title: "Software Developer",
        company: "DevShop Inc",
        experience: "14 years",
        lastUpskill: "2020",
        probability: "71%",
        daysRemaining: 398,
        note: "Writes 200 lines of code per day. Copilot writes 2000. And it doesn't need Stack Overflow.",
        image: "assets/images/profiles/profile10.jpg"
    }
];

// ============================================
// Initialize Application
// ============================================

/**
 * Initialize application on DOM load
 */
function initApp() {
    // Set up search functionality
    setupSearch();

    // Set up urgent timer
    startUrgentTimer();

    // Set up profile rotation
    startProfileRotation();

    // Set up CTA button
    setupCTAButton();

    // Start popup system (shows once after 10 seconds)
    if (typeof startPopups === 'function') {
        startPopups();
    }

    console.log('Will I Have A Job? - Initialized');
}

// ============================================
// Search Functionality
// ============================================

/**
 * Set up occupation search
 */
function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const input = document.getElementById('occupation-input');

    if (!searchBtn || !input) return;

    // Search on button click
    searchBtn.addEventListener('click', () => performSearch());

    // Search on Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Perform occupation search
 */
function performSearch() {
    const input = document.getElementById('occupation-input');
    if (!input) return;

    const occupation = input.value.trim();

    if (!occupation) {
        shakeElement(input);
        return;
    }

    // Get prediction
    if (typeof getPrediction !== 'function') {
        console.error('getPrediction function not found');
        return;
    }

    AppState.currentPrediction = getPrediction(occupation);
    AppState.searchPerformed = true;

    // Display results
    displayResults();

    // Play sound
    if (typeof playSlotMachineSound === 'function') {
        playSlotMachineSound();
    }

    // Create sparkle burst
    if (typeof createSparkleBurst === 'function') {
        createSparkleBurst(15);
    }

    // Scroll to results
    setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}

/**
 * Display search results
 */
function displayResults() {
    if (!AppState.currentPrediction) return;

    const resultsSection = document.getElementById('results-section');
    if (!resultsSection) return;

    // Show results section
    resultsSection.classList.remove('hidden');

    // Display occupation
    const occupationEl = document.getElementById('result-occupation');
    if (occupationEl) {
        occupationEl.textContent = AppState.currentPrediction.occupation;
    }

    // Display obsolescence date
    const dateEl = document.getElementById('obsolete-date');
    if (dateEl) {
        dateEl.textContent = AppState.currentPrediction.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Display AI model
    const modelEl = document.getElementById('ai-model');
    if (modelEl) {
        modelEl.textContent = AppState.currentPrediction.model;
    }

    // Display prediction note
    const noteEl = document.getElementById('prediction-note');
    if (noteEl) {
        noteEl.textContent = AppState.currentPrediction.note;
    }

    // Start countdown
    startCountdown();

    // Animate odds calculator
    animateOdds();
}

// ============================================
// Countdown Timer
// ============================================

/**
 * Start countdown timer
 */
function startCountdown() {
    // Clear existing interval
    if (AppState.countdownInterval) {
        clearInterval(AppState.countdownInterval);
    }

    // Update immediately
    updateCountdown();

    // Update every second
    AppState.countdownInterval = setInterval(updateCountdown, 1000);
}

/**
 * Update countdown display
 */
function updateCountdown() {
    if (!AppState.currentPrediction) return;

    const timeRemaining = calculateTimeRemaining(AppState.currentPrediction.date);

    // Update display
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(timeRemaining.days).padStart(3, '0');
    if (hoursEl) hoursEl.textContent = String(timeRemaining.hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(timeRemaining.minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(timeRemaining.seconds).padStart(2, '0');

    // Apply urgency styling
    if (typeof applyCountdownUrgency === 'function') {
        const urgency = getUrgencyLevel(timeRemaining.days);
        applyCountdownUrgency(urgency);
    }

    // Handle obsolete jobs
    if (timeRemaining.isObsolete) {
        showObsoleteMessage();
    }
}

/**
 * Show "Already Obsolete" message
 */
function showObsoleteMessage() {
    const countdownDisplay = document.getElementById('countdown-display');
    if (countdownDisplay) {
        countdownDisplay.innerHTML = '<div style="font-size: 2rem; color: #FF0000; font-weight: 900;">ALREADY OBSOLETE!</div>';
    }

    if (AppState.countdownInterval) {
        clearInterval(AppState.countdownInterval);
        AppState.countdownInterval = null;
    }
}

// ============================================
// Odds Calculator
// ============================================

/**
 * Animate odds calculator
 */
function animateOdds() {
    const augmentEl = document.getElementById('augment-odds');
    const replaceEl = document.getElementById('replace-odds');
    const upskillEl = document.getElementById('upskill-odds');

    if (!augmentEl || !replaceEl || !upskillEl) return;

    // Reset to zero
    augmentEl.textContent = '0.0';
    replaceEl.textContent = '0.0';
    upskillEl.textContent = '0.0';

    // Animate each value with delay
    if (typeof animateSlotRoll === 'function') {
        // Augment odds
        setTimeout(() => {
            animateSlotRoll(augmentEl, 0.3, 1500, () => {
                if (typeof playDingSound === 'function') playDingSound();
            });
        }, 300);

        // Replace odds
        setTimeout(() => {
            animateSlotRoll(replaceEl, 47.0, 1800, () => {
                if (typeof playDingSound === 'function') playDingSound();
            });
        }, 800);

        // Upskill odds (jackpot!)
        setTimeout(() => {
            animateSlotRoll(upskillEl, 99.9, 2000, () => {
                if (typeof playDingSound === 'function') playDingSound();

                // Jackpot effects
                const upskillItem = upskillEl.closest('.odd-item');
                if (upskillItem && typeof addJackpotFlash === 'function') {
                    addJackpotFlash(upskillItem);
                }

                // Confetti burst
                if (typeof createConfettiBurst === 'function') {
                    createConfettiBurst(30);
                }
            });
        }, 1400);
    }
}

// ============================================
// Urgent Timer
// ============================================

/**
 * Start fake urgent timer
 */
function startUrgentTimer() {
    const timerText = document.getElementById('urgent-countdown');
    const banner = document.getElementById('urgent-timer-banner');

    if (!timerText || !banner) return;

    // Set initial random time (3-15 minutes)
    let remainingSeconds = Math.floor(Math.random() * (15 * 60 - 3 * 60 + 1)) + 3 * 60;

    const updateTimer = () => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            // Reset timer with flash
            remainingSeconds = Math.floor(Math.random() * (15 * 60 - 3 * 60 + 1)) + 3 * 60;

            // Flash effect
            banner.classList.add('timer-extended-flash');
            setTimeout(() => {
                banner.classList.remove('timer-extended-flash');
            }, 1000);

            // Temporary message
            timerText.textContent = 'TIMER EXTENDED!';
            setTimeout(() => {
                updateTimerDisplay();
            }, 2000);
        } else {
            updateTimerDisplay();
        }
    };

    const updateTimerDisplay = () => {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        timerText.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Initial display
    updateTimerDisplay();

    // Update every second
    AppState.urgentTimerInterval = setInterval(updateTimer, 1000);

    // Add blinking effect
    banner.classList.add('blinking');
}

// ============================================
// Profile Rotation
// ============================================

/**
 * Start profile rotation
 */
function startProfileRotation() {
    // Display first profile
    updateProfileDisplay();

    // Rotate every 10 seconds
    AppState.profileRotationInterval = setInterval(() => {
        nextProfile(true); // Auto-advance
    }, 10000);

    // Set up manual controls
    setupProfileControls();
}

/**
 * Set up profile carousel controls
 */
function setupProfileControls() {
    const prevBtn = document.getElementById('prev-profile');
    const nextBtn = document.getElementById('next-profile');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => previousProfile());
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => nextProfile(false));
    }
}

/**
 * Go to next profile
 * @param {boolean} isAuto - Whether this is auto-rotation
 */
function nextProfile(isAuto = false) {
    AppState.currentProfileIndex = (AppState.currentProfileIndex + 1) % VULNERABLE_PROFILES.length;

    if (typeof transitionProfile === 'function') {
        transitionProfile(updateProfileDisplay);
    } else {
        updateProfileDisplay();
    }

    // Reset auto-rotation timer if manual
    if (!isAuto) {
        resetProfileRotation();
    }
}

/**
 * Go to previous profile
 */
function previousProfile() {
    AppState.currentProfileIndex =
        (AppState.currentProfileIndex - 1 + VULNERABLE_PROFILES.length) % VULNERABLE_PROFILES.length;

    if (typeof transitionProfile === 'function') {
        transitionProfile(updateProfileDisplay);
    } else {
        updateProfileDisplay();
    }

    // Reset auto-rotation timer
    resetProfileRotation();
}

/**
 * Reset profile rotation timer
 */
function resetProfileRotation() {
    if (AppState.profileRotationInterval) {
        clearInterval(AppState.profileRotationInterval);
    }

    AppState.profileRotationInterval = setInterval(() => {
        nextProfile(true);
    }, 10000);
}

/**
 * Update profile display
 */
function updateProfileDisplay() {
    const profile = VULNERABLE_PROFILES[AppState.currentProfileIndex];

    // Update image (with fallback to placeholder)
    const imgEl = document.getElementById('profile-image');
    if (imgEl) {
        imgEl.src = profile.image;
        imgEl.alt = `Profile photo of ${profile.name}`;
        // Fallback to placeholder if image fails
        imgEl.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23333" width="150" height="150"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23FFD700" font-family="Arial" font-size="16"%3EProfile%3C/text%3E%3C/svg%3E';
        };
    }

    // Update text content
    const nameEl = document.getElementById('profile-name');
    const titleEl = document.getElementById('profile-title');
    const companyEl = document.getElementById('profile-company');
    const experienceEl = document.getElementById('profile-experience');
    const upskillEl = document.getElementById('profile-upskill');
    const probabilityEl = document.getElementById('profile-probability');
    const daysEl = document.getElementById('profile-days');
    const noteEl = document.getElementById('profile-note');

    if (nameEl) nameEl.textContent = profile.name;
    if (titleEl) titleEl.textContent = profile.title;
    if (companyEl) companyEl.textContent = profile.company;
    if (experienceEl) experienceEl.textContent = profile.experience;
    if (upskillEl) upskillEl.textContent = profile.lastUpskill;
    if (probabilityEl) probabilityEl.textContent = profile.probability;
    if (daysEl) daysEl.textContent = profile.daysRemaining;
    if (noteEl) noteEl.textContent = profile.note;

    // Update counter
    const currentEl = document.getElementById('profile-current');
    const totalEl = document.getElementById('profile-total');

    if (currentEl) currentEl.textContent = AppState.currentProfileIndex + 1;
    if (totalEl) totalEl.textContent = VULNERABLE_PROFILES.length;
}

// ============================================
// CTA Button
// ============================================

/**
 * Set up main CTA button
 */
function setupCTAButton() {
    const ctaBtn = document.getElementById('cta-main');
    const revealEl = document.getElementById('cta-reveal');

    if (!ctaBtn || !revealEl) return;

    ctaBtn.addEventListener('click', () => {
        // Hide button
        ctaBtn.style.display = 'none';

        // Show reveal text
        revealEl.classList.remove('hidden');
        revealEl.classList.add('reveal');

        // Stop popups
        if (typeof stopPopups === 'function') {
            stopPopups();
        }

        // Show success popup
        setTimeout(() => {
            if (typeof showSuccessPopup === 'function') {
                showSuccessPopup();
            }
        }, 1000);

        // Extra confetti
        if (typeof createConfettiBurst === 'function') {
            createConfettiBurst(100);
        }
    });
}

// ============================================
// Cleanup
// ============================================

/**
 * Clean up intervals on page unload
 */
window.addEventListener('beforeunload', () => {
    if (AppState.countdownInterval) {
        clearInterval(AppState.countdownInterval);
    }
    if (AppState.urgentTimerInterval) {
        clearInterval(AppState.urgentTimerInterval);
    }
    if (AppState.profileRotationInterval) {
        clearInterval(AppState.profileRotationInterval);
    }
});

// ============================================
// Initialize on DOM Load
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
