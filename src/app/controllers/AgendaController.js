import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';
import User from '../models/user';

class AgendaController {
    async index(req,res){
        const checkUserProdiver = await User.findOne({
            where: { id: req.userId, provider:true },
        });

        if (!checkUserProdiver) {
            return res.status(401).json({ error: 'Usuário não é um provedor.' });
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);

        const agendamentos = await Agendamento.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate)
                    ]
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name'],
                    }
                ]
            },
            order: ['date'],
        });

        return res.json(agendamentos);
    }
}

export default new AgendaController();
