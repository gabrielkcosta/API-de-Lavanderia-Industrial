export class ServicoLavagem {
  constructor(id, nome, patrimonio, valor) {
    this.id = id;
    this.nome = nome;
    this.patrimonio = patrimonio;
    this.valor = valor;
  }

  validar() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      return 'Nome é obrigatório e deve ter pelo menos 3 caracteres';
    }
    if (!this.patrimonio || typeof this.patrimonio !== 'string' || this.patrimonio.trim() === '') {
      return 'Patrimônio é obrigatório e não pode estar vazio';
    }
    if (typeof this.valor !== 'number' || this.valor <= 0) {
      return "A valor não pode ser menor ou igual a zero.";
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