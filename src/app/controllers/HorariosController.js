import Horario from '../models/Horario';

class HorariosController {
  async index(req, res) {
    const horarios = await Horario.findAll({ 
      attributes: ['horario'],
      order: 'horario',
    });

    return res.json(horarios);
  }
}

export default new HorariosController();