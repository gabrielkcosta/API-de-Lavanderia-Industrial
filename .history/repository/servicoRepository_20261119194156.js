import conexao from '../database/conexao.js';

export async function criarServico (embalagem) {
  const { descriçao, material, capacidade } = embalagem;
  const sql = 'INSERT INTO embalagem (descriçao, material, capacidade) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [descriçao, material, capacidade]);
  return { id_embalagem: resultado.insertId, descriçao, material, capacidade };
}

export async function listarEmbalagem() {
  const sql = 'SELECT * FROM embalagem';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarEmbalagem(id) {
  const sql = 'SELECT * FROM embalagem WHERE id_embalagem = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarEmbalagem(id, dados) {
  const atual = await buscarEmbalagem(id);
  if (!atual) return null;

  const descricao = dados.descricao !== undefined ? dados.descricao : atual.descricao;
  const material = dados.material !== undefined ? dados.material : atual.material;
  const capacidade = dados.capacidade !== undefined ? dados.capacidade : atual.capacidade;

  const sql = 'UPDATE embalagem SET descricao = ?, material = ? capacidade = ? WHERE id_embalagem = ?';
  await conexao.execute(sql, [descricao, material, capacidade, id]);
  return { id_embalagem: Number(id), descricao, material, capacidade};
}

export async function excluirembalagem(id) {
  const sql = 'DELETE FROM embalagem WHERE id_embalagem = ?';
  await conexao.execute(sql, [id]);
}