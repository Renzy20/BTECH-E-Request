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

    // Default view
    document.getElementById('dashboardBttn')?.click();
});
