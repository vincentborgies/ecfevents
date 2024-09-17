document.addEventListener('DOMContentLoaded', () => {
    // Initialisation
    checkAuthAndLoadPage();
});

function checkAuthAndLoadPage() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token && role) {
        updateNavigation();
        if (role === 'admin') {
            loadAdminEventsPage();
        } else {
            loadUserEventsPage();
        }
    } else {
        // Si pas de token ou de rôle, on supprime tout et on affiche la page de connexion
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        updateNavigation();
        loadLoginPage();
    }
}

function updateNavigation() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const nav = document.getElementById('main-nav');

    if (token && role) {
        if (role === 'admin') {
            nav.innerHTML = `
                <ul>
                    <li><a href="#" id="admin-events-link">Gérer les événements</a></li>
                    <li><a href="#" id="admin-users-link">Gérer les utilisateurs</a></li>
                    <li><a href="#" id="logout-link">Déconnexion</a></li>
                </ul>
            `;
            document.getElementById('admin-events-link').addEventListener('click', loadAdminEventsPage);
            document.getElementById('admin-users-link').addEventListener('click', loadAdminUsersPage);
        } else {
            nav.innerHTML = `
                <ul>
                    <li><a href="#" id="user-events-link">Tous les événements</a></li>
                    <li><a href="#" id="user-my-events-link">Mes événements</a></li>
                    <li><a href="#" id="logout-link">Déconnexion</a></li>
                </ul>
            `;
            document.getElementById('user-events-link').addEventListener('click', loadUserEventsPage);
            document.getElementById('user-my-events-link').addEventListener('click', loadUserMyEventsPage);
        }
        document.getElementById('logout-link').addEventListener('click', logout);
    } else {
        nav.innerHTML = ''; // Pas de navigation pour la page de connexion
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    checkAuthAndLoadPage();
}

function loadLoginPage() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <h2>Connexion</h2>
        <form id="login-form">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit">Se connecter</button>
        </form>
        <div id="login-error"></div>
    `;
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

async function getEvents() {
    try {
        const response = await fetch('http://localhost:3000/events', {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });

        const data = await response.json();

        if (response.ok) {
            return data.events;
        } else {
            console.error(data.erreur || 'Erreur de récupération des événements');
            return [];
        }
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const modalMessage = document.getElementById('modalMessage');
    const confirmButton = document.getElementById('modalConfirm');
    const cancelButton = document.getElementById('modalCancel');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    confirmButton.onclick = () => {
        modal.style.display = 'none';
        onConfirm();
    };

    cancelButton.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}