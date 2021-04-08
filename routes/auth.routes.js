const { Router } = require('express')
const router = Router()

//plugins
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

//models
const User = require('../models/User')

// /api/auth
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации',
                })
            }

            const { email, password, name, surname } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword, name, surname })

            await user.save()

            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
                expiresIn: '1h',
            })

            res.status(201).json({ message: 'Пользователь создан!', token: token, userId: user.id })
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    },
)

router.post(
    '/login',
    [
        check('email', 'Некорректный email').isEmail().normalizeEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему',
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль попробуйте снова' })
            }

            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
                expiresIn: '1h',
            })

            res.json({
                token,
                userId: user.id,
                name: user.name,
                surname: user.surname,
                isAdmin: user.isAdmin,
            })
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    },
)

module.exports = router
