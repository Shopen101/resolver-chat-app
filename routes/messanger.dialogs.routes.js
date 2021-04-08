const { Router } = require('express')
const router = Router()

const Dialogs = require('../models/Dialogs')
const Message = require('../models/Message')

router.post('/createDialog', async (req, res) => {
    try {
        let dialogId = null
        const { authorId, partnerId } = req.body
        const dialogCandidateOne = await Dialogs.find({ author: authorId, partner: partnerId })
        const dialogCandidateTwo = await Dialogs.find({ author: partnerId, partner: authorId })

        if (dialogCandidateOne.length > 0 || dialogCandidateTwo.length > 0) {
            dialogCandidateOne.length > 0
                ? (dialogId = dialogCandidateOne[0].id)
                : (dialogId = dialogCandidateTwo[0].id)

            const dialogsMessages = await Message.find({ dialog: dialogId })
            
            res.status(201).json({ message: 'найден диалог', dialogId, dialogsMessages })
            return
        }

        const Dialog = new Dialogs({ author: authorId, partner: partnerId })
        await Dialog.save()

        res.status(201).json({ message: 'создан диалог', dialogId: Dialog.id, dialogsMessages: [] })
    } catch (error) {
        console.log(`server error - ${error}`)
    }
})

router.post('/sendMsg', async (req, res) => {
    try {
        const { userTextValue, senderId, dialogId } = req.body
        const msg = await new Message({ text: userTextValue, user: senderId, dialog: dialogId })
        await msg.save()

        res.status(201).json({ message: 'отправлено!' })
    } catch (error) {
        res.status(500).json({ message: 'ошибка при отправке!' })
        console.log('errr -' + error)
    }
})

module.exports = router
