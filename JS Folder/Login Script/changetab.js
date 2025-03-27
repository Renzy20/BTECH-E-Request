function showtab(tab) {
    // Remove 'active' class from all tabs
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to clicked tab
    document.querySelector(`[onclick="showtab('${tab}')"]`).classList.add('active');

    // Hide all forms
    document.querySelectorAll('.form').forEach(form => {
        form.classList.remove('active');
    });

    // Show the selected form
    document.getElementById(`${tab}-form`).classList.add('active');
}
