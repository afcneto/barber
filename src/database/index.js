import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/user';
import File from '../app/models/File';
import Agendamento from '../app/models/Agendamento';
import Horario from '../app/models/Horario';
import databaseConfig from '../config/database';

const models = [User, File, Agendamento, Horario];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mongoConnrction = mongoose.connect (
            process.env.MONGO_URL,
            { useNewUrlParser: true, useFindAndModify: true },
        )
    }
}

export default new Database();
