// Realtime Date
db.collection('events').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            // add data
        }else if (change.type === 'removed') {
            // remove data
        }
    })
});
