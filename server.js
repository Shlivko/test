const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download-pdf', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'reference-1242080012023055.pdf');
  res.download(filePath, 'reference-1242080012023055.pdf');
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><meta charset="utf-8"></head>
      <body>
        <script>
          window.location.href = '/download-pdf';
        </script>
        <p>Если скачивание не началось, <a href="/download-pdf">нажмите сюда</a>.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log('Сайт запущен на порту ' + PORT));

