export class Colaborador {
  constructor(id, nome, matricula, turno) {
    this.nome = nome;
    this.matricula = matricula;
    this.turno = turno;
  }

  validar() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      return 'Nome é obrigatório e deve ter pelo menos 3 caracteres';
    }
    if (!this.matricula || typeof this.matricula !== 'string' || this.matricula.trim() === '') {
      return 'Matrícula é obrigatória e não pode estar vazia';
    }
    if (!this.turno || typeof this.turno !== 'string' || this.turno.trim() === '') {
      return 'Turno é obrigatório e não pode estar vazio';
    }
    return null;
  }

  static validarId(id) {
    if (id === null || id === undefined || String(id).trim() === '') {
      return false;
    }
    const numeroId = Number(id);
    return Number.isInteger(numeroId) && numeroId > 0;
  }
}


  
