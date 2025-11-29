import express from 'express';
import path from 'path';

const app = express();

// Порт Vercel сам задаёт через process.env.PORT
const PORT = process.env.PORT || 3000;

// Middleware отдачи статики из public
app.use(express.static('public'));

// Главная страница перенаправляет на файл
app.get('/', (req, res) => {
  res.redirect('/check/reference-1242080012023055.pdf');
});

// API route для скачивания файла с корректным именем
app.get('/download', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'check', 'reference-1242080012023055.pdf');

  // Заголовок для скачивания
  res.setHeader('Content-Disposition', 'attachment; filename=reference-1242080012023055.pdf');

  // Отправка файла
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Ошибка при скачивании файла:', err);
      res.status(500).json({ result: -1, message: 'Ошибка при скачивании файла' });
    }
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ result: -1, message: 'Выписка не найдена' });
});

export default app;
