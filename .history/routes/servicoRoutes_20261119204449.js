import { Router } from 'express';
import {
  cadastrarServico,
  listarServicos,
  buscarServicoPorId,
  atualizarServicoParcial,
  excluirServicoPorId,
} from '../controllers/servicoController.js';

const router = Router();

router.post('/', cadastrarServico);
router.get('/', listarServicos);
router.get('/:id', buscarServicoPorId);
router.patch('/:id', atualizarServicoParcial);
router.delete('/:id', excluirServicoPorId);

export default router;