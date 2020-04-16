import User from '../models/user';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: [ 'id', 'name', 'email', 'avatar_id' ],
      include: [File],
    });

    return res.json(providers);
  }
}

export default new ProviderController();