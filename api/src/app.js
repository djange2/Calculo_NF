const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


// checa se api está no ar
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});


// retorna tabela padrão de impostos
app.get('/api/tabelas', (req, res) => {

  const { TABELA } = require('./funcoes');

  res.json({
    success: true,
    data: TABELA.IMPOSTOS_PADRAO,
  });

});


// POST /api/calcular
app.post('/api/calcular', (req, res) => {

  try {

    const { calcularNF } = require('./funcoes');

    const dados = req.body;

    console.log(dados);

    if (!dados || typeof dados !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Corpo da requisição inválido'
      });
    }

    const resultado = calcularNF(dados);

    console.log(resultado);

    return res.status(200).json({
      success: true,
      data: resultado
    });

  } catch (err) {

    console.log(err.message);

    return res.status(400).json({
      success: false,
      error: err.message
    });

  }

});

module.exports = app;