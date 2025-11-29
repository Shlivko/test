const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Главная страница (редирект)
app.get('/', (req, res) => {
  res.redirect('/download');
});

// API route для скачивания файла
app.get('/download', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'check', 'reference-1242080012023055.pdf');

  // Форсированная загрузка
  res.setHeader('Content-Disposition', 'attachment; filename="reference-1242080012023055.pdf"');
  res.setHeader('Content-Type', 'application/pdf');

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Ошибка при скачивании файла:', err);
      res.status(500).json({ result: -1, message: 'Ошибка при скачивании файла' });
    }
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ result: -1, message: 'Файл не найден' });
});

export default app;






