<?php
session_start();

$client_id = "ВАШ_CLIENT_ID";
$redirect_uri = "https://ctbe.pro/auth/osu/callback";
$state = bin2hex(random_bytes(16));

$_SESSION['oauth_state'] = $state;

$auth_url = "https://osu.ppy.sh/oauth/authorize?" . http_build_query([
    'client_id' => $client_id,
    'redirect_uri' => $redirect_uri,
    'response_type' => 'code',
    'scope' => 'identify',
    'state' => $state
]);

header("Location: " . $auth_url);
?>