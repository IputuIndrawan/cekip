const express = require('express');
const app = express();

// Endpoint untuk pengecekan IP
app.get('/api.:format', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let response = {
        ip: ip
    };

    // Cek format respons yang diminta
    const format = req.params.format.toLowerCase();
    if (format === 'json') {
        // Ubah respons menjadi JSON
        res.set('Content-Type', 'application/json');
        res.send(response);
    } else if (format === 'xml') {
        // Ubah respons menjadi XML
        res.set('Content-Type', 'application/xml');
        const xmlResponse = `<ip>${ip}</ip>`;
        res.send(xmlResponse);
    } else if (format === 'yml') {
        // Ubah respons menjadi YAML
        res.set('Content-Type', 'text/yaml');
        const ymlResponse = `ip: ${ip}`;
        res.send(ymlResponse);
    } else if (format === 'csv') {
        // Ubah respons menjadi CSV
        res.set('Content-Type', 'text/csv');
        const csvResponse = `ip\n${ip}`;
        res.send(csvResponse);
    } else if (format === 'html') {
        // Ubah respons menjadi HTML
        res.set('Content-Type', 'text/html');
        const htmlResponse = `<p>IP: ${ip}</p>`;
        res.send(htmlResponse);
    } else if (format === 'txt') {
        // Ubah respons menjadi Plain Text
        res.set('Content-Type', 'text/plain');
        const txtResponse = `IP: ${ip}`;
        res.send(txtResponse);
    } else {
        res.status(400).send('Format not supported');
    }
});

// Port server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
