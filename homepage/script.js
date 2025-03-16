document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".fade-in");
    const aboutSection = document.querySelector(".about");

    // Smooth Scrolling and Active Tab Highlight
    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Highlight Active Tab
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Fade-in Effect on Scroll
    function revealSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                section.classList.add("visible");
            }
        });

        // Show About Us Section when in view
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            aboutSection.classList.add("visible");
        }
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Trigger at load in case already in view
});
