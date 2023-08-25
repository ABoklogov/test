const userModel = require('./model');

module.exports = {
  getAll: (req, res) => {
    console.log(res.render);
    return res.render('users.hbs', {
      users: userModel.getAll()
    })
  },
  create: (req, res) => {
    try {
      const { age, username } = req.body;

      if (!age || !username) {
        throw new Error('Не указан username или age');
      };

      userModel.create({ age, username });

      return res.redirect('/users');
    } catch (error) {
      return res.render('users-error.hbs', {
        message: error.message
      })
    };
  },
  removeById: (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error('id не указан');
      };

      userModel.removeById({ id });

      return res.render('users.hbs', {
        users: userModel.getAll()
      })
    } catch (error) {
      return res.render('users-error.hbs', {
        message: error.message
      })
    }
  },
}