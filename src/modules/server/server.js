const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FULLPATH = path.join(__dirname, '../../../dist');

app.use(express.static(FULLPATH));

app.get('*', function (req, res) {
    res.sendFile(FULLPATH + '/login.html');
});

app.get('*', function (req, res) {
    res.status(404).sendFile(FULLPATH + '/404.html');
});

app.get('*', function (req, res) {
    res.status(500).sendFile(FULLPATH + '/500.html');
});

app.listen(PORT, function () {
    console.log(`Слушаем пустотУ на портУ: ${PORT}!`);
});
