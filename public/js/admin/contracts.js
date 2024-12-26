document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.querySelector("#modalEdit");

    editModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget; // Nút được nhấn
        const contractId = button.getAttribute("data-contract-id");
        const dateend = button.getAttribute("data-date-end");
        const money = button.getAttribute("data-money");
        const cccd = button.getAttribute("data-cccd");
        const roomId = button.getAttribute("data-room-id");

        editModal.querySelector("#mahopdong").value = contractId;
        editModal.querySelector("#ngayhethan").value = dateend;
        editModal.querySelector("#sotien_coc").value = money;
        editModal.querySelector("#cccd").value = cccd;
        editModal.querySelector("#maphong").value = roomId;
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


