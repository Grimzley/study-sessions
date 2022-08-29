// Offline Data
db.enablePersistence()
    .catch(err => {
        if (err.code == 'faied-precondition') {
            console.log('persistence failed')
        }else if (err.code == 'unimplemented') {
            console.log('persistence is not available')
        }
    })
// Auth Status Changes
auth.onAuthStateChanged(user => {
    if (user) {
        // Realtime Data Listener
        db.collection('events').orderBy('date').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added' && change.doc.data().uid === user.uid) {
                    // add data
                    addEvent(change.doc.data(), change.doc.id);
                }else if (change.type === 'removed' && change.doc.data().uid === user.uid) {
                    // remove data
                    removeEvent(change.doc.id);
                }
            })
        });
        // Add Event
        const form = document.querySelector('form');
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const event = {
            title: form.title.value,
            info: form.info.value,
            location: form.location.value,
            date: form.date.value,
            time: form.time.value,
            uid: user.uid
        };
        db.collection('events').add(event)
            .catch(err => console.log(err));
            form.title.value = '';
            form.info.value = '';
            form.location.value = '';
            form.date.value = '';
            form.time.value = '';
        })
        // Remove Event
        const eventContainer = document.querySelector('.events');
        eventContainer.addEventListener('click', evt => {
            if (evt.target.tagName === 'I') {
                const id = evt.target.getAttribute('data-id');
                db.collection('events').doc(id).delete();
            }
        })
    }
});
