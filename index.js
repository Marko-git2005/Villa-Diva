const slidesContainer = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");
let slideIndex = 0;
let autoSlideInterval;
let slides = [];

async function loadMedia() {
    try {
        console.log("Attempting to load media...");
        if ('showOpenFilePicker' in window) {
            console.log("Using File System Access API...");
            const dirHandle = await window.showDirectoryPicker();
            for await (const entry of dirHandle.values()) {
                if (entry.kind === 'file') {
                    const file = await entry.getFile();
                    const url = URL.createObjectURL(file);
                    if (file.type.startsWith('image/')) {
                        slides.push({ type: 'image', src: url, alt: 'Villa Diva Image' });
                    } else if (file.type.startsWith('video/')) {
                        slides.push({ type: 'video', src: url, alt: 'Villa Diva Video' });
                    }
                }
            }
            console.log("Loaded slides via API:", slides.length);
        } else {
            console.log("Falling back to manual list...");
            const mediaFiles = [
                '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '7.jpg', '8.jpg', '9.jpg',
                '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg',
                '17.jpg', '18.jpg', '19.jpg', '20.jpg', '22.jpg', '23.jpg', '24.jpg',
                '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg',
                'intro.mp4'
            ];
            slides = mediaFiles.map(file => {
                const type = file.endsWith('.mp4') ? 'video' : 'image';
                return { type, src: `images/${file}`, alt: type === 'image' ? 'Villa Diva Image' : 'Villa Diva Video' };
            });
            console.log("Loaded slides via fallback:", slides.length);
        }

        if (slides.length === 0) {
            console.warn("No slides loaded, using fallback image.");
            const img = document.createElement('img');
            img.classList.add('slide');
            img.src = 'images/1.jpg';
            img.alt = 'Villa Diva Image';
            slidesContainer.appendChild(img);
            slides = [{ type: 'image', src: 'images/1.jpg', alt: 'Villa Diva Image' }];
        } else {
            slides.forEach(mediaItem => {
                const element = mediaItem.type === 'image' 
                    ? document.createElement('img') 
                    : document.createElement('video');
                element.classList.add('slide');
                element.src = mediaItem.src;
                element.alt = mediaItem.alt;
                if (mediaItem.type === 'video') {
                    element.muted = true;
                    element.loop = true;
                }
                slidesContainer.appendChild(element);
            });
        }
        createDots();
        showSlide();
    } catch (error) {
        console.error("Error loading media:", error);
        const img = document.createElement('img');
        img.classList.add('slide');
        img.src = 'images/1.jpg';
        img.alt = 'Villa Diva Image';
        slidesContainer.appendChild(img);
        slides = [{ type: 'image', src: 'images/1.jpg', alt: 'Villa Diva Image' }];
        createDots();
        showSlide();
    }
}

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            slideIndex = index;
            showSlide();
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === slideIndex);
    });
}

function showSlide() {
    const slideElements = document.querySelectorAll(".slide");
    console.log("Showing slide:", slideIndex, "Total slides:", slideElements.length);
    if (slideIndex >= slideElements.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slideElements.length - 1;
    }
    slideElements.forEach(slide => {
        slide.style.opacity = "0";
        slide.style.display = "none";
    });
    if (slideElements.length > 0) {
        slideElements[slideIndex].style.display = "block";
        if (slideElements[slideIndex].tagName === 'VIDEO') {
            slideElements[slideIndex].play();
        }
        setTimeout(() => {
            slideElements[slideIndex].style.opacity = "1";
        }, 10);
        updateDots();
    } else {
        console.warn("No slide elements found.");
    }
}

function goNext() {
    slideIndex++;
    showSlide();
    resetAutoSlide();
}

function goPrevious() {
    slideIndex--;
    showSlide();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(goNext, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize
loadMedia();
startAutoSlide();