import User from '../models/user';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } }); 

    if (userExists){
      return res.status(400).jason({ error: 'Já existe!'});
    }
    
    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();