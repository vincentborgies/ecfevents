async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password);

    try {
        const response = await fetch('http://localhost:8080/login', {
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
            alert(data.erreur || 'Erreur de connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la connexion');
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}