import express from 'express';
import dotenv from 'dotenv';
import servicoRoutes from './routes/servicoRoutes.js';
import equipamentoRoutes from './routes/equipamentoRoutes.js';
import colaboradorRoutes from './routes/colaboradorRoutes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use('/servicos', servicoRoutes);
app.use('/equipamentos', equipamentoRoutes);
app.use('/colaboradores', colaboradorRoutes);

app.use((req, res) => {
  return res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});