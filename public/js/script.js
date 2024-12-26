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

document.querySelector(".logout").addEventListener("click", (event) => {
    const confirmBox = confirm("Bạn có chắc muốn đăng xuất?");

    if (!confirmBox) {
        event.preventDefault();
    }
});

