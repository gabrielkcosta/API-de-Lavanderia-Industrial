import { ServicoLavagem } from '../model/ServicoLavagem.js';
import {
  criarServico,
  listarServico,
  buscarServico,
  atualizarServico,
  excluirServico,
} from '../repository/servicoRepository.js';

export async function cadastrarServico(req, res) {
  try {
    const body = req.body || {};
    const descricao = body.descricao;
    const tipoTecido = body.tipo_tecido !== undefined ? body.tipo_tecido : body.tipoTecido;
    const valor = body.valor;

    const servico = new ServicoLavagem(null, descricao, tipoTecido, valor);
    const erroValidacao = servico.validar();

    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const valorNumerico = Number(valor);
    const criado = await criarServico({
      descricao,
      tipo_tecido: tipoTecido,
      valor: valorNumerico,
    });

    return res.status(201).json({
      mensagem: 'Serviço de lavagem cadastrado com sucesso.',
      dados: criado,
    });
  } catch (error) {
    console.error('Erro ao cadastrar serviço de lavagem:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function listarServicos(req, res) {
  try {
    const servicos = await listarServico();
    return res.status(200).json({
      mensagem: 'Serviços de lavagem listados com sucesso.',
      dados: servicos,
    });
  } catch (error) {
    console.error('Erro ao listar serviços de lavagem:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function buscarServicoPorId(req, res) {
  try {
    const { id } = req.params;

    if (!ServicoLavagem.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const servico = await buscarServico(id);
    if (!servico) {
      return res.status(404).json({ mensagem: 'Serviço de lavagem não encontrado.' });
    }

    return res.status(200).json({
      mensagem: 'Serviço de lavagem encontrado com sucesso.',
      dados: servico,
    });
  } catch (error) {
    console.error('Erro ao buscar serviço de lavagem por ID:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function atualizarServicoParcial(req, res) {
  try {
    const { id } = req.params;

    if (!ServicoLavagem.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const atual = await buscarServico(id);
    if (!atual) {
      return res.status(404).json({ mensagem: 'Serviço de lavagem não encontrado.' });
    }

    const dados = req.body || {};
    const tipoEnviado = dados.tipo_tecido !== undefined ? dados.tipo_tecido : dados.tipoTecido;

    const servicoAtualizado = new ServicoLavagem(
      Number(id),
      dados.descricao !== undefined ? dados.descricao : atual.descricao,
      tipoEnviado !== undefined ? tipoEnviado : atual.tipo_tecido,
      dados.valor !== undefined ? dados.valor : atual.valor
    );

    const erroValidacao = servicoAtualizado.validar();
    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const valorNumerico = Number(servicoAtualizado.valor);
    const resultado = await atualizarServico(id, {
      descricao: servicoAtualizado.descricao,
      tipo_tecido: servicoAtualizado.tipoTecido,
      valor: valorNumerico,
    });

    return res.status(200).json({
      mensagem: 'Serviço de lavagem atualizado com sucesso.',
      dados: resultado,
    });
  } catch (error) {
    console.error('Erro ao atualizar serviço de lavagem:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export async function excluirServicoPorId(req, res) {
  try {
    const { id } = req.params;

    if (!ServicoLavagem.validarId(id)) {
      return res.status(400).json({ mensagem: 'ID inválido. Informe um número inteiro positivo.' });
    }

    const existente = await buscarServico(id);
    if (!existente) {
      return res.status(404).json({ mensagem: 'Serviço de lavagem não encontrado.' });
    }

    await excluirServico(id);
    return res.status(200).json({ mensagem: 'Serviço de lavagem excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir serviço de lavagem:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}