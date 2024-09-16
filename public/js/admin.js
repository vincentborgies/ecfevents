async function loadAdminEventsPage() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="admin-panel">
            <div class="admin-menu">
                <h3>Menu Admin</h3>
                <ul>
                    <li><a href="#" id="add-event-link">Ajouter un événement</a></li>
                    <li><a href="#" id="list-events-link">Liste des événements</a></li>
                </ul>
            </div>
            <div class="admin-content" id="admin-content">
                <!-- Le contenu sera injecté ici -->
            </div>
        </div>
    `;
    document.getElementById('add-event-link').addEventListener('click', showAddEventForm);
    document.getElementById('list-events-link').addEventListener('click', showEventsList);
    showEventsList(); // Afficher la liste des événements par défaut
}

function showAddEventForm() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h2>Ajouter un événement</h2>
        <form id="add-event-form">
            <div class="form-group">
                <label for="title">Titre:</label>
                <input type="text" id="title" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" required></textarea>
            </div>
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="datetime-local" id="date" required>
            </div>
            <div class="form-group">
                <label for="location">Lieu:</label>
                <input type="text" id="location" required>
            </div>
            <div class="form-group">
                <label for="max_participants">Nombre maximum de participants:</label>
                <input type="number" id="max_participants" required>
            </div>
            <button type="submit">Ajouter l'événement</button>
        </form>
    `;
    document.getElementById('add-event-form').addEventListener('submit', handleAddEvent);
}

async function handleAddEvent(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const eventData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        max_participants: document.getElementById('max_participants').value
    };

    try {
        const response = await fetch('http://localhost:8080/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Événement ajouté avec succès');
            showEventsList();
        } else {
            alert(data.erreur || 'Erreur lors de l\'ajout de l\'événement');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de l\'ajout de l\'événement');
    }
}

async function showEventsList() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = '<h2>Liste des événements</h2>';

    try {
        const events = await getEvents();
        if (events.length > 0) {
            const eventsTable = `
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Date</th>
                            <th>Lieu</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${events.map(event => `
                            <tr>
                                <td>${event.title}</td>
                                <td>${formatDateToFrench(event.date)}</td>
                                <td>${event.location}</td>
                                <td>
                                    <button onclick="showEventParticipants(${event.id})">Voir les participants</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            adminContent.innerHTML += eventsTable;
        } else {
            adminContent.innerHTML += '<p>Aucun événement trouvé.</p>';
        }
    } catch (error) {
        console.error('Erreur:', error);
        adminContent.innerHTML += '<p>Erreur lors du chargement des événements.</p>';
    }
}

function formatDateToFrench(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

async function showEventParticipants(eventId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8080/events/${eventId}/participants`, {
            headers: {
                'token': token
            }
        });
        const data = await response.json();

        if (response.ok) {
            const adminContent = document.getElementById('admin-content');
            adminContent.innerHTML = `<h2>Participants à l'événement</h2>`;

            if (data.participants && data.participants.length > 0) {
                const participantsTable = `
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.participants.map(participant => `
                                <tr>
                                    <td>${participant.lastname}</td>
                                    <td>${participant.firstname}</td>
                                    <td>${participant.email}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                adminContent.innerHTML += participantsTable;
            } else {
                adminContent.innerHTML += '<p>Aucun participant inscrit à cet événement.</p>';
            }

            adminContent.innerHTML += '<button onclick="showEventsList()">Retour à la liste des événements</button>';
        } else {
            alert(data.erreur || 'Erreur lors de la récupération des participants');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la récupération des participants');
    }
}

function loadAdminUsersPage() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <h2>Gestion des utilisateurs</h2>
        <form id="add-user-form">
            <h3>Ajouter un utilisateur</h3>
            <div class="form-group">
                <label for="firstname">Prénom:</label>
                <input type="text" id="firstname" required>
            </div>
            <div class="form-group">
                <label for="lastname">Nom:</label>
                <input type="text" id="lastname" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit">Ajouter l'utilisateur</button>
        </form>
    `;
    document.getElementById('add-user-form').addEventListener('submit', handleAddUser);
}

async function handleAddUser(event) {
    event.preventDefault();
    const userData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:8080/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Utilisateur ajouté avec succès');
            // Réinitialiser le formulaire
            document.getElementById('add-user-form').reset();
        } else {
            alert(data.erreur || 'Erreur lors de l\'ajout de l\'utilisateur');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de l\'ajout de l\'utilisateur');
    }
}