const TABELA = {
  IMPOSTOS_PADRAO: {
    icms: 18,
    ipi: 5,
    pis: 1.65,
    cofins: 7.6,
  },
};

function calcularNF(dados) {

  console.log(dados);

  const {
    valorProduto = 0,
    icms = 0,
    ipi = 0,
    pis = 0,
    cofins = 0,
  } = dados;

  // validações
  if (valorProduto <= 0) {
    throw new Error('Valor do produto inválido');
  }

  if (icms < 0 || ipi < 0 || pis < 0 || cofins < 0) {
    throw new Error('Impostos inválidos');
  }

  // cálculos
  const valorICMS = (icms / 100) * valorProduto;
  const valorIPI = (ipi / 100) * valorProduto;
  const valorPIS = (pis / 100) * valorProduto;
  const valorCOFINS = (cofins / 100) * valorProduto;

  const total =
    valorProduto +
    valorICMS +
    valorIPI +
    valorPIS +
    valorCOFINS;

  return {
    valorProduto: Number(valorProduto.toFixed(2)),
    valorICMS: Number(valorICMS.toFixed(2)),
    valorIPI: Number(valorIPI.toFixed(2)),
    valorPIS: Number(valorPIS.toFixed(2)),
    valorCOFINS: Number(valorCOFINS.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

function calcularNFInverso(dados) {

  const {
    totalNF = 0,
    icms = 0,
    ipi = 0,
    pis = 0,
    cofins = 0,
  } = dados;

  if (totalNF <= 0) throw new Error('Total da NF inválido');
  if (icms < 0 || ipi < 0 || pis < 0 || cofins < 0) throw new Error('Impostos inválidos');

  const fator        = 1 + (icms + ipi + pis + cofins) / 100;
  const valorProduto = totalNF / fator;

  const valorICMS   = (icms   / 100) * valorProduto;
  const valorIPI    = (ipi    / 100) * valorProduto;
  const valorPIS    = (pis    / 100) * valorProduto;
  const valorCOFINS = (cofins / 100) * valorProduto;

  return {
    totalNF:      Number(totalNF.toFixed(2)),
    valorProduto: Number(valorProduto.toFixed(2)),
    valorICMS:    Number(valorICMS.toFixed(2)),
    valorIPI:     Number(valorIPI.toFixed(2)),
    valorPIS:     Number(valorPIS.toFixed(2)),
    valorCOFINS:  Number(valorCOFINS.toFixed(2)),
  };
}

module.exports = {
  calcularNF,
  calcularNFInverso,
  TABELA,
};