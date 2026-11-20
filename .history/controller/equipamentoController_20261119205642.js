import { Equipamento } from '../models/Equipamento.js';
import {
  criarEquipamento,
  listarEquipamento,
  buscarEquipamento,
  atualizarEquipamento,
  excluirEquipamento,
} from '../repositoryequipamentoRepository.js';

export async function cadastrarEquipamento(req, res) {
  try {
    const { nome, patrimonio, status } = req.body || {};
    const equipamento = new Equipamento(null, nome, patrimonio, status);
    const erroValidacao = equipamento.validar();

    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const criado = await criarEquipamento({ nome, patrimonio, status });
    return res.status(201).json({
      mensagem: 'Equipamento cadastrado com sucesso.',
      dados: criado,
    });
  } catch (error) {
    console.error('Erro ao cadastrar equipamento:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function listarEquipamentos(req, res) {
  try {
    const equipamentos = await listarEquipamento();
    return res.status(200).json({
      mensagem: 'Equipamentos listados com sucesso.',
      dados: equipamentos,
    });
  } catch (error) {
    console.error('Erro ao listar equipamentos:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function buscarEquipamentoPorId(req, res) {
  try {
    const { id } = req.params;

    if (!Equipamento.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const equipamento = await buscarEquipamento(id);
    if (!equipamento) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
    }

    return res.status(200).json({
      mensagem: 'Equipamento encontrado com sucesso.',
      dados: equipamento,
    });
  } catch (error) {
    console.error('Erro ao buscar equipamento por ID:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function atualizarEquipamentoParcial(req, res) {
  try {
    const { id } = req.params;

    if (!Equipamento.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const atual = await buscarEquipamento(id);
    if (!atual) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
    }

    const dados = req.body || {};
    const equipamentoAtualizado = new Equipamento(
      Number(id),
      dados.nome !== undefined ? dados.nome : atual.nome,
      dados.patrimonio !== undefined ? dados.patrimonio : atual.patrimonio,
      dados.status !== undefined ? dados.status : atual.status
    );

    const erroValidacao = equipamentoAtualizado.validar();
    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const resultado = await atualizarEquipamento(id, {
      nome: equipamentoAtualizado.nome,
      patrimonio: equipamentoAtualizado.patrimonio,
      status: equipamentoAtualizado.status,
    });

    return res.status(200).json({
      mensagem: 'Equipamento atualizado com sucesso.',
      dados: resultado,
    });
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function excluirEquipamentoPorId(req, res) {
  try {
    const { id } = req.params;

    if (!Equipamento.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const existente = await buscarEquipamento(id);
    if (!existente) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
    }

    await excluirEquipamento(id);
    return res.status(200).json({ mensagem: 'Equipamento excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir equipamento:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}