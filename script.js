document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Scroll-to-top button functionality
    const scrollToTopButton = document.getElementById("scrollToTop");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });
    
    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Simple form validation
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }
        alert("Form submitted successfully!");
        this.reset();
    });

    // Image slider (carousel) functionality
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }
    
    document.querySelector(".prev").addEventListener("click", function () {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    });
    
    document.querySelector(".next").addEventListener("click", function () {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    });
    
    showSlide(currentIndex);
});

// Dark Mode Toggle
const darkModeButton = document.getElementById('dark-mode-toggle');

// Check if dark mode is already enabled in localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

darkModeButton.addEventListener('click', function() {
    // Toggle dark mode class
    document.body.classList.toggle('dark-mode');

    // Store the dark mode preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.removeItem('dark-mode');
    }
});

// Get the carousel container, slides, and buttons
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel .slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Retrieve the last active slide index from localStorage (if it exists)
let activeSlideIndex = localStorage.getItem('activeSlideIndex');
if (activeSlideIndex === null) {
    activeSlideIndex = 0; // Default to the first slide if no value is found in localStorage
} else {
    activeSlideIndex = parseInt(activeSlideIndex, 10);
}

// Function to update the active slide
function updateActiveSlide(index) {
    // Remove 'active' class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Add the 'active' class to the selected slide
    slides[index].classList.add('active');
}

// Set the initial active slide based on localStorage
updateActiveSlide(activeSlideIndex);

// Add event listener for the "next" button
nextButton.addEventListener('click', () => {
    activeSlideIndex++;
    if (activeSlideIndex >= slides.length) {
        activeSlideIndex = 0; // Wrap around to the first slide
    }

    updateActiveSlide(activeSlideIndex);
    localStorage.setItem('activeSlideIndex', activeSlideIndex); // Save the new index to localStorage
});

// Add event listener for the "prev" button
prevButton.addEventListener('click', () => {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
        activeSlideIndex = slides.length - 1; // Wrap around to the last slide
    }

    updateActiveSlide(activeSlideIndex);
    localStorage.setItem('activeSlideIndex', activeSlideIndex); // Save the new index to localStorage
});



// Listen for form submission and save all submissions
document.getElementById("contact-form").addEventListener("submit", function (e) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Get existing submissions or initialize as empty array
    let submissions = JSON.parse(localStorage.getItem("contactFormSubmissions")) || [];
    submissions.push({ name, email, message, date: new Date().toISOString() });

    localStorage.setItem("contactFormSubmissions", JSON.stringify(submissions));
});

// Example: Function to get all submissions
function getAllContactFormSubmissions() {
    return JSON.parse(localStorage.getItem("contactFormSubmissions")) || [];
}