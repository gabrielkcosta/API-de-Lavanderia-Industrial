import { Router } from 'express';
import {
  cadastrarEquipamento,
  listarEquipamentos,
  buscarEquipamentoPorId,
  atualizarEquipamentoParcial,
  excluirEquipamentoPorId,
} from '../controller/equipamentoController.js';

const router = Router();

router.post('/', cadastrarEquipamento);
router.get('/', listarEquipamentos);
router.get('/:id', buscarEquipamentoPorId);
router.patch('/:id', atualizarEquipamentoParcial);
router.delete('/:id', excluirEquipamentoPorId);

export default router;