import User from '../models/user';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } }); 

    if (userExists){
      return res.status(400).json({ error: 'Já existe!'});
    }
    
    const user = User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new UserController();