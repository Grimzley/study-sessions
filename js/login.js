// Login User
const login = document.querySelector('#login-form');
login.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // Get User Information
    const email = login['login-email'].value;
    const password = login['login-password'].value;
    // Login User
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        window.location.replace('/pages/home.html');
    }); 
})
