const events = document.querySelector('.events');
document.addEventListener('DOMContentLoaded', function() {
    // Menu
    const menu = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menu, {edge: 'right'});
    // Form
    const form = document.querySelectorAll('.side-form');
    M.Sidenav.init(form, {edge: 'left'});
    // Edit
    const edit = document.querySelectorAll('.side-edit');
    M.Sidenav.init(edit, {edge: 'left'});
    // Modal
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
    // Collapsible
    const collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse);
});
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
const convert12HourTo24Hour = (time) => {
    if (time.length === 0) {
        return time;
    }
    const ampm = time.split(' ');
    const time_split = ampm[0].split(':');
    if (ampm[1] === 'PM') {
        time_split[0] = parseInt(time_split[0]) + 12;
    }else if (time_split[0] === '12') {
        time_split[0] = '00';
    }
    return time_split[0] + ':' + time_split[1];
}
// Add Event
const addEvent = (data, id) => {
    let date = (new Date(data.date + 'T00:00:00')).toString().split(' ').slice(0, 4).join(' ');
    let time = convert24hourto12hour(data.time)
    const html = `
        <li class="event" data-id="${id}">
            <div class="card-panel white row">
                <img src="/img/content.png" alt="img">
                <div class="collapsible-header event-details">
                    <div>
                        <div class="event-title">${data.title}</div>
                        <div class="event-info event-date">${date}</div>
                        <div>
                            <i class="material-icons event-dropdown">arrow_drop_down</i>
                        </div>
                    </div>
                </div>
                <i class="material-icons event-edit sidenav-trigger" data-target="side-edit" data-id="${id}">edit</i>
                <i class="material-icons event-delete modal-trigger" data-target="modal-delete" data-id="${id}">delete_outline</i>
            </div>
            <div class="collapsible-body white">
                <div>
                    <div class="event-info event-information">${data.info}</div>
                    <div class="event-info event-location">${data.location}</div>
                    <div class="event-info event-time">${time}</div>
                </div>
            </div>
        </li>
    `;
    events.innerHTML += html;
};
// Edit Event
const editEvent = (data, id) => {
    const event = document.querySelector(`.event[data-id="${id}"]`);
    event.querySelector('.event-title').innerHTML = data.title;
    event.querySelector('.event-date').innerHTML = data.date;
    event.querySelector('.event-information').innerHTML = data.info;
    event.querySelector('.event-location').innerHTML = data.location;
    event.querySelector('.event-time').innerHTML = data.time;
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
