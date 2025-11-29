const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const pdfPath = path.join(__dirname, 'public', 'check', 'reference-1242080012023055.pdf');

app.get('/', (req, res) => {
  res.redirect('/check/reference-1242080012023055.pdf');
});

app.get('/check/reference-1242080012023055.pdf', (req, res) => {
  res.download(pdfPath, 'reference-1242080012023055.pdf', (err) => {
    if (err) {
      res.status(500).json({ result: -1, message: 'Ошибка при скачивании файла' });
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ result: -1, message: 'Выписка не найдена' });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
