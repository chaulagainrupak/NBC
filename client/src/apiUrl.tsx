let apiUrl = '';


if (window.location.hostname == 'localhost') {
    apiUrl = 'http://localhost:8000';
} else {
    const apiHost = window.location.hostname.replace(/^nbc/, 'api');
    apiUrl = `https://${apiHost}`;
}

export { apiUrl };
