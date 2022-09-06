// Offline Data
db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            console.log('persistence failed')
        }else if (err.code == 'unimplemented') {
            console.log('persistence is not available')
        }
    })
// Auth Status Changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).get().then((userInfo) => {
            const userName = document.querySelector('.user-name');
            userName.innerHTML = "Name: <span>" + userInfo.data().name + "</span>";
            const userEmail = document.querySelector('.user-email');
            userEmail.innerHTML = "Email: <span>" + user.email + "</span>";
        });
    }
});
