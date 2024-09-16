document.addEventListener('DOMContentLoaded', () => {
    // Initialisation
    updateNavigation();
    loadLoginPage();
});

function updateNavigation() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const nav = document.getElementById('main-nav');

    if (token) {
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
    updateNavigation();
    loadLoginPage();
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
    `;
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

async function getEvents() {
    try {
        const response = await fetch('http://localhost:8080/events', {
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