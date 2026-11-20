export class ServicoLavagem {
  constructor(id, descricao, tipoTecido, valor) {
    this.id = id;
    this.descricao = descricao;
    this.tipoTecido = tipoTecido;
    this.valor = valor;
  }


    validar() {
    if (!this.descricao || typeof this.descricao !== 'string' || this.descricao.trim() === '') {
      return 'descricao é obrigatório e deve ter pelo menos 3 caracteres';
    }
    if (!this.tipoTecido || typeof this.tipoTecido !== 'string' || this.tipoTecido.trim() === '') {
      return 'tipoTecido é obrigatória ela nao pode estar vazia';
    }
    if (!this.valor || typeof this.valor !== 'string' || this.valor.trim() === '') {
      return 'valor é obrigatório ela nao pode estar vazia';
    }
    return null;
  }

  static validarId(id) {
    const numeroId = Number(id);
    if (!Number.isInteger(numeroId) || numeroId <= 0) {
      return false;
    }
    return true;
  }
}