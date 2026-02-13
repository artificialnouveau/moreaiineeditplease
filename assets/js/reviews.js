/**
 * Customer Reviews System - Firestore Edition
 * Handles service ratings and feedback with Firebase Firestore integration
 */

// ============================================
// Review State
// ============================================

const ReviewState = {
    selectedService: null,
    selectedRating: null,
    allRatings: {}
};

// ============================================
// Initialize Reviews
// ============================================

function initReviews() {
    const serviceSelect = document.getElementById('service-select');
    const ratingButtons = document.querySelectorAll('.rating-btn');
    const submitButton = document.getElementById('submit-review-btn');

    if (!serviceSelect) return;

    // Service selection
    serviceSelect.addEventListener('change', (e) => {
        const serviceName = e.target.value;
        if (serviceName) {
            showReviewForm(serviceName);
        } else {
            hideReviewForm();
        }
    });

    // Rating button selection
    ratingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            ratingButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Store rating
            ReviewState.selectedRating = button.dataset.rating;
            // Enable submit button
            if (submitButton) {
                submitButton.disabled = false;
            }
        });
    });

    // Submit review
    if (submitButton) {
        submitButton.addEventListener('click', submitReview);
    }

    // Load ratings data
    loadRatingsData();
}

// ============================================
// Review Form Functions
// ============================================

function showReviewForm(serviceName) {
    ReviewState.selectedService = serviceName;

    const formContainer = document.getElementById('review-form-container');
    const serviceNameEl = document.getElementById('reviewing-service-name');

    if (formContainer) {
        formContainer.classList.remove('hidden');
    }

    if (serviceNameEl) {
        serviceNameEl.textContent = `Review: ${serviceName}`;
    }

    // Reset form
    resetReviewForm();
}

function hideReviewForm() {
    const formContainer = document.getElementById('review-form-container');
    if (formContainer) {
        formContainer.classList.add('hidden');
    }
    resetReviewForm();
}

function resetReviewForm() {
    // Clear rating selection
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Clear comment
    const commentField = document.getElementById('review-comment');
    if (commentField) {
        commentField.value = '';
    }

    // Disable submit button
    const submitButton = document.getElementById('submit-review-btn');
    if (submitButton) {
        submitButton.disabled = true;
    }

    // Clear status message
    const statusEl = document.getElementById('review-status');
    if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'review-status';
    }

    ReviewState.selectedRating = null;
}

// ============================================
// Submit Review
// ============================================

function submitReview() {
    if (!ReviewState.selectedService || !ReviewState.selectedRating) {
        showStatus('Please select a rating', 'error');
        return;
    }

    const comment = document.getElementById('review-comment')?.value || '';

    const reviewData = {
        service: ReviewState.selectedService,
        rating: ReviewState.selectedRating,
        comment: comment,
        timestamp: firebase.firestore.Timestamp.now()
    };

    if (firebaseInitialized && db) {
        // Save to Firestore
        saveToFirestore(reviewData);
    } else {
        // Save to localStorage as fallback
        saveToLocalStorage(reviewData);
    }
}

function saveToFirestore(reviewData) {
    // Save the review
    db.collection('reviews')
        .doc(ReviewState.selectedService)
        .collection('entries')
        .add(reviewData)
        .then(() => {
            // Update rating counts
            return updateRatingCount(ReviewState.selectedService, ReviewState.selectedRating);
        })
        .then(() => {
            showStatus('Thank you for your feedback! ✓', 'success');
            setTimeout(() => {
                resetReviewForm();
                loadRatingsData();
            }, 2000);
        })
        .catch((error) => {
            console.error('Error saving review:', error);
            showStatus('Error saving review. Please try again.', 'error');
        });
}

function updateRatingCount(service, rating) {
    const ratingsRef = db.collection('ratings').doc(service);

    return db.runTransaction((transaction) => {
        return transaction.get(ratingsRef).then((doc) => {
            const currentData = doc.exists ? doc.data() : { useful: 0, 'not-useful': 0, banned: 0 };
            const newCount = (currentData[rating] || 0) + 1;
            currentData[rating] = newCount;
            transaction.set(ratingsRef, currentData);
        });
    });
}

function saveToLocalStorage(reviewData) {
    // Fallback when Firebase is not configured
    let reviews = JSON.parse(localStorage.getItem('aiServiceReviews') || '[]');
    reviews.push({
        ...reviewData,
        timestamp: Date.now()
    });
    localStorage.setItem('aiServiceReviews', JSON.stringify(reviews));

    showStatus('Thank you for your feedback! ✓ (Saved locally)', 'success');
    setTimeout(() => {
        resetReviewForm();
        loadRatingsData();
    }, 2000);
}

function showStatus(message, type) {
    const statusEl = document.getElementById('review-status');
    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.className = `review-status ${type}`;
}

// ============================================
// Load and Display Ratings
// ============================================

function loadRatingsData() {
    if (firebaseInitialized && db) {
        loadFromFirestore();
    } else {
        loadFromLocalStorage();
    }
}

function loadFromFirestore() {
    db.collection('ratings')
        .get()
        .then((querySnapshot) => {
            const ratings = {};
            querySnapshot.forEach((doc) => {
                ratings[doc.id] = doc.data();
            });
            ReviewState.allRatings = ratings;
            displayRatings();
        })
        .catch((error) => {
            console.error('Error loading ratings:', error);
            loadFromLocalStorage(); // Fallback
        });
}

function loadFromLocalStorage() {
    // Calculate ratings from localStorage reviews
    const reviews = JSON.parse(localStorage.getItem('aiServiceReviews') || '[]');
    const ratings = {};

    reviews.forEach(review => {
        if (!ratings[review.service]) {
            ratings[review.service] = { useful: 0, 'not-useful': 0, banned: 0 };
        }
        ratings[review.service][review.rating] = (ratings[review.service][review.rating] || 0) + 1;
    });

    ReviewState.allRatings = ratings;
    displayRatings();
}

function displayRatings() {
    const ratingsGrid = document.getElementById('ratings-grid');
    if (!ratingsGrid) return;

    // Clear loading text
    ratingsGrid.innerHTML = '';

    // Get all unique services
    const services = Object.keys(ReviewState.allRatings);

    if (services.length === 0) {
        ratingsGrid.innerHTML = '<p class="no-ratings">No ratings yet. Be the first to review!</p>';
        return;
    }

    // Sort by total ratings (most reviewed first)
    services.sort((a, b) => {
        const totalA = getTotalRatings(ReviewState.allRatings[a]);
        const totalB = getTotalRatings(ReviewState.allRatings[b]);
        return totalB - totalA;
    });

    // Display each service rating
    services.forEach(service => {
        const ratings = ReviewState.allRatings[service];
        const ratingCard = createRatingCard(service, ratings);
        ratingsGrid.appendChild(ratingCard);
    });
}

function createRatingCard(serviceName, ratings) {
    const card = document.createElement('div');
    card.className = 'rating-card';

    const useful = ratings.useful || 0;
    const notUseful = ratings['not-useful'] || 0;
    const banned = ratings.banned || 0;
    const total = useful + notUseful + banned;

    const usefulPercent = total > 0 ? Math.round((useful / total) * 100) : 0;
    const notUsefulPercent = total > 0 ? Math.round((notUseful / total) * 100) : 0;
    const bannedPercent = total > 0 ? Math.round((banned / total) * 100) : 0;

    card.innerHTML = `
        <h4 class="rating-card-title">${serviceName}</h4>
        <div class="rating-stats">
            <div class="rating-stat useful-stat">
                <span class="stat-emoji">👍</span>
                <span class="stat-label">Useful</span>
                <span class="stat-value">${usefulPercent}%</span>
                <div class="stat-bar">
                    <div class="stat-bar-fill useful" style="width: ${usefulPercent}%"></div>
                </div>
            </div>
            <div class="rating-stat not-useful-stat">
                <span class="stat-emoji">👎</span>
                <span class="stat-label">Not Useful</span>
                <span class="stat-value">${notUsefulPercent}%</span>
                <div class="stat-bar">
                    <div class="stat-bar-fill not-useful" style="width: ${notUsefulPercent}%"></div>
                </div>
            </div>
            <div class="rating-stat banned-stat">
                <span class="stat-emoji">🚫</span>
                <span class="stat-label">Should Be Banned</span>
                <span class="stat-value">${bannedPercent}%</span>
                <div class="stat-bar">
                    <div class="stat-bar-fill banned" style="width: ${bannedPercent}%"></div>
                </div>
            </div>
        </div>
        <p class="rating-total">${total} ${total === 1 ? 'review' : 'reviews'}</p>
    `;

    return card;
}

function getTotalRatings(ratings) {
    if (!ratings) return 0;
    return (ratings.useful || 0) + (ratings['not-useful'] || 0) + (ratings.banned || 0);
}

// ============================================
// Initialize on Load
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviews);
} else {
    initReviews();
}
