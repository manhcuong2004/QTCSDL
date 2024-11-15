document.addEventListener("DOMContentLoaded", function () {
    const alertBox = document.querySelector(".alert[show-alert]");
    if (alertBox) {
        const displayTime = parseInt(alertBox.getAttribute("data-time"), 10);

        if (!isNaN(displayTime)) {
            setTimeout(() => {
                alertBox.classList.remove("show");
                alertBox.classList.add("hide");
            }, displayTime);
        }
    }
});
