// document.addEventListener("DOMContentLoaded", () => {
//     const editModal = document.querySelector("#modalEdit");
//     editModal.addEventListener("show.bs.modal", (event) => {
//         const button = event.relatedTarget; // Nút được nhấn
//         const roomId = button.getAttribute("data-bill-id");
//         const area = button.getAttribute("data-date");
//         const people = button.getAttribute("data-money");
//         const status = button.getAttribute("data-status");
//         const price = button.getAttribute("data-cccd");

//         editModal.querySelector("#name-room-edit").value = roomId;
//         editModal.querySelector("#area-edit").value = area;
//         editModal.querySelector("#countofp-edit").value = people;
//         editModal.querySelector("#status-edit").value = status;
//         editModal.querySelector("#price-edit").value = price;
//     });
// });
const buttonEdit = document.querySelectorAll("[button-edit]");
if (buttonEdit.length > 0) {
    const formEditItem = document.querySelector('#form-edit-item');
    const path = formEditItem.getAttribute("data-path");
    buttonEdit.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn thay đổi trạng thái hóa đơn này?");
            if (isConfirm) {
                const id = button.getAttribute("data-bill-id");
                const action = `${path}/${id}?_method=PUT`;
                formEditItem.action = action;
                formEditItem.submit();
            }
        });
    });
}

const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector('#form-delete-item');
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa hóa đơn này?");
            if (isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const AddDetailModal = document.querySelector("#modalDetail");

    AddDetailModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget; // Nút được nhấn
        const Id = button.getAttribute("data-id");


        AddDetailModal.querySelector("#mahoadon").value = Id;

    });
});

function toggleInputs(checkbox) {
    const inputs = checkbox.closest('.form-check').querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.disabled = !checkbox.checked;
    });
}