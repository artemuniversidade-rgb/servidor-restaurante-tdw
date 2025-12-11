// troqeui IP no mongo atlasqdqwqw^
//ahbfaebuyabwcewe
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// ATENÇÃO: Adicionei o nome da BD (app_menu) ao seu URI, 
// pois estava em falta, o que causaria erro de conexão.
const dbURI = 'mongodb+srv://dev_admin:TWD2025@cluster0.xetcpa1.mongodb.net/app_menu?appName=Cluster0';


app.use((req, res, next) => {
    const dataHora = new Date().toLocaleString('pt-PT');
    console.log(`[${dataHora}] Pedido recebido: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());

// ----------------------------------------------------
// NOVO: Rota de HOMEPAGE (para o Vercel não dar "Cannot GET /")
app.get('/', (req, res) => {
    res.status(200).send('Servidor TDW do Restaurante está ativo e a funcionar! Use /menu para aceder à API.');
});
// ----------------------------------------------------


mongoose.connect(dbURI)
    .then(() => {
        console.log('Ligação ao MongoDB Atlas estabelecida com sucesso.');
        
        const menuRouter = require('./Controllers/menu_do_dia');
        app.use('/menu', menuRouter);

        // A linha app.listen() deve permanecer dentro do .then()
        app.listen(port, () => {
          console.log(`Servidor "O Manjar do Chef" a correr na porta ${port}.`);
        });
    })
    .catch((err) => {
        console.log(`Erro na ligação ao MongoDB Atlas: ${err}`);
        // No Vercel, o erro aqui causava o 500 FUNCTION_INVOCATION_FAILED
    });