import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format } from 'date-fns';
import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';

class DisponivelController {
    async index(req, res){
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Data inválida.' });
        }

        const buscaData = Number(date);

        /**const agendaDia = await Agendamento.findAll({
            where: {
                provider_id: req.params.providerId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(buscaData), endOfDay(buscaData)],
                },
            },
        });*/

        const agendaDia = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
        ];

        const disponivel = agendaDia.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(
                setMinutes(setHours(buscaData, hour), minute),
            0
            );

            return {
                time, 
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
            }
        });

        return res.json(disponivel);
    }
}

export default new DisponivelController();