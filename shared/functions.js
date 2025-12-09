const fs = require('fs');
const nome_ficheiro = 'shared/ficheiro_menu.txt';

function lerFicheiro() {
    try {
        const data = fs.readFileSync(nome_ficheiro, 'utf8');
        // Tenta converter de string para array (JSON.parse), se falhar, devolve um array vazio
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function gravarFicheiro(dados) {
    try {
        // Converte o array em string (JSON.stringify)
        fs.writeFileSync(nome_ficheiro, JSON.stringify(dados));
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    lerFicheiro,
    gravarFicheiro
};