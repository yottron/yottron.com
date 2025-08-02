document.addEventListener("DOMContentLoaded", function() {
    const urls = [
        "../commons/header.html",
        "../commons/footer.html",
        "../commons/getintouch.html",
        "../commons/expertise.html"
    ];

    Promise.all(urls.map(url => fetch(url).then(response => response.text())))
        .then(htmls => {
            const selectors = [
                ".nav-container",
                ".footer-section",
                ".common-contactus",
                ".expertise"
            ];
            selectors.forEach((selector, index) => {
                const container = document.querySelector(selector);
                if (container) {
                    container.innerHTML = htmls[index];
                } 
            });
            // Initialize mobile menu after content is loaded
            initializeMobileMenu();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});

function initializeMobileMenu() {
    const mobileBtn = document.getElementById("mobile_btn");
    const mainMenu = document.getElementById("main_menu");
    const menuItems = document.querySelectorAll(".main_menu ul li");  
    if (!mobileBtn || !mainMenu || menuItems.length === 0) {
        console.error("One or more elements not found.");
        return;
    }
  
    mobileBtn.addEventListener("click", function () {
        if (mainMenu.style.display === "block") {
            mainMenu.style.display = "none";
        } else {
            mainMenu.style.display = "block";
        }
  
        const icon = this.querySelector("i");
        if (icon.classList.contains("fa-bars")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
  
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("click", function () {
            if (window.innerWidth < 768) {
                const subMenu = this.querySelector(".sub_menu");
                if (subMenu.style.display === "block") {
                    subMenu.style.display = "none";
                } else {
                    subMenu.style.display = "block";
                }
  
                this.classList.toggle("active");
            }
        });
    });
}
