// Parallax Particle System
const canvas = document.getElementById('parallax-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Parallax effect based on mouse
        if (mouse.x && mouse.y) {
            let dx = mouse.x - canvas.width / 2;
            let dy = mouse.y - canvas.height / 2;
            this.x += dx * 0.005;
            this.y += dy * 0.005;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 0, 122, 0.5)';
        ctx.fillStyle = `rgba(255, 0, 122, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
    }
}

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);
initParticles();
animateParticles();

// Scarcity and Social Proof Engine
const names = ['Carlos', 'Lucía', 'Andrés', 'Sofía', 'Mateo', 'Valentina', 'Diego', 'Camila', 'Javier', 'Elena'];
const actions = ['acaba de adquirir el Mega Pack', 'está personalizando su canción', 'acaba de comprar una canción individual'];
let currentStock = 18;

function showNotification() {
    const notif = document.getElementById('notification');
    const notifText = document.getElementById('notif-text');
    const stockEl = document.getElementById('stock-count');

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    notifText.innerText = `${randomName} ${randomAction}`;
    notif.classList.add('show');

    // If they bought Mega Pack, decrease stock
    if (randomAction.includes('Mega Pack') && currentStock > 3) {
        currentStock--;
        stockEl.innerText = currentStock;
        stockEl.style.color = '#ff007a';
        setTimeout(() => stockEl.style.color = '', 1000);
    }

    setTimeout(() => {
        notif.classList.remove('show');
    }, 5000);
}

// Start notifications every 30-50 seconds
function startSocialProof() {
    setTimeout(() => {
        showNotification();
        startSocialProof();
    }, Math.random() * (50000 - 30000) + 30000);
}

// Countdown Timer (Previous function updated for better reliability)
function updateCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    let h = parseInt(hoursEl.innerText);
    let m = parseInt(minutesEl.innerText);
    let s = parseInt(secondsEl.innerText);

    setInterval(() => {
        if (s > 0) {
            s--;
        } else {
            if (m > 0) {
                m--;
                s = 59;
            } else {
                if (h > 0) {
                    h--;
                    m = 59;
                    s = 59;
                }
            }
        }

        hoursEl.innerText = h.toString().padStart(2, '0');
        minutesEl.innerText = m.toString().padStart(2, '0');
        secondsEl.innerText = s.toString().padStart(2, '0');
    }, 1000);
}

// Scarcity Counter Randomizer (to make it look like people are buying)
function simulateSales() {
    const scarcityEl = document.querySelector('.scarcity-warning strong');
    let count = 4;

    setTimeout(() => {
        if (count > 1) {
            count--;
            scarcityEl.innerText = `${count} paquetes`;
            scarcityEl.style.color = '#ff0000';
            setTimeout(() => scarcityEl.style.color = '', 500);
        }
    }, 15000); // Reduce every 15 seconds for demo
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
function revealOnScroll() {
    const cards = document.querySelectorAll('.problem-card, .pricing-card');
    const triggerBottom = window.innerHeight * 0.8;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            // Optional: reset if you want it to repeat
            // card.style.opacity = '0';
            // card.style.transform = 'translateY(50px)';
        }
    });
}

// Set initial state for animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.problem-card, .pricing-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    updateCountdown();
    startSocialProof();
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
