const btn = document.querySelector('.mobile-btn');
const menu = document.querySelector('.menu-mobile');

btn.addEventListener('click', () => {
    menu.classList.toggle('open');
});