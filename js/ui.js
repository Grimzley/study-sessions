const events = document.querySelector('.events');

document.addEventListener('DOMContentLoaded', function() {
    // Menu
    const menu = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menu, {edge: 'right'});
    // Form
    const form = document.querySelectorAll('.side-form');
    M.Sidenav.init(form, {edge: 'left'});
});
// Add Event
const addEvent = (data, id) => {
    const html = `
        <div class="card-panel content white row" data-id="${id}">
            <img src="/img/content.png" alt="content img">
            <div class="content-details">
                <div class="content-title">${data.title}</div>
                <div class="content-info">${data.info}</div>
            </div>  
            <div class="content-delete">
                <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
    `;
    events.innerHTML += html;
};
// Remove Event
const removeEvent = (id) => {
    const event = document.querySelector(`.content[data-id="${id}"]`);
    event.remove();
};
