import jwt from 'jsonwebtoken';

import User from '../models/user';

class SessionController {
  async store(req, res) {
    const {email, password} = req.body;

      user = await User.findOne({ where: {emeil}});

    if (!user){
      return res.status(401).json({ error: 'Usuário não encontrado.'});
    }

    if (!(await user.checkPassword(password))){
      return res.status(401).json({ where: 'Senha incorreta.'});
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, 'ed216f26b9b66b9aaadbf798a26044df',{
        expiresIn: '7d',
      } ),
    })
  }
}

export default new SessionController();