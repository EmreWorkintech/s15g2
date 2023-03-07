const bcrypt = require('bcryptjs')

const router = require('express').Router()
const User = require('../users/users-model.js')


router.post('/register', (req, res, next) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  User.add(user)
    .then(saved => {
      res.status(201).json({ message: `Merhaba, ${saved.username}` })
    })
    .catch(next)
})

router.post('/login', (req, res, next) => {
  let { username, password } = req.body

  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Merhaba ${user.username}...` })
      } else {
        next({ status: 401, message: 'Geçersiz bilgiler!..' })
      }
    })
    .catch(next)
})

module.exports = router
