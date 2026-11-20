import { Colaborador } from '../models/Colaborador.js';
import {
  criarColaborador,
  listarColaborador,
  buscarColaborador,
  atualizarColaborador,
  excluirColaborador,
} from '../repositorycolaboradorRepository.js';

export async function cadastrarColaborador(req, res) {
  try {
    const { nome, matricula, turno } = req.body || {};
    const colaborador = new Colaborador(null, nome, matricula, turno);
    const erroValidacao = colaborador.validar();

    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const criado = await criarColaborador({ nome, matricula, turno });
    return res.status(201).json({
      mensagem: 'Colaborador cadastrado com sucesso.',
      dados: criado,
    });
  } catch (error) {
    console.error('Erro ao cadastrar colaborador:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function listarColaboradores(req, res) {
  try {
    const colaboradores = await listarColaborador();
    return res.status(200).json({
      mensagem: 'Colaboradores listados com sucesso.',
      dados: colaboradores,
    });
  } catch (error) {
    console.error('Erro ao listar colaboradores:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function buscarColaboradorPorId(req, res) {
  try {
    const { id } = req.params;

    if (!Colaborador.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const colaborador = await buscarColaborador(id);
    if (!colaborador) {
      return res.status(404).json({ mensagem: 'Colaborador não encontrado.' });
    }

    return res.status(200).json({
      mensagem: 'Colaborador encontrado com sucesso.',
      dados: colaborador,
    });
  } catch (error) {
    console.error('Erro ao buscar colaborador por ID:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function atualizarColaboradorParcial(req, res) {
  try {
    const { id } = req.params;

    if (!Colaborador.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const atual = await buscarColaborador(id);
    if (!atual) {
      return res.status(404).json({ mensagem: 'Colaborador não encontrado.' });
    }

    const dados = req.body || {};
    const colaboradorAtualizado = new Colaborador(
      Number(id),
      dados.nome !== undefined ? dados.nome : atual.nome,
      dados.matricula !== undefined ? dados.matricula : atual.matricula,
      dados.turno !== undefined ? dados.turno : atual.turno
    );

    const erroValidacao = colaboradorAtualizado.validar();
    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const resultado = await atualizarColaborador(id, {
      nome: colaboradorAtualizado.nome,
      matricula: colaboradorAtualizado.matricula,
      turno: colaboradorAtualizado.turno,
    });

    return res.status(200).json({
      mensagem: 'Colaborador atualizado com sucesso.',
      dados: resultado,
    });
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function excluirColaboradorPorId(req, res) {
  try {
    const { id } = req.params;

    if (!Colaborador.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const existente = await buscarColaborador(id);
    if (!existente) {
      return res.status(404).json({ mensagem: 'Colaborador não encontrado.' });
    }

    await excluirColaborador(id);
    return res.status(200).json({ mensagem: 'Colaborador excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir colaborador:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}