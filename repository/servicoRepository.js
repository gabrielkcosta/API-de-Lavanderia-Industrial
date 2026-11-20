import conexao from '../database/conexao.js';

export async function criarServico(servico) {
  const descricao = servico.descricao;
  const tipo_tecido = servico.tipo_tecido ?? servico.tipoTecido;
  const valor = servico.valor;

  const sql = 'INSERT INTO servico_lavagem (descricao, tipo_tecido, valor) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [descricao, tipo_tecido, valor]);
  return { id_servico: resultado.insertId, descricao, tipo_tecido, valor };
}

export async function listarServico() {
  const sql = 'SELECT * FROM servico_lavagem';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarServico(id) {
  const sql = 'SELECT * FROM servico_lavagem WHERE id_servico = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarServico(id, dados) {
  const atual = await buscarServico(id);
  if (!atual) return null;

  const tipoEnviado = dados.tipo_tecido ?? dados.tipoTecido;
  const descricao = dados.descricao !== undefined ? dados.descricao : atual.descricao;
  const tipo_tecido = tipoEnviado !== undefined ? tipoEnviado : atual.tipo_tecido;
  const valor = dados.valor !== undefined ? dados.valor : atual.valor;

  const sql = 'UPDATE servico_lavagem SET descricao = ?, tipo_tecido = ?, valor = ? WHERE id_servico = ?';
  await conexao.execute(sql, [descricao, tipo_tecido, valor, id]);
  return { id_servico: Number(id), descricao, tipo_tecido, valor };
}

export async function excluirServico(id) {
  const sql = 'DELETE FROM servico_lavagem WHERE id_servico = ?';
  await conexao.execute(sql, [id]);
}