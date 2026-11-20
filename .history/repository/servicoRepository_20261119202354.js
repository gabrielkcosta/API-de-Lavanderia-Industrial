import conexao from '../database/conexao.js';

export async function criarServico (servico) {
  const { descriçao, tipo_tecido , capacidade } = servico;
  const sql = 'INSERT INTO servico (descriçao, tipo_tecido , capacidade) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [descriçao, tipo_tecido , capacidade]);
  return { id_embalagem: resultado.insertId, descriçao, tipo_tecido , capacidade };
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
  const tipo_tecido  = dados.tipo_tecido  !== undefined ? dados.tipo_tecido  : atual.tipo_tecido ;
  const capacidade = dados.capacidade !== undefined ? dados.capacidade : atual.capacidade;

  const sql = 'UPDATE servico SET descricao = ?, tipo_tecido  = ? capacidade = ? WHERE id_embalagem = ?';
  await conexao.execute(sql, [descricao, tipo_tecido , capacidade, id]);
  return { id_embalagem: Number(id), descricao, tipo_tecido , capacidade};
}

export async function excluirServico(id) {
  const sql = 'DELETE FROM servico WHERE id_embalagem = ?';
  await conexao.execute(sql, [id]);
}