import conexao from '../database/conexao.js';

export async function criarColaborador(equipamento) {
  const { nome, matricula, turno } = equipamento;
  const sql = 'INSERT INTO equipamento (nome, matricula, turno) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [nome, matricula, turno]);
  return { id_operador: resultado.insertId, nome, matricula, turno };
}

export async function listarColaborador() {
  const sql = 'SELECT * FROM equipamento';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarColaborador(id) {
  const sql = 'SELECT * FROM equipamento WHERE id_operador = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarColaborador(id, dados) {
  const atual = await buscarColaborador(id);
  if (!atual) return null;

  const nome = dados.nome !== undefined ? dados.nome : atual.nome;
  const matricula = dados.matricula !== undefined ? dados.matricula : atual.matricula;
  const turno = dados.turno !== undefined ? dados.turno : atual.turno;

  const sql = 'UPDATE equipamento SET nome = ?, matricula = ? turno = ? WHERE id_operador = ?';
  await conexao.execute(sql, [nome, matricula, turno, id]);
  return { id_operador: Number(id), nome, matricula, turno};
}

export async function excluirColaborador(id) {
  const sql = 'DELETE FROM equipamento WHERE id_operador = ?';
  await conexao.execute(sql, [id]);
}