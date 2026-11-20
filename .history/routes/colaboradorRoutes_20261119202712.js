import { Router } from 'express';
import * as equipamentoController from '../controllers/EquipamentoController.js';

const router = Router();

router.post('/equipamento', equipamentoController.criarEquipamento);
router.get('/equipamento', equipamentoController.listarEquipamento);
router.get('/equipamento/:id', equipamentoController.buscarEquipamento);
router.put('/equipamento/:id', equipamentoController.atualizarEquipamento);
router.delete('/equipamento/:id', equipamentoController.excluirEquipamento);