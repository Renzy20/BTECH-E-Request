document.querySelector(".login-bttn").addEventListener("click", async function (event) {
    event.preventDefault();

    const gsuit = document.querySelector("#emaill").value.trim();
    const password = document.querySelector("#passwordd").value.trim();

    if (!gsuit || !password) {
        alert("Please fill up all required fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gsuit, password }) // Removed loginCode
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = "dashboard.html";
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});
