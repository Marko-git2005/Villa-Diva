// List EVERY file you have exactly (add or remove as needed)
const imageFiles = [
    '1.png', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
    '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg',
    '18.jpg', '19.jpg', '20.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg',
    '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg'
    // Add 'intro.mp4' here if you have a video
];

const container = document.querySelector('.slides-container');
const dotsContainer = document.querySelector('.dots-container');
let currentIndex = 0;
let interval;

function createSlides() {
    imageFiles.forEach((file, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');

        const img = document.createElement('img');
        img.src = file;  // Direct from root folder
        img.alt = 'Villa Diva';

        // If image fails, don't break everything
        img.onerror = () => {
            console.log('Missing file skipped:', file);
            slide.style.display = 'none';
        };

        slide.appendChild(img);
        container.appendChild(slide);
    });

    createDots();
    startAutoPlay();
}

function createDots() {
    dotsContainer.innerHTML = '';
    imageFiles.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });
}

function updateSlider() {
    document.querySelectorAll('.slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
    });

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoPlay();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % imageFiles.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
    updateSlider();
}

function startAutoPlay() {
    interval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
    clearInterval(interval);
    startAutoPlay();
}

// Buttons
document.querySelector('.next-btn').onclick = () => {
    nextSlide();
    resetAutoPlay();
};
document.querySelector('.prev-btn').onclick = () => {
    prevSlide();
    resetAutoPlay();
};

// Start everything
createSlides();