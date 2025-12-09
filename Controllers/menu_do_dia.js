const express = require('express');
const router = express.Router();
const Prato = require('../Models/Prato');
const basicAuthMiddleware = require('../Middlewares/auth_basic');

router.use(basicAuthMiddleware);

router.get('/', (req, res) => {
    Prato.find({})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
});

router.get('/:codigo', (req, res) => {
    const codigoString = req.params.codigo;
    if (isNaN(codigoString)) {
        return res.status(400).send('Erro 400: O código deve ser um número.');
    }
    const codigoNumerico = parseInt(codigoString);

    Prato.findOne({ Cod: codigoNumerico })
        .then(prato => {
            if (prato) {
                res.status(200).send(prato);
            } else {
                res.status(400).send('Prato não encontrado.');
            }
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
});

router.post('/', (req, res) => {
    Prato.create(req.body)
        .then(prato => {
            res.status(200).send(prato);
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
});

router.patch('/:codigo', (req, res) => {
    const codigoString = req.params.codigo;
    if (isNaN(codigoString)) {
        return res.status(400).send('Erro 400: O código deve ser um número.');
    }
    const codigoNumerico = parseInt(codigoString);

    Prato.findOneAndUpdate({ Cod: codigoNumerico }, req.body, { new: true, runValidators: true })
        .then(prato => {
            if (prato) {
                res.status(200).send(prato);
            } else {
                res.status(400).send('Prato não encontrado para atualização.');
            }
        })
        .catch(error => {
             res.status(400).send(error.message);
        });
});

router.delete('/:codigo', (req, res) => {
    const codigoString = req.params.codigo;
    if (isNaN(codigoString)) {
        return res.status(400).send('Erro 400: O código deve ser um número.');
    }
    const codigoNumerico = parseInt(codigoString);

    Prato.findOneAndDelete({ Cod: codigoNumerico })
        .then(prato => {
            if (prato) {
                res.status(200).send(`Prato com código ${codigoNumerico} removido.`);
            } else {
                res.status(400).send('Prato não encontrado para remoção.');
            }
        })
        .catch(error => {
             res.status(400).send(error.message);
        });
});

router.delete('/', (req, res) => {
    Prato.deleteMany({})
        .then(result => {
            res.status(200).send(`Todos os ${result.deletedCount} pratos foram eliminados.`);
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
});

module.exports = router;