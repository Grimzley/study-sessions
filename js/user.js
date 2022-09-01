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
        
    }
});
