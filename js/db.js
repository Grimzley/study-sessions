// Realtime Date
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
