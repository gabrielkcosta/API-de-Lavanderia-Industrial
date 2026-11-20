import conexao from '../database/conexao.js';

export async function criarColaborador(colaborador) {
  const { nome, matricula, turno } = colaborador;
  const sql = 'INSERT INTO colaborador (nome, matricula, turno) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [nome, matricula, turno]);
  return { id_colaborador: resultado.insertId, nome, matricula, turno };
}

export async function listarColaborador() {
  const sql = 'SELECT * FROM colaborador';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarColaborador(id) {
  const sql = 'SELECT * FROM colaborador WHERE id_colaborador = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarColaborador(id, dados) {
  const atual = await buscarColaborador(id);
  if (!atual) return null;

  const nome = dados.nome !== undefined ? dados.nome : atual.nome;
  const matricula = dados.matricula !== undefined ? dados.matricula : atual.matricula;
  const turno = dados.turno !== undefined ? dados.turno : atual.turno;

  const sql = 'UPDATE colaborador SET nome = ?, matricula = ?, turno = ? WHERE id_colaborador = ?';
  await conexao.execute(sql, [nome, matricula, turno, id]);
  return { id_colaborador: Number(id), nome, matricula, turno };
}

export async function excluirColaborador(id) {
  const sql = 'DELETE FROM colaborador WHERE id_colaborador = ?';
  await conexao.execute(sql, [id]);
}