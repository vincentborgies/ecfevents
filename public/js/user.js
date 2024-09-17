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

async function loadUserEventsPage() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>Tous les événements</h2><div id="error-message"></div>';

    try {
        const response = await fetch('http://localhost:3000/events', {
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        const data = await response.json();

        if (response.ok && data.events) {
            const events = data.events;
            if (events.length > 0) {
                const eventsList = `
                    <div class="event-list">
                        ${events.map(event => `
                            <div class="event-card" data-id="${event.id}">
                                <h3>${event.title}</h3>
                                <p>${event.description}</p>
                                <p>Date: ${formatDateToFrench(event.date)}</p>
                                <p>Lieu: ${event.location}</p>
                                <p>Participants: ${event.current_participants}/${event.max_participants}</p>
                                ${event.is_full == 1
                                    ? '<div class="event-full">Complet</div>'
                                    : event.is_registered == 1
                                        ? `
                                            <div class="registered">Inscrit</div>
                                            <button class="unregister-btn" onclick="unregisterFromEvent(${event.id})">Se désinscrire</button>
                                          `
                                        : `<button onclick="registerForEvent(${event.id})">S'inscrire</button>`
                                }
                            </div>
                        `).join('')}
                    </div>
                `;
                mainContent.innerHTML += eventsList;
            } else {
                mainContent.innerHTML += '<p>Aucun événement disponible.</p>';
            }
        } else {
            mainContent.innerHTML += '<p>Erreur lors du chargement des événements.</p>';
        }
    } catch (error) {
        console.error('Erreur:', error);
        displayError('Erreur lors du chargement des événements.');
    }
}

async function unregisterFromEvent(eventId) {
    showConfirmModal("Êtes-vous sûr de vouloir vous désinscrire de cet événement ?", async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/events/${eventId}/unregister`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Mettre à jour l'interface utilisateur immédiatement
                const eventCard = document.querySelector(`.event-card[data-id="${eventId}"]`);
                if (eventCard) {
                    const registeredDiv = eventCard.querySelector('.registered');
                    const unregisterButton = eventCard.querySelector('.unregister-btn');
                    if (registeredDiv && unregisterButton) {
                        registeredDiv.remove();
                        unregisterButton.outerHTML = '<button onclick="registerForEvent(' + eventId + ')">S\'inscrire</button>';
                    }
                }
            } else {
                displayError(data.erreur || 'Erreur lors de la désinscription à l\'événement');
            }
        } catch (error) {
            console.error('Erreur:', error);
            displayError('Une erreur est survenue lors de la désinscription à l\'événement');
        }
    });
}

async function registerForEvent(eventId) {
    showConfirmModal("Voulez-vous vous inscrire à cet événement ?", async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/events/${eventId}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Mettre à jour l'interface utilisateur immédiatement
                const eventCard = document.querySelector(`.event-card[data-id="${eventId}"]`);
                if (eventCard) {
                    const button = eventCard.querySelector('button');
                    if (button) {
                        button.outerHTML = `
                            <div class="registered">Inscrit</div>
                            <button class="unregister-btn" onclick="unregisterFromEvent(${eventId})">Se désinscrire</button>
                        `;
                    }
                }
            } else {
                displayError(data.erreur || 'Erreur lors de l\'inscription à l\'événement');
            }
        } catch (error) {
            console.error('Erreur:', error);
            displayError('Une erreur est survenue lors de l\'inscription à l\'événement');
        }
    });
}

async function loadUserMyEventsPage() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>Mes événements</h2><div id="error-message"></div>';

    try {
        const response = await fetch('http://localhost:3000/myEvents', {
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        const data = await response.json();

        if (response.ok) {
            if (data.events.length > 0) {
                const eventsList = `
                    <div class="event-list">
                        ${data.events.map(event => `
                            <div class="event-card" data-id="${event.id}">
                                <h3>${event.title}</h3>
                                <p>${event.description}</p>
                                <p>Date: ${formatDateToFrench(event.date)}</p>
                                <p>Lieu: ${event.location}</p>
                                <div class="registered">Inscrit</div>
                                <button class="unregister-btn" onclick="unregisterFromEvent(${event.id})">Se désinscrire</button>
                            </div>
                        `).join('')}
                    </div>
                `;
                mainContent.innerHTML += eventsList;
            } else {
                mainContent.innerHTML += '<p>Vous n\'êtes inscrit à aucun événement.</p>';
            }
        } else {
            mainContent.innerHTML += '<p>Erreur lors du chargement de vos événements.</p>';
        }
    } catch (error) {
        console.error('Erreur:', error);
        displayError('Erreur lors du chargement de vos événements.');
    }
}

function displayError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.innerHTML = `<p style="color: red;">${message}</p>`;
    }
}

function showConfirmModal(message, onConfirm) {
    console.log("showConfirmModal called with message:", message);
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

function displayMessage(message, color) {
    const messageDiv = document.getElementById('error-message');
    if (messageDiv) {
        messageDiv.innerHTML = `<p style="color: ${color};">${message}</p>`;
    }
}