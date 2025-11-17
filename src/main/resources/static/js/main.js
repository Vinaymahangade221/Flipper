const API_BASE_URL = '/api';

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadClients();
    
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletterSubmit);
});

async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        
        const container = document.getElementById('projectsContainer');
        
        if (projects.length === 0) {
            container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No projects available yet.</p></div>';
            return;
        }
        
        container.innerHTML = projects.map(project => `
            <div class="col-md-6 col-lg-4">
                <div class="card project-card">
                    ${project.imagePath ? `<img src="${project.imagePath}" class="card-img-top" alt="${project.name}">` : ''}
                    <div class="card-body">
                        <h5 class="card-title">${escapeHtml(project.name)}</h5>
                        <p class="card-text">${escapeHtml(project.description)}</p>
                        <button class="btn btn-outline-primary btn-sm" disabled>Read More</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsContainer').innerHTML = 
            '<div class="col-12 text-center"><p class="text-danger">Failed to load projects.</p></div>';
    }
}

async function loadClients() {
    try {
        const response = await fetch(`${API_BASE_URL}/clients`);
        const clients = await response.json();
        
        const container = document.getElementById('clientsContainer');
        
        if (clients.length === 0) {
            container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No client testimonials available yet.</p></div>';
            return;
        }
        
        container.innerHTML = clients.map(client => `
            <div class="col-md-6 col-lg-4">
                <div class="card client-card text-center p-4">
                    ${client.imagePath ? `<img src="${client.imagePath}" class="mb-3" alt="${client.name}">` : ''}
                    <div class="card-body">
                        <p class="card-text">${escapeHtml(client.description)}</p>
                        <h5 class="card-title mb-1">${escapeHtml(client.name)}</h5>
                        <p class="client-designation mb-0">${escapeHtml(client.designation)}</p>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading clients:', error);
        document.getElementById('clientsContainer').innerHTML = 
            '<div class="col-12 text-center"><p class="text-danger">Failed to load clients.</p></div>';
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const contactData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        city: document.getElementById('city').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        if (response.ok) {
            showMessage('contactMessage', 'Thank you! Your message has been submitted successfully.', 'success');
            e.target.reset();
        } else {
            showMessage('contactMessage', 'Failed to submit. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Error submitting contact:', error);
        showMessage('contactMessage', 'An error occurred. Please try again.', 'danger');
    }
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        
        if (response.ok) {
            showMessage('newsletterMessage', 'Successfully subscribed to newsletter!', 'success');
            e.target.reset();
        } else {
            const error = await response.json();
            showMessage('newsletterMessage', error.error || 'Failed to subscribe. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Error subscribing:', error);
        showMessage('newsletterMessage', 'An error occurred. Please try again.', 'danger');
    }
}

function showMessage(elementId, message, type) {
    const messageDiv = document.getElementById(elementId);
    messageDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
