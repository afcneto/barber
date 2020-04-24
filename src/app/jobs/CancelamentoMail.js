import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/mail';

class CancelamentoMail {
    get key() {
        return 'CancelamentoMail';
    }

    async handle({ data }) {
        const { agendamento } = data;

        await Mail.sendMail({
            to: `${agendamento.provider.name} <${agendamento.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancelamento',
            context: {
                provider: agendamento.provider.name,
                user: agendamento.user.name,
                data: format(
                    parseISO(agendamento.date),
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    { locale: pt }
                )
            }
        });
    }
}

export default new CancelamentoMail();