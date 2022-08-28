const events = document.querySelector('.events');
document.addEventListener('DOMContentLoaded', function() {
    // Menu
    const menu = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menu, {edge: 'right'});
    // Form
    const form = document.querySelectorAll('.side-form');
    M.Sidenav.init(form, {edge: 'left'});
    // Collapsible
    const collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse);
});
// Convert 24 Hour Time to 12 Hour Time
const convert24hourto12hour = (time) => {
    if (time.length === 0) {
        return time;
    }
    const time_split = time.split(':');
    let ampm = "AM"
    if (time_split[0] >= 12) {
        ampm = "PM";
        if (time_split[0] > 12) {
            time_split[0] = time_split[0] - 12;
            if (time_split[0] < 10) {
                time_split[0] = '0' + time_split[0];
            }
        }
    }else if (time_split[0] === '00') {
        time_split[0] = '12';
    }
    return time_split[0] + ':' + time_split[1] + ' ' + ampm;
};
// Add Event
const addEvent = (data, id) => {
    let date = (new Date(data.date + 'T00:00:00')).toString().split(' ').slice(0, 4).join(' ');
    let time = convert24hourto12hour(data.time)
    const html = `
        <li class="event" data-id="${id}">
            <div class="collapsible-header card-panel white row">
                <img src="/img/content.png" alt="img">
                <div>
                    <div class="event-title">${data.title}</div>
                    <div class="event-info">${date}</div>
                </div>
                <div class="event-delete">
                    <i class="material-icons" data-id="${id}">delete_outline</i>
                </div>
            </div>
            <div class="collapsible-body white">
                <div>
                    <div class="event-info">${data.info}</div>
                    <div class="event-info">${data.location}</div>
                    <div class="event-info">${time}</div>
                </div>
            </div>
        </li>
    `;
    events.innerHTML += html;
};
// Remove Event
const removeEvent = (id) => {
    const event = document.querySelector(`.event[data-id="${id}"]`);
    event.remove();
};
// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (evt) => {
    auth.signOut();
});
