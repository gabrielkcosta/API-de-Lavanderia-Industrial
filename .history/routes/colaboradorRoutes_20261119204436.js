import { Router } from 'express';
import {
  cadastrarColaborador,
  listarColaboradores,
  buscarColaboradorPorId,
  atualizarColaboradorParcial,
  excluirColaboradorPorId,
} from '../controllers/colaboradorController.js';

const router = Router();

router.post('/', cadastrarColaborador);
router.get('/', listarColaboradores);
router.get('/:id', buscarColaboradorPorId);
router.patch('/:id', atualizarColaboradorParcial);
router.delete('/:id', excluirColaboradorPorId);

export default router;