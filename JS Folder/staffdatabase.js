// STAFF REGISTRATION FORM
document.querySelector(".register-staff-btn").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get all input fields
    const fullname = document.getElementById("fullname");
    const gsuit = document.getElementById("gsuit");
    const work = document.getElementById("work");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmpass");

    // Check if any required field is empty
    if (!fullname.value || !gsuit.value || !work.value || !phone.value || !password.value || !confirmPassword.value) {
        alert("Please fill in all the fields before submitting.");
        return;
    }

    // Check if email ends with @btech.ph.education
    if (!gsuit.value.endsWith("@btech.ph.education")) {
        alert("Please enter a valid email ending with '@btech.ph.education'.");
        return;
    }

    // Validate phone number (PH format: 11 digits starting with 09)
    if (!/^09\d{9}$/.test(phone.value)) {
        alert("Invalid phone number format! It should start with '09' and have 11 digits.");
        return;
    }

    // Check if passwords match
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Data to be sent to the server
    const data = {
        fullname: fullname.value,
        gsuit: gsuit.value,
        work: work.value,
        phone: phone.value,
        password: password.value
    };

    try {
        const response = await fetch("http://localhost:5000/register-staff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);

            // Reset all input fields after successful registration
            fullname.value = "";
            gsuit.value = "";
            work.value = "";
            phone.value = "";
            password.value = "";
            confirmPassword.value = "";

            // Redirect to login page
            window.location.href = "C:/Users/Administrator/OneDrive/Documents/BTECH-E-Request/HTML Folder/login.html";
        } else {
            alert(result.error || "Registration failed.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});