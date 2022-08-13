const events = document.querySelector('.events');

document.addEventListener('DOMContentLoaded', function() {
    // Menu
    const menu = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menu, {edge: 'right'});
    // Form
    const form = document.querySelectorAll('.side-form');
    M.Sidenav.init(form, {edge: 'left'});
});
// Convert 24 Hour Time to 12 Hour Time
const convert24hourto12hour = (time) => {
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
    }
    return time_split[0] + ':' + time_split[1] + ' ' + ampm;
};
// Add Event
const addEvent = (data, id) => {
    let date = (new Date(data.date + 'T00:00:00')).toString().split(' ').slice(0, 4).join(' ');
    let time = data.time
    if (data.time.length != 0) {
        time = convert24hourto12hour(data.time);
    }
    const html = `
        <div class="card-panel event white row" data-id="${id}">
            <img src="/img/content.png" alt="img">
            <div class="content-details">
                <div class="event-title">${data.title}</div>
                <div class="event-info">${data.info}</div>
                <div class="event-info">${data.location}</div>
                <div class="event-info">${date}</div>
                <div class="event-info">${time}</div>
            </div>  
            <div class="event-delete">
                <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
    `;
    events.innerHTML += html;
};
// Remove Event
const removeEvent = (id) => {
    const event = document.querySelector(`.event[data-id="${id}"]`);
    event.remove();
};
