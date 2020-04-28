import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter } from 'date-fns';
import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';
import Horario from '../models/Horario';

class DisponivelController {
    async index(req, res){
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Data inválida.' });
        }

        const buscaData = Number(date);

        const agendamentos = await Agendamento.finddAll({
            where: {
                provider_id: req.params.providerId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(buscaData), endOfDay(buscaData)],
                },
            },
        });

        const agendaDia = await Horario.findAll({ 
            attributes: ['horario'] 
        }).then(horarios => horarios.map(horario => horario.horario));
                
        const disponivel = agendaDia.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(
                setMinutes(setHours(buscaData, hour), minute),
            0
            );

            return {
                time, 
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                disponivel: 
                    isAfter(value, new Date()) &&
                    !agendamentos.find(a => 
                        format(a.date, 'HH:mm') === time)
            }
        });

        return res.json(disponivel);
    }
}

export default new DisponivelController();