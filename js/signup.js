// Create New User
const signup = document.querySelector('#signup-form');
signup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // Get User Information
    const firstName = signup['first-name'].value;
    const lastName = signup['last-name'].value;
    const email = signup['signup-email'].value;
    const password = signup['signup-password'].value;
    // Create User
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        window.location.replace('/pages/home.html');
    });
})
