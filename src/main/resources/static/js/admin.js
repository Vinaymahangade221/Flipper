const API_BASE_URL = '/api';

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const section = this.dataset.section;
            showSection(section);
        });
    });
    
    document.getElementById('projectForm').addEventListener('submit', handleProjectSubmit);
    document.getElementById('clientForm').addEventListener('submit', handleClientSubmit);
    
    loadProjects();
    loadClients();
    loadContacts();
    loadSubscriptions();
});

function showSection(sectionName) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`${sectionName}Section`).style.display = 'block';
}

async function handleProjectSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('projectName').value);
    formData.append('description', document.getElementById('projectDescription').value);
    
    const imageFile = document.getElementById('projectImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Project added successfully!');
            e.target.reset();
            loadProjects();
        } else {
            alert('Failed to add project. Please try again.');
        }
    } catch (error) {
        console.error('Error adding project:', error);
        alert('An error occurred. Please try again.');
    }
}

async function handleClientSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('clientName').value);
    formData.append('description', document.getElementById('clientDescription').value);
    formData.append('designation', document.getElementById('clientDesignation').value);
    
    const imageFile = document.getElementById('clientImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/clients`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Client added successfully!');
            e.target.reset();
            loadClients();
        } else {
            alert('Failed to add client. Please try again.');
        }
    } catch (error) {
        console.error('Error adding client:', error);
        alert('An error occurred. Please try again.');
    }
}

async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        
        const container = document.getElementById('projectsList');
        
        if (projects.length === 0) {
            container.innerHTML = '<p class="text-muted">No projects available.</p>';
            return;
        }
        
        container.innerHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${projects.map(project => `
                        <tr>
                            <td>${project.imagePath ? `<img src="${project.imagePath}" class="image-preview">` : 'No image'}</td>
                            <td>${escapeHtml(project.name)}</td>
                            <td>${escapeHtml(project.description)}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="deleteProject(${project.id})">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function loadClients() {
    try {
        const response = await fetch(`${API_BASE_URL}/clients`);
        const clients = await response.json();
        
        const container = document.getElementById('clientsList');
        
        if (clients.length === 0) {
            container.innerHTML = '<p class="text-muted">No clients available.</p>';
            return;
        }
        
        container.innerHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${clients.map(client => `
                        <tr>
                            <td>${client.imagePath ? `<img src="${client.imagePath}" class="image-preview">` : 'No image'}</td>
                            <td>${escapeHtml(client.name)}</td>
                            <td>${escapeHtml(client.designation)}</td>
                            <td>${escapeHtml(client.description)}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="deleteClient(${client.id})">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading clients:', error);
    }
}

async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        const contacts = await response.json();
        
        const container = document.getElementById('contactsList');
        
        if (contacts.length === 0) {
            container.innerHTML = '<p class="text-muted">No contact submissions yet.</p>';
            return;
        }
        
        container.innerHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Submitted At</th>
                    </tr>
                </thead>
                <tbody>
                    ${contacts.map(contact => `
                        <tr>
                            <td>${escapeHtml(contact.fullName)}</td>
                            <td>${escapeHtml(contact.email)}</td>
                            <td>${escapeHtml(contact.mobile)}</td>
                            <td>${escapeHtml(contact.city)}</td>
                            <td>${new Date(contact.submittedAt).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

async function loadSubscriptions() {
    try {
        const response = await fetch(`${API_BASE_URL}/subscriptions`);
        const subscriptions = await response.json();
        
        const container = document.getElementById('subscriptionsList');
        
        if (subscriptions.length === 0) {
            container.innerHTML = '<p class="text-muted">No subscriptions yet.</p>';
            return;
        }
        
        container.innerHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Email Address</th>
                        <th>Subscribed At</th>
                    </tr>
                </thead>
                <tbody>
                    ${subscriptions.map(sub => `
                        <tr>
                            <td>${escapeHtml(sub.email)}</td>
                            <td>${new Date(sub.subscribedAt).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading subscriptions:', error);
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Project deleted successfully!');
            loadProjects();
        } else {
            alert('Failed to delete project.');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('An error occurred while deleting.');
    }
}

async function deleteClient(id) {
    if (!confirm('Are you sure you want to delete this client?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Client deleted successfully!');
            loadClients();
        } else {
            alert('Failed to delete client.');
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        alert('An error occurred while deleting.');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
