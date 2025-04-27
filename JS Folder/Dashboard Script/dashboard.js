document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.doc-bttn');

    const iconSwapMap = {
        dashboardBttn: {
            default: '../img/dashboard_icon.png',
            active: '../img/dashboard_icon_white.png'
        },
        documentBttn: {
            default: '../img/document_icon.png',
            active: '../img/document_icon_white.png'
        },
        historyBttn: {
            default: '../img/reqhistory_icon.png',
            active: '../img/reqhistory_icon_white.png'
        },
        profileBttn: {
            default: '../img/userprofile_icon.png',
            active: '../img/userprofile_icon_white.png'
        }
    };

    function showSection(sectionId) {
        const sections = document.querySelectorAll('.containers');
        sections.forEach(section => section.style.display = 'none');
        const activeSection = document.getElementById(sectionId);
        if (activeSection) activeSection.style.display = 'block';
    }

    function resetIcons() {
        buttons.forEach(button => {
            const img = button.querySelector('img');
            const btnId = button.id;
            if (iconSwapMap[btnId]) {
                img.src = iconSwapMap[btnId].default;
            }
            button.classList.remove('active');
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const img = this.querySelector('img');
            const btnId = this.id;

            resetIcons();

            if (iconSwapMap[btnId]) {
                img.src = iconSwapMap[btnId].active;
            }

            this.classList.add('active');
        });
    });

    document.getElementById('dashboardBttn')?.addEventListener('click', () => showSection('dashboardSection'));
    document.getElementById('documentBttn')?.addEventListener('click', () => showSection('documentSection'));
    document.getElementById('historyBttn')?.addEventListener('click', () => showSection('historySection'));
    document.getElementById('requestBttn')?.addEventListener('click', () => showSection('requestFormSection'));
    document.getElementById('profileBttn')?.addEventListener('click', () => showSection('profileSection'));

    // Default view
    document.getElementById('dashboardBttn')?.click();
});

function switchTab(tabName) {
    document.getElementById("personalTab").classList.remove("active");
    document.getElementById("educationalTab").classList.remove("active");
    document.getElementById(tabName + "Tab").classList.add("active");

    document.getElementById("personalForm").classList.add("formApp-hidden");
    document.getElementById("educationalForm").classList.add("formApp-hidden");
    document.getElementById(tabName + "Form").classList.remove("formApp-hidden");
}

function openModal() {
    document.getElementById("confirmationModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

function confirmSubmit() {
    closeModal();
    alert("Form submitted successfully!");
}

function goBack() {
    document.getElementById('requestFormSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
}