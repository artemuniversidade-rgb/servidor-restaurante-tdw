const mongoose = require('mongoose');

const pratoSchema = new mongoose.Schema({
    Cod: { 
        type: Number, 
        required: [true, 'O Código do Prato é obrigatório.'], 
        unique: true,
        min: [1, 'O Código deve ser maior que zero.']
    },
    nome: { 
        type: String, 
        required: [true, 'O Nome do Prato é obrigatório.'],
        minlength: [3, 'O nome deve ter pelo menos 3 caracteres.'],
        maxlength: [100, 'O nome não pode exceder 100 caracteres.']
    },
    categoria: { 
        type: String, 
        required: [true, 'A Categoria é obrigatória.'],
        enum: {
            values: ['Carne', 'Peixe', 'Vegetariano', 'Sobremesa'],
            message: 'Categoria inválida. Use Carne, Peixe, Vegetariano ou Sobremesa.'
        }
    },
    tipo: { 
        type: String, 
        required: [true, 'O Tipo de Prato (normal/vegetariano) é obrigatório.']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prato', pratoSchema);