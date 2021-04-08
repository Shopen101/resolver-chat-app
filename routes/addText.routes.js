const { Router } = require('express')
const router = Router()
const Problem = require('../models/Problems')
const User = require('../models/User')

router.post('/', async (req, res) => {
    try {
        const { tag, text, userId, header } = req.body
        const candidate = await User.findById({ _id: userId })
        
        if (candidate.isAdmin) {
            const newAs = new Problem({
                tags: tag.split(','),
                owner: userId,
                text,
                header,
            })

            await newAs.save()

            res.status(201).json({ message: 'Решение успешно добавлено!' })
        } else {
            res.status(500).json({ message: 'Вы не являетесь администратором приложения!' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router
