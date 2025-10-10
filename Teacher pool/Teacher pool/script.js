// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    loadFacultyImages(); // Call the function to load faculty images
});

// Function to load faculty images from JSON
async function loadFacultyImages() {
    const facultyListDiv = document.getElementById('faculty-list');
    if (!facultyListDiv) return;

    try {
        const response = await fetch('image_urls.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const imageUrls = await response.json();

        imageUrls.forEach((url, index) => {
            let imageUrlToUse = url;
            if (index === 0) {
                imageUrlToUse = '/teachers.jpeg'; // Use local image for the first faculty
            }

            const facultyCard = document.createElement('div');
            facultyCard.className = 'faculty-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center p-4';

            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Faculty Photo';
            img.className = 'w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-600 shadow-md';
            img.onerror = function() { this.onerror=null; this.src='https://via.placeholder.com/128x128.png?text=No+Image'; }; // Fallback image

            // You can add more details here if your JSON had faculty names, etc.
            // For now, just displaying the image.
            const name = document.createElement('h3');
            name.className = 'text-xl font-semibold text-gray-800';
            name.textContent = 'Faculty Member'; // Placeholder

            facultyCard.appendChild(img);
            facultyCard.appendChild(name);
            facultyListDiv.appendChild(facultyCard);
        });

    } catch (error) {
        console.error('Error loading faculty images:', error);
        facultyListDiv.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load faculty images.</p>';
    }
}

// Enhanced main navigation function with dynamic effects
function navigateToSection(section) {
    // Add loading state to the clicked card
    const clickedCard = event.currentTarget;
    clickedCard.classList.add('loading');
    
    // Add ripple effect
    createRippleEffect(event, clickedCard);
    
    // Add success animation
    setTimeout(() => {
        clickedCard.classList.remove('loading');
        clickedCard.classList.add('success');
        
        setTimeout(() => {
            clickedCard.classList.remove('success');
        }, 2000);
        
        // Handle different sections
        switch(section) {
            case 'programs':
                handleProgramsSection();
                break;
            case 'research':
                handleResearchSection();
                break;
            case 'positions':
                handlePositionsSection();
                break;
            case 'campus':
                handleCampusSection();
                break;
            default:
                console.log('Unknown section:', section);
        }
    }, 300);
}

// Create ripple effect on click
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Handle Academic Programs Section
function handleProgramsSection() {
    showEnhancedNotification('Academic Programs', 'Explore teaching opportunities across our diverse academic departments including Engineering, Sciences, Management, and Liberal Arts.', 'graduation-cap');
}

// Handle Research Areas Section
function handleResearchSection() {
    showEnhancedNotification('Research Areas', 'Discover research opportunities in cutting-edge areas like AI/ML, Renewable Energy, Biotechnology, and Advanced Materials.', 'microscope');
}

// Handle Faculty Positions Section
function handlePositionsSection() {
    showEnhancedNotification('Faculty Positions', 'View current openings and learn about our application process for various academic positions.', 'user-tie');
}

// Handle Campus Life Section
function handleCampusSection() {
    showEnhancedNotification('Campus Life', 'Experience our world-class facilities, collaborative research environment, and vibrant academic community at TIET campus.', 'university');
}

// Show Programs List
function showPrograms(event) {
    event.preventDefault();
    
    // Add loading animation
    const cardsView = document.getElementById("cardsView");
    cardsView.style.opacity = '0';
    cardsView.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        cardsView.classList.add("hidden");
        const programsView = document.getElementById("programsView");
        programsView.classList.remove("hidden");
        programsView.style.opacity = '0';
        programsView.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            programsView.style.opacity = '1';
            programsView.style.transform = 'translateY(0)';
        }, 100);
    }, 300);
}

// Back to Cards
function backToCards() {
    const programsView = document.getElementById("programsView");
    programsView.style.opacity = '0';
    programsView.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        programsView.classList.add("hidden");
        const cardsView = document.getElementById("cardsView");
        cardsView.classList.remove("hidden");
        cardsView.style.opacity = '0';
        cardsView.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            cardsView.style.opacity = '1';
            cardsView.style.transform = 'translateY(0)';
        }, 100);
    }, 300);
}

// Navigate to AI Programs Page
function navigateToAIPrograms(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const cseCard = event.currentTarget;
    
    // Add loading animation
    cseCard.classList.add('loading');
    
    // Add ripple effect
    createRippleEffect(event, cseCard);
    
    // Add success animation
    setTimeout(() => {
        cseCard.classList.remove('loading');
        cseCard.classList.add('success');
        
        setTimeout(() => {
            cseCard.classList.remove('success');
            // Navigate to AI programs page
            window.location.href = 'ai-programs.html';
        }, 500);
    }, 300);
}

// Go back to main programs page
function goBack() {
    // Add loading animation
    const backButton = event.currentTarget;
    backButton.classList.add('loading');
    
    setTimeout(() => {
        backButton.classList.remove('loading');
        backButton.classList.add('success');
        
        setTimeout(() => {
            backButton.classList.remove('success');
            // Navigate back to main page
            window.location.href = 'index.html';
        }, 500);
    }, 300);
}

// Navigate to ML Faculty Page
function navigateToMLFaculty(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const mlCard = event.currentTarget;
    
    // Add loading animation
    mlCard.classList.add('loading');
    
    // Add ripple effect
    createRippleEffect(event, mlCard);
    
    // Add success animation
    setTimeout(() => {
        mlCard.classList.remove('loading');
        mlCard.classList.add('success');
        
        setTimeout(() => {
            mlCard.classList.remove('success');
            // Navigate to ML faculty page
            window.location.href = 'ml-faculty.html';
        }, 500);
    }, 300);
}

// Go back to AI Programs page
function goBackToAI() {
    // Add loading animation
    const backButton = event.currentTarget;
    backButton.classList.add('loading');
    
    setTimeout(() => {
        backButton.classList.remove('loading');
        backButton.classList.add('success');
        
        setTimeout(() => {
            backButton.classList.remove('success');
            // Navigate back to AI programs page
            window.location.href = 'ai-programs.html';
        }, 500);
    }, 300);
}

// Go back to main page from ML faculty
function goBackToMain() {
    // Add loading animation
    const backButton = event.currentTarget;
    backButton.classList.add('loading');
    
    setTimeout(() => {
        backButton.classList.remove('loading');
        backButton.classList.add('success');
        
        setTimeout(() => {
            backButton.classList.remove('success');
            // Navigate back to main page
            window.location.href = 'index.html';
        }, 500);
    }, 300);
}

// Enhanced notification function with animations
function showEnhancedNotification(title, message, icon) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'enhanced-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <i class="fas fa-${icon}"></i>
                <h3>${title}</h3>
            </div>
            <p>${message}</p>
            <div class="notification-actions">
                <button class="btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">Learn More</button>
                <button class="btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
            </div>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(139, 0, 0, 0.2);
        padding: 2rem;
        z-index: 1000;
        animation: enhancedSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 380px;
        border-left: 5px solid #8B0000;
        transform: translateX(100%);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 500);
        }
    }, 8000);
}

// Add enhanced animations and styles
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes enhancedSlideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .enhanced-notification .notification-header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1rem;
    }
    
    .enhanced-notification .notification-header i {
        font-size: 1.5rem;
        color: #8B0000;
        animation: iconBounce 2s ease-in-out infinite;
    }
    
    @keyframes iconBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
    }
    
    .enhanced-notification h3 {
        margin: 0;
        color: #8B0000;
        font-size: 1.3rem;
        font-weight: 600;
    }
    
    .enhanced-notification p {
        margin: 0 0 1.5rem 0;
        color: #4a5568;
        font-size: 1rem;
        line-height: 1.6;
    }
    
    .enhanced-notification .notification-actions {
        display: flex;
        gap: 1rem;
    }
    
    .enhanced-notification .btn-primary {
        background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
        color: white;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 500;
        transition: all 0.3s ease;
        flex: 1;
        box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
    }
    
    .enhanced-notification .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4);
    }
    
    .enhanced-notification .btn-secondary {
        background: #e2e8f0;
        color: #4a5568;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .enhanced-notification .btn-secondary:hover {
        background: #cbd5e0;
        transform: translateY(-2px);
    }
    
    /* Navigation enhancement */
    .nav-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .nav-item.active {
        animation: activePulse 2s ease-in-out infinite;
    }
    
    @keyframes activePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    /* Smooth transitions for view changes */
    .cards-container, .programs-list {
        transition: all 0.3s ease-in-out;
    }
    
    /* Enhanced button animations */
    .creative-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .creative-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(139, 0, 0, 0.4);
    }
    
    .creative-button:active {
        transform: translateY(-1px);
    }
`;
document.head.appendChild(enhancedStyle);

// Enhanced keyboard navigation with visual feedback
document.addEventListener('keydown', function(event) {
    const cards = document.querySelectorAll('.flex-card');
    
    switch(event.key) {
        case '1':
            highlightCard(cards[0]);
            cards[0].click();
            break;
        case '2':
            highlightCard(cards[1]);
            cards[1].click();
            break;
        case '3':
            highlightCard(cards[2]);
            cards[2].click();
            break;
        case '4':
            highlightCard(cards[3]);
            cards[3].click();
            break;
    }
});

// Highlight card function
function highlightCard(card) {
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 20px 40px rgba(139, 0, 0, 0.3)';
    
    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 300);
}

// Enhanced touch support for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.flex-card');
    const deptCards = document.querySelectorAll('.dept-card');
    
    // Enhanced touch feedback for main cards
    cards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            createRippleEffect(e.touches[0], this);
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        // Add focus for accessibility
        card.setAttribute('tabindex', '0');
    });

    // Enhanced touch feedback for department cards
    deptCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        // Add focus for accessibility
        card.setAttribute('tabindex', '0');
    });
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for scroll animations
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
    
    deptCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
});

// Enhanced smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Enhanced page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate floating elements
        const floatingElements = document.querySelectorAll('.floating-circle, .floating-square');
        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
            }, index * 200);
        });
    }, 100);
});

// Enhanced analytics tracking
function trackSectionClick(section) {
    // Example analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faculty_section_click', {
            'section_name': section,
            'page_title': document.title
        });
    }
    
    // Console log for development
    console.log(`Faculty section clicked: ${section}`);
    
    // Add visual feedback
    const cards = document.querySelectorAll('.flex-card');
    cards.forEach(card => {
        if (card.onclick.toString().includes(section)) {
            card.style.animation = 'successGlow 2s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 2000);
        }
    });
}

// Enhanced faculty-specific functions
function openApplicationForm() {
    showEnhancedNotification('Application Form', 'Redirecting to the faculty application portal. Please ensure you have all required documents ready.', 'file-alt');
    // window.location.href = '/faculty/apply';
}

function viewCurrentOpenings() {
    showEnhancedNotification('Current Openings', 'Loading current faculty positions. You can filter by department, position level, and specialization.', 'search');
    // window.location.href = '/faculty/openings';
}

function contactHR() {
    showEnhancedNotification('Contact HR', 'For any queries regarding faculty recruitment, please contact our HR department at faculty@thapar.edu or call +91-18002024100.', 'phone');
}

// Add dynamic particle movement
function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const delay = index * 0.5;
        particle.style.animationDelay = `${delay}s`;
    });
}

// Initialize particle animation
document.addEventListener('DOMContentLoaded', animateParticles);

// Export enhanced functions for potential external use
window.navigateToSection = navigateToSection;
window.trackSectionClick = trackSectionClick;
window.openApplicationForm = openApplicationForm;
window.viewCurrentOpenings = viewCurrentOpenings;
window.contactHR = contactHR;
window.createRippleEffect = createRippleEffect;
window.showEnhancedNotification = showEnhancedNotification;
window.showPrograms = showPrograms;
window.backToCards = backToCards;
window.navigateToAIPrograms = navigateToAIPrograms;
window.goBack = goBack;
window.navigateToMLFaculty = navigateToMLFaculty;
window.goBackToAI = goBackToAI;
window.goBackToMain = goBackToMain;
