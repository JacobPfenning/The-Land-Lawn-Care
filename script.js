// Force HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// Store form submissions
let submissions = [];

// Add password protection for admin functions
const zkfjush75h54gg3h348uiideab4u683u8y4vhjkal99hghjwb45 = "LandLawn2024"; // Change this to your desired password

function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        timestamp: new Date().toLocaleString()
    };
    
    // Add to submissions array
    submissions.push(formData);
    
    // Save to localStorage
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    
    // Log the submission
    console.log('New Submission:');
    console.log('Name:', formData.firstName, formData.lastName);
    console.log('Phone:', formData.phone);
    console.log('Time:', formData.timestamp);
    console.log('All Submissions:', submissions);
    
    // Hide the form
    form.style.display = 'none';
    
    // Show success message
    successMessage.classList.remove('hidden');
    
    // Reset form for next time
    form.reset();
}

// Load existing submissions when page loads
window.onload = function() {
    const savedSubmissions = localStorage.getItem('formSubmissions');
    if (savedSubmissions) {
        submissions = JSON.parse(savedSubmissions);
        console.log('Loaded Submissions:', submissions);
    }
    
    // Hide admin panel initially
    const adminPanel = document.querySelector('.admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
};

// Function to export submissions to CSV
function exportToCSV() {
    const password = prompt("Please enter admin password:");
    
    if (password !== zkfjush75h54gg3h348uiideab4u683u8y4vhjkal99hghjwb45) {
        alert("Incorrect password");
        return;
    }

    if (submissions.length === 0) {
        alert('No submissions to export');
        return;
    }

    const csvContent = [
        ['First Name', 'Last Name', 'Phone', 'Timestamp'],
        ...submissions.map(sub => [
            sub.firstName,
            sub.lastName,
            sub.phone,
            sub.timestamp
        ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'form_submissions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Add keyboard shortcut to show admin panel (Ctrl + Shift + A)
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        const password = prompt("Please enter admin password to show export button:");
        if (password === zkfjush75h54gg3h348uiideab4u683u8y4vhjkal99hghjwb45) {
            const adminPanel = document.querySelector('.admin-panel');
            if (adminPanel) {
                adminPanel.style.display = 'block';
            }
        }
    }
}); 