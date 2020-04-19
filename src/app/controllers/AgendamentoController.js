import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Agendamento from '../models/Agendamento';
import File from '../models/File';
import User from '../models/user';
import Notificacao from '../schemas/Notificacao';

class AgendamentoController {
    async index(req,res) {
        const { page  = 1 } = req.query;

        const agendamentos = await Agendamento.findAll({
            where: { user_id: req.userId, canceled_at: null },
            attributes: ['id', 'date'],
            limit: 20,
            offset: ( page - 1 ) * 20,
            order: ['date'],
            include: [
                {
                  model: User,
                  as: 'provider',
                  attributes: ['id', 'name'],
                  include: [
                      {
                          model: File,
                          as: 'avatar',
                          attributes: ['id', 'path', 'url'],
                      }
                  ]
                },
            ],
        });

        return res.json(agendamentos);
    }

  async store(req, res) {
    const schema = Yup.object().shape({
        provider_id: Yup.number().required(),
        date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Erro na validação.' });
    }

    const { provider_id, date } = req.body;

    /**
     * Verificar se provider_id é um provedor
     */
    const isProvider = await User.findOne({
        where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
        return res.status(401).json({ error: 'Voce só pode criar agendamentos com provedores.'})
    }

    const hourStart = startOfHour(parseISO(date));

    /**
     * Verifica se a data do agentdamento é anterior a data atual
     */
    if (isBefore(hourStart, new Date())) {
        return res.status(400).json({ error: 'Não são permitidas horas retroativas'});
    }

    /**
     * Verifica se o prestador já não tem serviço marcado pro mesmo horário
     */
    const agendamentoPssibilidade =  await Agendamento.findOne({
        where: {
            provider_id,
            canceled_at: null,
            date: hourStart,
        },
    });

    if (agendamentoPssibilidade) {
        return res.status(400).json({ error: 'Horário não disponível.'})
    }

    const agendamento = await Agendamento.create({
        user_id: req.userId,
        provider_id,
        date: hourStart,
    });

    /**
     * Notificar Prestador
     */
    const user = await User.findByPk(req.userId);
    const formattedDate = format(
        hourStart,
        "'dia' dd 'de' MMMM', às' H:mm'h'",
        { locale: pt }
    );

    await Notificacao.create({
       content: `Novo agendamento de ${user.name} para ${formattedDate}.`
       , 
       user: provider_id, /** Usuário(prestador) que vai receber a notificação */
    });


    return res.json(agendamento);
  }
}

export default new AgendamentoController();
