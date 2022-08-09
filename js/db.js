// Offline Data
db.enablePersistence()
    .catch(err => {
        if (err.code == 'faied-precondition') {
            console.log('persistence failed')
        }else if (err.code == 'unimplemented') {
            console.log('persistence is not available')
        }
    })

// Realtime Data Listener
db.collection('events').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            // add data
            renderEvent(change.doc.data(), change.doc.id);
        }else if (change.type === 'removed') {
            // remove data
        }
    })
});
