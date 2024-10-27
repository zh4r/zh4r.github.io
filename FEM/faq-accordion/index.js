let accordion = document.querySelectorAll(".accordionBtn");

accordion.forEach((btn, index) => {
    btn.addEventListener("click", function() {
        let answer = this.nextElementSibling;
        let img = this.children[1];

        if (answer.classList.contains("opened")) {
            answer.classList.remove("opened");
            img.src = "./assets/images/icon-plus.svg";
        } else {
            answer.classList.add("opened");
            img.src = "./assets/images/icon-minus.svg";
        }
    });

    if (index === 0) {
        btn.nextElementSibling.classList.add("opened");
        btn.children[1].src = "./assets/images/icon-minus.svg";
    }
});