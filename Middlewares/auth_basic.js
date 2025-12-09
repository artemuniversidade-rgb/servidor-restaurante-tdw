const Admin = require('../Models/Admin');

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.set('WWW-Authenticate', 'Basic');
        return res.status(401).send('Erro 401: Credenciais de autenticação Básica (Basic) são necessárias.');
    }

    const authBase64 = authHeader.substring(6);
    const authString = Buffer.from(authBase64, 'base64').toString();
    const [username, password] = authString.split(':');

    if (!username || !password) {
        res.set('WWW-Authenticate', 'Basic');
        return res.status(401).send('Erro 401: Formato de credenciais inválido (username:password).');
    }

    Admin.findOne({ username: username, password: password })
        .then(admin => {
            if (admin) {
                next();
            } else {
                res.set('WWW-Authenticate', 'Basic');
                res.status(401).send('Erro 401: Username ou palavra-passe inválidos.');
            }
        })
        .catch(error => {
            res.status(500).send('Erro 500: Erro interno do servidor durante a autenticação.');
        });
};