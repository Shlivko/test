const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Статика
app.use(express.static(path.join(__dirname, 'public')));

// Форсируем скачивание PDF
app.get('/check/reference-1242080012023055.pdf', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'check', 'reference-1242080012023055.pdf');
  res.download(filePath, 'reference-1242080012023055.pdf'); // <-- attachment
});

// Главная страница с автоматическим скачиванием и редиректом
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><meta charset="utf-8"></head>
      <body>
        <script>
          // Создаем fetch-запрос, чтобы скачать PDF через сервер
          fetch('/check/reference-1242080012023055.pdf')
            .then(response => response.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'reference-1242080012023055.pdf';
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
            });

          // Через 3 секунды редирект на сайт
          setTimeout(() => {
            window.location.href = 'https://bakai.kg';
          }, 3000);
        </script>
        <p>Если скачивание не началось, <a href="/check/reference-1242080012023055.pdf" download>нажмите сюда</a>.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log('Сайт запущен на порту ' + PORT));
