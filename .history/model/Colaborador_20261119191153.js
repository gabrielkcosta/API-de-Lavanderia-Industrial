export class Colaborador {
  constructor(id, nome, matricula, turno) {
    this.id = id;
    this.nome = nome;
    this.matricula = matricula;
    this.turno = turno;
  }
}

validar() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
        return ('Nome é obrigatório e deve ter pelo menos 3 caracteres');
    }
    if (!this.matricula || typeof this.matricula !== 'string' || this.matricula.trim() === '') {
        return ('Matrícula é obrigatória ela nao pode estar vazia');
    }
    if (!this.turno || typeof this.turno !== 'string' || this.turno.trim() === '') {
        return ('Turno é obrigatório ela nao pode estar vazia');
    }

    static validarID(id) {
        if (!id || typeof id !== 'number' || id <= 0) {
            return ('ID inválido. Deve ser um número positivo.');
        }
}