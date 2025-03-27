function checkSecurityCode(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const FIXED_CODE = "SECURE123"; // Set your fixed security code

    // Get user input values
    let adminCodeInput = document.getElementById("admin-code");
    let confirmCodeInput = document.getElementById("confirm-code");
    let errorMessage = document.getElementById("error-message");

    // Ensure elements exist before accessing their values
    if (!adminCodeInput || !confirmCodeInput || !errorMessage) {
        console.error("One or more elements are missing in the DOM!");
        return false;
    }

    let adminCode = adminCodeInput.value.trim();
    let confirmCode = confirmCodeInput.value.trim();

    // Check if the input matches the fixed security code
    if (adminCode === FIXED_CODE && confirmCode === FIXED_CODE) {
        errorMessage.style.display = "none"; // Hide error message

        // Clear input fields after success
        adminCodeInput.value = "";
        confirmCodeInput.value = "";

        document.getElementById("staff-form").style.display = "none"; // Hide current form
        document.getElementById("next-form").style.display = "block"; // Show next form
    } else {
        errorMessage.style.display = "block"; // Show error message
        errorMessage.textContent = "Incorrect code. Please try again.";
    }

    return false; // Prevent form from reloading
}
