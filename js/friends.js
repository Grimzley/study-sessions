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
        // Realtime Data Listener
        db.collection('users').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                var friendsList = change.doc.data().friends
                if (friendsList.length != 0) {
                    if (change.type === 'added' && friendsList.includes(user.uid)) {
                        // add data
                        showFriend(change.doc.data(), change.doc.id);
                    }else if (change.type === 'modified') {

                    }else if (change.type === 'removed') {

                    }
                }
            })
        });
    }
});
