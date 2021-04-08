const { Router } = require('express')
const router = Router()

const Problems = require('../models/Problems')

router.get('/', async (req, res) => {
    try {
        const listOfProblems = await Problems.find()
        res.status(201).json(listOfProblems)
    } catch (error) {
        res.status(500).json({ message: 'что-то не так...' })
    }
})

module.exports = router
