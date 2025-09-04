const { app, startServer } = require('./src/server');
const port = process.env.PORT || 3000;

startServer().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});