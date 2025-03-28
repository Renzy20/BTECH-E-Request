// STAFF REGISTRATION FORM
document.querySelector(".register-staff-btn").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get all input fields
    const fullnamee = document.querySelector("#fullnamee");
    const gsuitt = document.querySelector("#gsuitt");
    const workk = document.querySelector("#workk");
    const phonee = document.querySelector("#phonee");
    const passwordd = document.querySelector("#passwordd");
    const confirmPasswordd = document.querySelector("#confirmpasss");

    // Check if any required field is empty
    if (!fullnamee.value || !gsuitt.value || !workk.value || !phonee.value || !passwordd.value || !confirmPasswordd.value) {
        alert("Please fill in all the fields before submitting.");
        return;
    }

    // Check if email ends with @btech.ph.education
    if (!gsuitt.value.endsWith("@btech.ph.education")) {
        alert("Please enter a valid email ending with '@btech.ph.education'.");
        return;
    }

    // Validate phone number (PH format: 11 digits starting with 09)
    if (!/^09\d{9}$/.test(phonee.value)) {
        alert("Invalid phone number format! It should start with '09' and have 11 digits.");
        return;
    }

    // Check if passwords match
    if (passwordd.value !== confirmPasswordd.value) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Data to be sent to the server
    const data = {
        fullname: fullnamee.value,
        gsuit: gsuitt.value,
        work: workk.value,
        phone: phonee.value,
        password: passwordd.value
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
            fullnamee.value = "";
            gsuitt.value = "";
            workk.value = "";
            phonee.value = "";
            passwordd.value = "";
            confirmPasswordd.value = "";

            // Redirect to login page
            window.location.href = "../HTML Folder/login.html";
        } else {
            alert(result.error || "Registration failed.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});
