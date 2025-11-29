const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const pdfPath = path.join(__dirname, 'public', 'check', 'reference-1242080012023055.pdf');

// Редирект с корня на скачивание PDF
app.get('/', (req, res) => {
  res.redirect('/check/reference-1242080012023055.pdf');
});

// Скачивание PDF
app.get('/check/reference-1242080012023055.pdf', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="reference-1242080012023055.pdf"');
  res.setHeader('Content-Type', 'application/pdf');

  res.sendFile(pdfPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ result: -1, message: 'Ошибка при скачивании файла' });
    }
  });
});

// Любой другой URL → JSON 404
app.use((req, res) => {
  res.status(404).json({ result: -1, message: 'Файл не найден' });
});

// Локальный запуск сервера
if (require.main === module) {
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}

module.exports = app;
