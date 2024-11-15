var myModal = document.getElementById('staticBackdrop');
var myInput = document.getElementById('name-room');
myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus();
});


