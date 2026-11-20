import conexao from '../database/conexao.js';

export async function criarServico (servico) {
  const { descriçao, material, capacidade } = servico;
  const sql = 'INSERT INTO servico (descriçao, material, capacidade) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [descriçao, material, capacidade]);
  return { id_embalagem: resultado.insertId, descriçao, material, capacidade };
}

export async function listarServico() {
  const sql = 'SELECT * FROM servico';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarServico(id) {
  const sql = 'SELECT * FROM servico WHERE id_embalagem = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarServico(id, dados) {
  const atual = await buscarServico(id);
  if (!atual) return null;

  const descricao = dados.descricao !== undefined ? dados.descricao : atual.descricao;
  const material = dados.material !== undefined ? dados.material : atual.material;
  const capacidade = dados.capacidade !== undefined ? dados.capacidade : atual.capacidade;

  const sql = 'UPDATE servico SET descricao = ?, material = ? capacidade = ? WHERE id_embalagem = ?';
  await conexao.execute(sql, [descricao, material, capacidade, id]);
  return { id_embalagem: Number(id), descricao, material, capacidade};
}

export async function excluirServico(id) {
  const sql = 'DELETE FROM servico WHERE id_embalagem = ?';
  await conexao.execute(sql, [id]);
}