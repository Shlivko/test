const express = require('express');
const path = require('path');
const { analytics } = require('@vercel/analytics'); // подключение Vercel Analytics

const app = express();
const PORT = process.env.PORT || 3000;

// Подключаем Vercel Analytics middleware
app.use(analytics);

// Путь к PDF
const pdfPath = path.join(__dirname, 'public', 'check', 'reference-1242080012023055.pdf');

// 1️⃣ Главная страница — скачивание PDF
app.get('/', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="reference-1242080012023055.pdf"');
  res.setHeader('Content-Type', 'application/pdf');

  res.sendFile(pdfPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ result: -1, message: 'Ошибка при скачивании файла' });
    }
  });
});

// 2️⃣ Прямой путь к PDF
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

// 404 для всех остальных
app.use((req, res) => {
  res.status(404).json({ result: -1, message: 'Файл не найден' });
});

// Локальный запуск
if (require.main === module) {
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}

// Экспорт для Vercel Serverless
module.exports = app;
