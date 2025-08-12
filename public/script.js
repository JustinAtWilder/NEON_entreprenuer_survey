const backendUrl = 'https://neon-entreprenuer-survey.onrender.com/api/saveResponse'; // Replace with your backend URL
//const backendUrl = 'http://localhost:3000/api/saveResponse'; // For local development

document.getElementById('entrepreneurSurvey').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            alert('Thank you for completing the survey!');
        } else {
            alert('There was an error submitting your survey. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your survey. Please try again.');
    }
});