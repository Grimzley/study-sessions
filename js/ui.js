document.addEventListener('DOMContentLoaded', function() {
    // Menu
    const menu = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menu, {edge: 'right'});
    // Form
    const form = document.querySelectorAll('.side-form');
    M.Sidenav.init(form, {edge: 'left'});
});
