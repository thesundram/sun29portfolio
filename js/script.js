
/* ============================== typing animation ============================ */
var typed = new Typed(".typing", {
    strings: ["", "Software Engineer", "Software Developer", "Web Developer", "App Developer", "UI / UX Designer"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
})
// /* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    //console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    // asideSectionTogglerBtn();
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
})


// Contact form controls
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        emailjs.init("pPv-Ss708vV4gV4Mx");
        const contactForm = document.getElementById('contact-form');
        // Add an event listener to the form submit button
        if (contactForm) {
            contactForm.addEventListener('submit', function (event) {
                event.preventDefault();
                let isValid = true;

                // Check if each field is valid and display specific messages
                const nameField = document.getElementById('name');
                const emailField = document.getElementById('email');
                const subjectField = document.getElementById('subject');
                const messageField = document.getElementById('message');

                // Validate Name
                if (!nameField.value.trim()) {
                    Notiflix.Notify.failure('Please enter your name');
                    isValid = false; // Stop further validation
                    return; // Exit early after the first invalid field
                }

                // Validate Email
                if (!emailField.value.trim()) {
                    Notiflix.Notify.failure('Please enter your email');
                    isValid = false;
                    return; // Exit early after the first invalid field
                } else if (!/\S+@\S+\.\S+/.test(emailField.value.trim())) {
                    Notiflix.Notify.failure('Please enter a valid email address');
                    isValid = false;
                    return; // Exit early after the first invalid field
                }

                // Validate Subject
                if (!subjectField.value.trim()) {
                    Notiflix.Notify.failure('Please enter a subject');
                    isValid = false;
                    return; // Exit early after the first invalid field
                }

                // Validate Message
                if (!messageField.value.trim()) {
                    Notiflix.Notify.failure('Please enter your message');
                    isValid = false;
                    return; // Exit early after the first invalid field
                }

                // If any field is invalid, prevent sending the form
                if (!isValid) {
                    return; // Prevent form submission
                }

                // Send the email only if the form is valid
                emailjs.sendForm('service_ui9ljfb', 'template_8y1c4eb', this)
                    .then(function () {
                        Notiflix.Notify.success('Message sent successfully!');
                        contactForm.reset();
                    }, function (error) {
                        Notiflix.Notify.failure('Failed to send message. Please try again later.');
                        console.log(error);
                    });
            });
        } else {
            console.error('Contact form not found!');
        }
    })();
});
