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
    if (!this.matricula || typeof this.matricula !== 'string' || this.matricula.trim() === '') {
      return 'Matrícula é obrigatória ela nao pode estar vazia';
    }
    if (!this.turno || typeof this.turno !== 'string' || this.turno.trim() === '') {
      return 'Turno é obrigatório ela nao pode estar vazia';
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