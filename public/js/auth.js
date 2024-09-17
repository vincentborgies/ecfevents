async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            // Supposons que le rôle est inclus dans le token décodé
            const role = parseJwt(data.token).data.role;
            localStorage.setItem('userRole', role === 1 ? 'admin' : 'user');
            updateNavigation();
            if (role === 1) {
                loadAdminEventsPage();
            } else {
                loadUserEventsPage();
            }
        } else {
            displayLoginError(data.erreur || 'Erreur de connexion');
        }
    } catch (error) {
        console.log('Erreur:', error);
        console.error('Erreur:', error);
        displayLoginError('Une erreur est survenue lors de la connexion');
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

function displayLoginError(message) {
    const errorDiv = document.getElementById('login-error');
    if (!errorDiv) {
        const loginForm = document.getElementById('login-form');
        const newErrorDiv = document.createElement('div');
        newErrorDiv.id = 'login-error';
        loginForm.appendChild(newErrorDiv);
    }
    document.getElementById('login-error').innerHTML = `<p style="color: red;">${message}</p>`;
}