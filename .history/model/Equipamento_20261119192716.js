export class Equipamento {
    constructor(id, nome, descricao, status) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.status = status;
    }

    validar() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      return 'Nome é obrigatório e deve ter pelo menos 3 caracteres';
    }
    if (!this.descricao || typeof this.descricao !== 'string' || this.descricao.trim() === '') {
      return 'descricao é obrigatória ela nao pode estar vazia';
    }
    if (!this.status || typeof this.status !== 'string' || this.status.trim() === '') {
      return 'status é obrigatório ela nao pode estar vazia';
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