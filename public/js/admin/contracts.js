document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.querySelector("#modalEdit");
    editModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget; // Nút được nhấn
        const roomId = button.getAttribute("data-room-id");
        const area = button.getAttribute("data-area");
        const people = button.getAttribute("data-people");
        const status = button.getAttribute("data-status");
        const price = button.getAttribute("data-price");

        editModal.querySelector("#name-room-edit").value = roomId;
        editModal.querySelector("#area-edit").value = area;
        editModal.querySelector("#countofp-edit").value = people;
        editModal.querySelector("#status-edit").value = status;
        editModal.querySelector("#price-edit").value = price;
    });
});

const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector('#form-delete-item');
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa phòng này này?");
            if (isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}


