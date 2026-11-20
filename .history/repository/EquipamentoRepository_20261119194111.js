import conexao from '../database/conexao.js';

export async function criarEquipamento(ensaio) {
  const {  nome, descricao, status } = ensaio;
  const sql = 'INSERT INTO ensaio ( nome, descricao, status) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [ nome, descricao, status]);
  return { id_maquina: resultado.insertId, nome, descricao, status };
}

export async function listarEquipamento() {
  const sql = 'SELECT * FROM maquina';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarEquipamento(id) {
  const sql = 'SELECT * FROM ensaio WHERE id_maquina = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarEquipamento(id, dados) {
  const atual = await buscarEquipamento(id);
  if (!atual) return null;

  const nome = dados.nome !== undefined ? dados.nome : atual.nome;
  const descricao = dados.descricao !== undefined ? dados.descricao : atual.descricao;
  const status = dados.status !== undefined ? dados.status : atual.status;

  const sql = 'UPDATE maquina SET nome = ?, descricao = ?, status = ? WHERE id_maquina = ?';
  await conexao.execute(sql, [id, nome, descricao, status, id]);
  return { id_maquina: Number(id), nome, descricao, status};
}

export async function excluirEquipamento(id) {
  const sql = 'DELETE FROM equipamento WHERE id_maquina = ?';
  await conexao.execute(sql, [id]);
}