let slideIndex = 1;

// Check if slideshow elements exist before initializing
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

// Only initialize if slides exist
if (slides.length > 0) {
    showSlides(slideIndex);
}

function plusSlides(n) {
    if (slides.length > 0) {
        showSlides((slideIndex += n));
    }
}

function currentSlide(n) {
    if (slides.length > 0) {
        showSlides((slideIndex = n));
    }
}

function showSlides(n) {
    // Check if elements exist before proceeding
    if (slides.length === 0) return;

    let i;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Only try to access dots if they exist
    if (dots.length > 0) {
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[slideIndex - 1].className += " active";
    }
    
    slides[slideIndex - 1].style.display = "block";
}

// Only set interval if slides exist
if (slides.length > 0) {
    setInterval(() => {
        plusSlides(1);
    }, 2000);
}