document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.querySelector("#modalEdit");

    editModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget; // Nút được nhấn
        const cccd = button.getAttribute("data-cccd");
        const name = button.getAttribute("data-name");
        const phone = button.getAttribute("data-phoneNumber");
        const gender = button.getAttribute("data-gender");
        const dob = button.getAttribute("data-ngaysinh");
        const hometown = button.getAttribute("data-quequan");
        const roomid = button.getAttribute("data-room-id");

        editModal.querySelector("#cccd").value = cccd;
        editModal.querySelector("#name-customer").value = name;
        editModal.querySelector("#phonenum").value = phone;
        if (gender) {
            const genderRadio = editModal.querySelector(`input[name="gioitinh"][value="${gender}"]`);
            if (genderRadio) {
                genderRadio.checked = true;
            }
        }
        editModal.querySelector("#birthdate").value = dob;
        editModal.querySelector("#hometown").value = hometown;
        editModal.querySelector("#name-room").value = roomid;
    });
});

const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector('#form-delete-item');
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa khách này?");
            if (isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}

let FocusInput = (Modal, Input) => {
    let myModal = document.getElementById(Modal);
    let myInput = document.getElementById(Input);
    myModal.addEventListener('shown.bs.modal', function () {
        myInput.focus();
    });
}


FocusInput('modalCreate', 'cccd')
// FocusInput('modalEdit', 'area-edit')
