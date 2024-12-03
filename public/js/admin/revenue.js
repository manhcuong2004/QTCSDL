document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.year-label').forEach((label) => {
        label.addEventListener('click', () => {
            // Xóa class 'active' khỏi tất cả các phần tử
            document.querySelectorAll('.year-label.active').forEach((activeLabel) => {
                activeLabel.classList.remove('active');
            });

            // Gán class 'active' cho phần tử được click
            label.classList.add('active');
        });
    });
});