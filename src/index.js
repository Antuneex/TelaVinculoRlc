const express = require('express');
const app = express();

const routes = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(routes)

app.listen(5516, () => {
    console.log('Aplicação rodando na porta 5516!')
});

