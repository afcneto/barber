import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        passado: {
          type: Sequelize.VIRTUAL,
          get(){            
            return isBefore(this.date, new Date());
          }
        },
        cancelavel: {
          type: Sequelize.VIRTUAL,
          get(){
            return isBefore(new Date(), subHours(this.date, 2));/** até 2 horas antes pode ser cancelado */
          }
        }
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Agendamento;
