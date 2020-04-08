/* import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', (req, res) => {
    const user = await User.create({
        name: 'Aderson Neto',
        email: 'afcneto@outlook.com',
        password_hash: '123456',
    });

    return res.json(user);
});
module.exports = routes; */
