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
                }else if (change.type === 'modified') {
                    // edit data
                    editEvent(change.doc.data(), change.doc.id);
                }else if (change.type === 'removed' && change.doc.data().uid === user.uid) {
                    // remove data
                    removeEvent(change.doc.id);
                }
            })
        });
        // Add Event
        const form = document.querySelector('.add-event');
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
            db.collection('events').add(event).catch(err => console.log(err));
            form.title.value = '';
            form.info.value = '';
            form.location.value = '';
            form.date.value = '';
            form.time.value = '';
        });
        // Edit Event
        const update = document.querySelector('.edit-event');
        update.addEventListener('submit', (evt) => {
            evt.preventDefault();
            db.collection('events').doc(update.uid.value).update({
                title: update.title.value,
                info: update.info.value,
                location: update.location.value,
                date: update.date.value,
                time: update.time.value,
            }).catch(err => console.log(err));
        });
        const eventContainer = document.querySelector('.events');
        eventContainer.addEventListener('click', evt => {
            if (evt.target.tagName === 'I') {
                const id = evt.target.getAttribute('data-id');
                const event = document.querySelector(`.event[data-id="${id}"]`);
                update.title.value = event.querySelector('.event-title').innerHTML;
                update.info.value = event.querySelector('.event-information').innerHTML;
                update.location.value = event.querySelector('.event-location').innerHTML;
                update.date.valueAsDate = new Date(event.querySelector('.event-date').innerHTML);
                update.time.value = convert12HourTo24Hour(event.querySelector('.event-time').innerHTML);
                update.uid.value = id;
            }else {
                // Remove Event
                //db.collection('events').doc(id).delete();
            }
        });
    }
});
