document.querySelector(".login-btn").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission

    const gsuit = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!gsuit || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gsuit, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = "../HTML Folder/studentdashboard.html"; // Redirect to dashboard
        } else {
            alert(result.error);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});
