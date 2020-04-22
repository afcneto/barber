import { Router } from 'express';
import multer from 'multer';
import multerconfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import authMiddleware from './app/middlewares/auth';
import AgendamentoController from './app/controllers/AgendamentoController';
import AgendaController from './app/controllers/AgendaController';
import NotificacaoController from './app/controllers/NotificacaoController';

const routes = new Router();
const upload = multer(multerconfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/agendamentos', AgendamentoController.index);
routes.post('/agendamentos', AgendamentoController.store);
routes.delete('/agendamentos/:id', AgendamentoController.delete);

routes.get('/agenda', AgendaController.index);

routes.get('/notificacoes', NotificacaoController.index);
routes.put('/notificacoes/:id', NotificacaoController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
