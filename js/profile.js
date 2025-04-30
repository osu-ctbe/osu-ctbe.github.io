document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = localStorage.getItem('osu_access_token');
    const profileDiv = document.getElementById('profile-data');

    if (!accessToken) {
        profileDiv.innerHTML = '<p>Вы не авторизованы!</p><a href="index.html">Войти</a>';
        return;
    }

    try {
        const response = await fetch('https://osu.ppy.sh/api/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const userData = await response.json();

        profileDiv.innerHTML = `
            <img src="${userData.avatar_url}" width="100" style="border-radius: 50%;">
            <h2>${userData.username}</h2>
            <p>Ранг: #${userData.statistics.global_rank || 'N/A'}</p>
            <p>PP: ${userData.statistics.pp}</p>
        `;
    } catch (error) {
        profileDiv.innerHTML = '<p>Ошибка загрузки данных!</p>';
        console.error(error);
    }
});