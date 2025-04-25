<?php
session_start();

if ($_GET['state'] !== $_SESSION['oauth_state']) {
    die("Ошибка: неверный state-токен");
}

$client_id = "40240";
$client_secret = "l9aA6KLwhXqo1JS7A351ohgzrfc4MHuOTYeOLJ7g";
$redirect_uri = "https://ctbe.pro/auth/osu/callback";

$token_url = "https://osu.ppy.sh/oauth/token";
$user_url = "https://osu.ppy.sh/api/v2/me";

// Получаем access token
$ch = curl_init($token_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'code' => $_GET['code'],
    'grant_type' => 'authorization_code',
    'redirect_uri' => $redirect_uri
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);

// Получаем данные пользователя
$ch = curl_init($user_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $response['access_token']
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$user = json_decode(curl_exec($ch), true);
curl_close($ch);

// Сохраняем данные в сессию
$_SESSION['osu_user'] = [
    'id' => $user['id'],
    'username' => $user['username'],
    'avatar' => $user['avatar_url']
];

header("Location: /"); // Перенаправляем на главную
?>