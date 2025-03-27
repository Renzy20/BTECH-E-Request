document.addEventListener("DOMContentLoaded", function () {
    // Get buttons and forms
    const studentButton = document.querySelector(".person-section button:nth-child(1)");
    const alumniButton = document.querySelector(".person-section button:nth-child(2)");
    const staffButton = document.querySelector(".person-section button:nth-child(3)");

    const studentForm = document.querySelectorAll(".studentreg-form")[0];
    const alumniForm = document.querySelectorAll(".studentreg-form")[1];
    const staffForm = document.querySelectorAll(".studentreg-form")[2];
    const staffForms = document.querySelectorAll(".studentreg-form")[3];

    // Function to show the selected form and hide the other
    function showForm(formToShow, formToHide) {
        formToShow.style.display = "block";
        formToHide.style.display = "none";
    }

    // Event Listeners
    studentButton.addEventListener("click", function () {
        showForm(studentForm, alumniForm);
    });

    studentButton.addEventListener("click", function () {
        showForm(studentForm, staffForm);
    });

    studentButton.addEventListener("click", function () {
        showForm(studentForm, staffForms);
    });

    alumniButton.addEventListener("click", function () {
        showForm(alumniForm, studentForm);
    });

    alumniButton.addEventListener("click", function () {
        showForm(alumniForm, staffForm);
    });

    alumniButton.addEventListener("click", function () {
        showForm(alumniForm, staffForms);
    });

    staffButton.addEventListener("click", function () {
        showForm(staffForm, alumniForm, studentForm)
    });

    staffButton.addEventListener("click", function () {
        showForm(staffForm, studentForm)
    });

    staffButton.addEventListener("click", function () {
        showForm(staffForm, staffForms)
    });
});