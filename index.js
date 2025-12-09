// troqeui IP no mongo atlasqdqwqw^
//ahbfaebuyabwcewe
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const dbURI = 'mongodb+srv://dev_admin:TWD2025@cluster0.xetcpa1.mongodb.net/?appName=Cluster0';

app.use((req, res, next) => {
    const dataHora = new Date().toLocaleString('pt-PT');
    console.log(`[${dataHora}] Pedido recebido: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());

mongoose.connect(dbURI)
    .then(() => {
        console.log('Ligação ao MongoDB Atlas estabelecida com sucesso.');
        
        const menuRouter = require('./Controllers/menu_do_dia');
        app.use('/menu', menuRouter);

        app.listen(port, () => {
          console.log(`Servidor "O Manjar do Chef" a correr na porta ${port}.`);
        });
    })
    .catch((err) => {
        console.log(`Erro na ligação ao MongoDB Atlas: ${err}`);
    });