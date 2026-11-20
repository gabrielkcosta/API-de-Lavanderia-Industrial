import { Router } from 'express';
import * as equipamentoController from '../controllers/EquipamentoController.js';

const router = Router();

router.post('/colaborador', colaboradorController.criarColaborador);
router.get('/colaborador', colaboradorController.listarColaboradores);
router.get('/colaborador/:id', colaboradorController.buscarColaborador);
router.put('/colaborador/:id', colaboradorController.atualizarColaborador);
router.delete('/colaborador/:id', colaboradorController.excluirColaborador);