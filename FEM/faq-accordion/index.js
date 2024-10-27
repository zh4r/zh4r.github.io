let accordion = document.querySelectorAll(".accordionBtn");

accordion.forEach((btn, index) => {
    btn.addEventListener("click", function() {
        let panel = this.nextElementSibling;
        let img = this.children[1];

        if (panel.classList.contains("opened")) {
            panel.classList.remove("opened");
            img.src = "./assets/images/icon-plus.svg";
        } else {
            panel.classList.add("opened");
            img.src = "./assets/images/icon-minus.svg";
        }
    });

    if (index === 0) {
        btn.nextElementSibling.classList.add("opened");
        btn.children[1].src = "./assets/images/icon-minus.svg";
    }
});