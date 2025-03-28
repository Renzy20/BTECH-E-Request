document.querySelector(".register-btn").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get input fields using IDs (now properly set in HTML)
    const fullname = document.querySelector("#fullname");
    const gsuit = document.querySelector("#gsuit");
    const program = document.querySelector("#program");
    const studentnum = document.querySelector("#studentnum");
    const address = document.querySelector("#address");
    const birthMonth = document.querySelector("#birthMonth");
    const birthDay = document.querySelector("#birthDay");
    const birthYear = document.querySelector("#birthYear");
    const academicyear = document.querySelector("#academicyear");
    const yearlevel = document.querySelector("#yearlevel");
    const phone = document.querySelector("#phone");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");

    // Validation Checks
    if (
        !fullname.value || !gsuit.value || !program.value || !studentnum.value || !address.value ||
        !birthMonth.value || !birthDay.value || !birthYear.value || !academicyear.value ||
        !yearlevel.value || !phone.value || !password.value || !confirmPassword.value
    ) {
        alert("Please fill in all the fields before submitting.");
        return;
    }

    if (!gsuit.value.endsWith("@btech.ph.education")) {
        alert("Please enter a valid email ending with '@btech.ph.education'.");
        return;
    }

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
        const response = await fetch("http://localhost:5000/register-student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);

            // ✅ Now resetting all fields properly
            fullname.value = "";
            gsuit.value = "";
            program.value = "";
            studentnum.value = "";
            address.value = "";
            birthMonth.value = "";
            birthDay.value = "";
            birthYear.value = "";
            academicyear.value = "";
            yearlevel.value = "";
            phone.value = "";
            password.value = "";
            confirmPassword.value = "";

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
