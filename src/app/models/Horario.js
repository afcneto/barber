import Sequelize, { Model } from 'sequelize';

class Horario extends Model {
  static init(sequelize) {
    super.init(
      {
        horario: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Horario;
