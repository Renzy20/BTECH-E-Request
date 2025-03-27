document.addEventListener("DOMContentLoaded", function () {
    // Get buttons and forms
    const studentButton = document.querySelector(".person-section button:nth-child(1)");
    const alumniButton = document.querySelector(".person-section button:nth-child(2)");

    const studentForm = document.querySelectorAll(".studentreg-form")[0];
    const alumniForm = document.querySelectorAll(".studentreg-form")[1];

    // Function to show the selected form and hide the other
    function showForm(formToShow, formToHide) {
        formToShow.style.display = "block";
        formToHide.style.display = "none";
    }

    // Event Listeners
    studentButton.addEventListener("click", function () {
        showForm(studentForm, alumniForm);
    });

    alumniButton.addEventListener("click", function () {
        showForm(alumniForm, studentForm);
    });
});