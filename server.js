const express = require('express');
const axios = require('axios');
const app = express();

const OS_CLIENT_ID = '40240';
const OS_CLIENT_SECRET = 'l9aA6KLwhXqo1JS7A351ohgzrfc4MHuOTYeOLJ7g';
const OS_REDIRECT_URI = 'https://ctbe.pro/auth/osu/callback';

// 1. Перенаправление на osu! OAuth
app.get('/auth/osu', (req, res) => {
    const authUrl = `https://osu.ppy.sh/oauth/authorize?client_id=${OS_CLIENT_ID}&redirect_uri=${encodeURIComponent(OS_REDIRECT_URI)}&response_type=code&scope=identify`;
    res.redirect(authUrl);
});

// 2. Получение токена после авторизации
app.get('/auth/osu/callback', async (req, res) => {
    const { code } = req.query;

    try {
        // Получаем access_token
        const tokenResponse = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: OS_CLIENT_ID,
            client_secret: OS_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: OS_REDIRECT_URI
        }, {
            headers: { 'Accept': 'application/json' }
        });

        const { access_token } = tokenResponse.data;

        // Получаем данные пользователя
        const userResponse = await axios.get('https://osu.ppy.sh/api/v2/me', {
            headers: { 'Authorization': `Bearer ${access_token}` }
        });

        const userData = userResponse.data;
        console.log('User logged in:', userData.username);

        // Здесь можно сохранить пользователя в сессию / БД
        res.send(`Welcome, ${userData.username}!`);
    } catch (error) {
        console.error('OAuth error:', error.response.data);
        res.status(500).send('Login failed');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));