import Notificacao from '../schemas/Notificacao';
import User from '../models/user';

class NotificacaoController {
    async index(req,res) {
        /**
         * Verificar se o usuário é um provedor
         */
        const isProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'Só os provedores visualizam as notificações.'})
        }

        const notificacoes = await Notificacao.find({
            user: req.userId, /** usuário logado */
        }).sort('createdAt');

        return res.json(notificacoes);
    }
}

export default new NotificacaoController();