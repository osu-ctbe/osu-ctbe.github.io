// Эффект мерцания для карточки (как в клубной атмосфере)
document.querySelector('.card').addEventListener('mousemove', (e) => {
    const card = e.currentTarget;
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    card.style.boxShadow = `${x - 50}px ${y - 50}px 50px rgba(255, 255, 255, 0.1)`;
});

// Автопрокрутка жанров (для динамики)
const genres = document.querySelector('.genre-bar');
setInterval(() => {
    genres.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
}, 100);