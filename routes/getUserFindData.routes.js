const { Router } = require('express')
const router = Router()

const Problems = require('../models/Problems')

router.post('/', async (req, res) => {
    try {
        if (req.body.findInputValue) {
            const usersFindInput = req.body.findInputValue.split(',').map(word => word.trim())
            const sortedArrOfProblems = []
            const allProblems = await Problems.find()

            allProblems.forEach(problem => {
                problem.tags.forEach(tag => {
                    usersFindInput.forEach(word => {
                        tag === word && sortedArrOfProblems.push(problem)
                    })
                })
            })

            if (sortedArrOfProblems.length === 0) {
                res.status(500).json({
                    message:
                        'нет результатов по вашему запросу! Пожалуйста переформулируйте теги или обратитесь за помощью к администраторам.',
                })
            } else {
                res.status(201).json({ problems: sortedArrOfProblems })
            }
        } else {
            res.status(500).json({
                message:
                    'нет результатов по вашему запросу! Пожалуйста переформулируйте теги или обратитесь за помощью к администраторам.',
            })
        }
    } catch (error) {
        console.log(`server error - ${error}`)
    }
})

router.post('/global', async (req, res) => {
    try {
        if (req.body.findInputValue) {
            let usersFindInputs = req.body.findInputValue
            const sortedArrOfProblems = []
            const allProblems = await Problems.find()

            usersFindInputs = usersFindInputs.split(' ').map(word => {
               
                if (
                    word.split('').pop() === ',' ||
                    word.split('').pop() === '.' ||
                    word.split('').pop() === '!' ||
                    word.split('').pop() === '?'
                ) {
                    let newWord = word.split('')
                    newWord.pop()
                    return (word = newWord.join(''))
                } else if (word.length === 0 || word.length === 1 || word.length === 2) {                    
                    return (word = null)
                } else {
                    return word
                }
            })

            allProblems.forEach(problem => {
                usersFindInputs.forEach(word => {
                    if (word !== null) {
                        let regexp = new RegExp(word, 'gmiu')
                        if (problem.text.match(regexp)) {
                            sortedArrOfProblems.push(problem)
                        }
                    }
                })
            })

            allProblems.forEach(problem => {
                problem.tags.forEach(tag => {
                    usersFindInputs.forEach(word => {
                        tag === word && sortedArrOfProblems.push(problem)
                    })
                })
            })

            const setOfArrOfProblems = Array.from(new Set(sortedArrOfProblems))

            if (setOfArrOfProblems.length === 0) {
                res.status(500).json({
                    message:
                        'нет результатов по вашему запросу! Пожалуйста переформулируйте теги или обратитесь за помощью к администраторам.',
                })
            } else {
                res.status(201).json({ problems: setOfArrOfProblems })
            }
        } else {
            res.status(500).json({
                message:
                    'нет результатов по вашему запросу! Пожалуйста переформулируйте теги или обратитесь за помощью к администраторам.',
            })
        }
    } catch (error) {
        console.log(`server error - ${error}`)
    }
})

module.exports = router
