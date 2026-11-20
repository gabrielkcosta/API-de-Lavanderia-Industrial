import conexao from '../database/conexao.js';

export async function criarServico (servico) {
  const { descriçao, tipo_tecido , valor } = servico;
  const sql = 'INSERT INTO servico (descriçao, tipo_tecido , valor) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [descriçao, tipo_tecido , valor]);
  return { id_embalagem: resultado.insertId, descriçao, tipo_tecido , valor };
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
  const valor = dados.valor !== undefined ? dados.valor : atual.valor;

  const sql = 'UPDATE servico SET descricao = ?, tipo_tecido  = ? valor = ? WHERE id_embalagem = ?';
  await conexao.execute(sql, [descricao, tipo_tecido , valor, id]);
  return { id_embalagem: Number(id), descricao, tipo_tecido , valor};
}

export async function excluirServico(id) {
  const sql = 'DELETE FROM servico WHERE id_embalagem = ?';
  await conexao.execute(sql, [id]);
}