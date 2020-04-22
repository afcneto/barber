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
        }).sort({ createdAt: 'desc' }).limit(20);

        return res.json(notificacoes);
    }

    async update(req,res) {
        const notificacao = await Notificacao.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true },
        );

        return res.json(notificacao);
    }
}

export default new NotificacaoController();