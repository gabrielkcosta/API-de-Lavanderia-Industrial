import conexao from '../database/conexao.js';

export async function criarEquipamento(equipamento) {
  const { nome, patrimonio, status } = equipamento;
  const sql = 'INSERT INTO equipamento (nome, patrimonio, status) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [nome, patrimonio, status]);
  return { id_equipamento: resultado.insertId, nome, patrimonio, status };
}

export async function listarEquipamento() {
  const sql = 'SELECT * FROM equipamento';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarEquipamento(id) {
  const sql = 'SELECT * FROM equipamento WHERE id_equipamento = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarEquipamento(id, dados) {
  const atual = await buscarEquipamento(id);
  if (!atual) return null;

  const nome = dados.nome !== undefined ? dados.nome : atual.nome;
  const patrimonio = dados.patrimonio !== undefined ? dados.patrimonio : atual.patrimonio;
  const status = dados.status !== undefined ? dados.status : atual.status;

  const sql = 'UPDATE equipamento SET nome = ?, patrimonio = ?, status = ? WHERE id_equipamento = ?';
  await conexao.execute(sql, [nome, patrimonio, status, id]);
  return { id_equipamento: Number(id), nome, patrimonio, status };
}

export async function excluirEquipamento(id) {
  const sql = 'DELETE FROM equipamento WHERE id_equipamento = ?';
  await conexao.execute(sql, [id]);
}