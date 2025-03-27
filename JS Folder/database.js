document.querySelector(".register-btn").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get all input fields
    const fullname = document.querySelector("[placeholder='Full Name']");
    const gsuit = document.querySelector("[placeholder='studentnumber@btech.ph.education']");
    const program = document.querySelector("[placeholder='Course Name']");
    const studentnum = document.querySelector("[placeholder='12345678']");
    const address = document.querySelector("[placeholder='City, Zip Code']");
    const birthMonth = document.querySelector("[placeholder='Month']");
    const birthDay = document.querySelector("[placeholder='Day']");
    const birthYear = document.querySelector("[placeholder='Year']");
    const academicyear = document.querySelector("[placeholder='2008-2012']");
    const yearlevel = document.querySelector("[placeholder='e.g. 1st Year']");
    const phone = document.querySelector("[placeholder='09123456789']");
    const password = document.querySelector("[placeholder='Enter Password']");
    const confirmPassword = document.querySelector("[placeholder='Confirm Password']");

    // Check if any required field is empty
    if (
        !fullname.value || !gsuit.value || !program.value || !studentnum.value || !address.value ||
        !birthMonth.value || !birthDay.value || !birthYear.value || !academicyear.value ||
        !yearlevel.value || !phone.value || !password.value || !confirmPassword.value
    ) {
        alert("Please fill in all the fields before submitting.");
        return;
    }

    // Check if email ends with @btech.ph.education
    if (!gsuit.value.endsWith("@btech.ph.education")) {
        alert("Please enter a valid email ending with '@btech.ph.education'.");
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
        program: program.value,
        studentnum: studentnum.value,
        address: address.value,
        birthdate: {
            month: birthMonth.value,
            day: birthDay.value,
            year: birthYear.value
        },
        academicyear: academicyear.value,
        yearlevel: yearlevel.value,
        phone: phone.value,
        password: password.value
    };

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);

            // Reset all input fields after successful registration
            document.querySelector("#fullname").value = "";
            document.querySelector("#gsuit").value = "";
            document.querySelector("#program").value = "";
            document.querySelector("#studentnum").value = "";
            document.querySelector("#address").value = "";
            document.querySelector("#birthMonth").value = "";
            document.querySelector("#birthDay").value = "";
            document.querySelector("#birthYear").value = "";
            document.querySelector("#academicyear").value = "";
            document.querySelector("#yearlevel").value = "";
            document.querySelector("#phone").value = "";
            document.querySelector("#password").value = "";
            document.querySelector("#confirmPassword").value = "";

            // Redirect to login page
            window.location.href = "C:\Users\Administrator\OneDrive\Documents\BTECH-E-Request\HTML Folder\login.html";

        } else {
            alert(result.error || "Registration failed.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});



