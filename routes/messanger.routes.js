const { Router } = require('express')
const router = Router()

const User = require('../models/User')

router.get('/getusers', async (req, res) => {
    const users = []
    const dbUsers = await User.find()
    
    dbUsers.forEach(user => users.push({ name: user.name, surname: user.surname, id: user.id, active: false }))

    if (!users) {
        res.status(400).json({ message: 'Извините, пользователи не найдены' })
    }

    res.status(201).json({ users })
})

module.exports = router
