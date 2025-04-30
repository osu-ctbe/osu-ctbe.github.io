document.addEventListener('DOMContentLoaded', () => {
    // Парсим access_token из URL (например: https://.../callback.html#access_token=XXX)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
        localStorage.setItem('osu_access_token', accessToken);
        window.location.href = 'profile.html';
    } else {
        alert('Ошибка авторизации!');
        window.location.href = 'index.html';
    }
});