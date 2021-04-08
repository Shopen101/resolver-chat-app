import React, { useEffect, useState, useRef } from 'react'
import { Ava, CircLoader, MemoText, SendBtn, UploadBtn } from '../components'
import { useSnackbar } from 'notistack'
import { Howl, Howler } from 'howler'

import errMp3 from '../sound/error.mp3'
import warningMp3 from '../sound/warning.mp3'
import snackMp3 from '../sound/snack.mp3'
import outGoingMp3 from '../sound/outgoing.mp3'

import { useDispatch, useSelector } from 'react-redux'
import { setUsers, setActiveDialog, setMsg, setMyNewMsg, addPartnerMessage } from '../redux/action'

import { api } from '../config/index'
import socket from '../SocketConfig/Socket'

function Messanger() {
    const { enqueueSnackbar } = useSnackbar()

    const dispatch = useDispatch()
    const users = useSelector(({ messanger }) => messanger.users)
    const myId = useSelector(({ user }) => user.userId)
    const messages = useSelector(({ messanger }) => messanger.messages)
    const activeDialog = useSelector(({ messanger }) => messanger.activeDialog)
    const activeUser = useSelector(({ messanger }) => messanger.activeUser)

    const messagesRef = useRef(null)

    const { firstName, lastname } = useSelector(({ user }) => user)
    const myName = firstName + ' ' + lastname

    const [userTextValue, setUserTextValue] = useState('')

    const errSound = new Howl({
        src: errMp3
    })

    const warningSound = new Howl({
        src: warningMp3
    })

    const snackSound = new Howl({
        src: snackMp3
    })

    const outSound = new Howl({
        src: outGoingMp3
    })

    Howler.volume(0.5)
    let randomId = 10 + Math.random()

    const findUsers = async () => {
        try {
            await api.get('messanger/getusers')
                .then(resp => dispatch(setUsers(resp.data.users, null)))
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const snackBarHandler = (text) => {
        enqueueSnackbar(text)
    }

    const changeUser = async id => {
        let activeUser = null

        const activeUsers = users.map(user => {
            if (user.id === id) {
                user.active = true
                activeUser = user.id

            } else {
                user.active = false
            }

            return user
        })

        dispatch(setUsers(activeUsers, activeUser))

        try {
            await api.post('messangerMove/createDialog', {
                authorId: myId,
                partnerId: id
            })
                .then(response => {
                    dispatch(setActiveDialog(response.data.dialogId))
                    const dialogsMessages = response.data.dialogsMessages

                    dispatch(setMsg(dialogsMessages))
                })

        } catch (error) {
            console.log(error)
        }
    }

    const sendMsgClick = async () => {
        try {
            if (!!activeDialog === true) {
                if (userTextValue.trim() === '') {
                    enqueueSnackbar('Для отправки сообщения необходимо ввести текст!', { variant: 'warning' })
                    warningSound.play()
                } else {
                    await api.post('messangerMove/sendMsg', { userTextValue, senderId: myId, dialogId: activeDialog })
                    setUserTextValue('')
                    dispatch(setMyNewMsg({ id: randomId, text: userTextValue, user: myId, dialog: activeDialog, data_time: new Date(), activeUser }))

                    socket.emit('NEW_MESSAGE', {
                        id: randomId,
                        text: userTextValue,
                        user: myId,
                        dialog: activeDialog,
                        data_time: new Date(),
                        activeUser,
                        myName
                    })

                    outSound.play()
                }
            } else {
                enqueueSnackbar('Нужно выбрать диалог для отправки сообщений!', { variant: 'error' });
                errSound.play()
                return
            }

        } catch (error) {
            console.log(error)
        }
    }

    const changeText = e => {
        setUserTextValue(e.target.value)
    }

    useEffect(() => {
        findUsers()
    }, [])

    useEffect(() => {
        messagesRef.current.scroll(0, messagesRef.current.scrollHeight)
    }, [messages])

    useEffect(() => {
        socket.on('NEW_MESSAGE', message => {
            if (message.dialog === activeDialog && message.user !== myId) {
                dispatch(addPartnerMessage(message))
            } else if (myId === message.activeUser) {
                snackBarHandler(`Новое сообщение от: ${message.myName}`)
                snackSound.play()
            } else {
                return
            }
        })

        return function cleanup() {
            socket.removeAllListeners('NEW_MESSAGE')
        }
    }, [activeDialog])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMsgClick()
        }
    }

    const onUpLoadBtnClick = () => {
        console.log('click was')
    }

    return (
        <div className="msg__container">
            <div className="messanger">
                <div className="messanger__dialogs">
                    {
                        users.length > 0 ?
                            users.map((user, index) => {
                                return (
                                    <div className={`dialog ${user.active ? 'activeDialog' : ''}`}
                                        onClick={() => changeUser(user.id)}
                                        key={`${user}__${index}`}
                                        id={user.id}
                                    >
                                        <Ava userName={user.name.split('')[0]} />
                                        <p className="username">{user.name} {user.surname}</p>
                                    </div>
                                )
                            })
                            : <div className="circleCenter">
                                <CircLoader />
                            </div>
                    }

                </div>
                <div className="messanger__text">
                    <div ref={messagesRef} className="messanger__scroll__block">
                        {
                            !messages.length > 0
                                ?
                                <>
                                    <div className="centerMsg" >
                                        <h2>{!!activeDialog ? 'Нет пока сообщений' : 'Диалог не выбран'}</h2>
                                        <div className="picture">
                                            <svg id="Capa_1" enable-background="new 0 0 497 497" height="200" viewBox="0 0 497 497" width="200" xmlns="http://www.w3.org/2000/svg"><g><path d="m165.667 0v331.333c91.495 0 165.667-74.171 165.667-165.667-.001-91.495-74.172-165.666-165.667-165.666z" fill="#acd2f6" /><path d="m301.334 165.667c0-91.496-60.74-165.667-135.667-165.667-91.495 0-165.667 74.171-165.667 165.667 0 43.929 17.104 83.858 45.008 113.508-5.722 15.406-16.048 28.573-29.311 37.823-5.635 3.93-3.461 12.656 3.346 13.59 3.582.491 7.24.746 10.957.746 20.988 0 40.083-8.086 54.354-21.307 24.022 13.56 51.761 21.307 81.313 21.307 74.927-.001 135.667-74.172 135.667-165.667z" fill="#c4f3ff" /><path d="m451.992 444.841c27.904-29.65 45.008-69.579 45.008-113.508 0-91.495-74.171-165.667-165.667-165.667v331.334c29.552 0 57.291-7.747 81.313-21.307 14.271 13.221 33.367 21.307 54.354 21.307 3.717 0 7.375-.254 10.957-.746 6.807-.934 8.981-9.66 3.346-13.59-13.263-9.25-23.589-22.417-29.311-37.823z" fill="#7d8fe5" /><path d="m331.333 165.667c-91.495 0-165.666 74.171-165.666 165.667s74.171 165.666 165.666 165.666c74.927 0 135.667-74.171 135.667-165.667s-60.74-165.666-135.667-165.666z" fill="#95b0ed" /><g fill="#4e4cd3"><path d="m377.409 383.833c-28.948 0-52.5-23.551-52.5-52.5s23.552-52.5 52.5-52.5 52.5 23.551 52.5 52.5-23.551 52.5-52.5 52.5zm0-90c-20.678 0-37.5 16.822-37.5 37.5s16.822 37.5 37.5 37.5 37.5-16.822 37.5-37.5-16.822-37.5-37.5-37.5z" /><path d="m302.41 383.834c-2.418 0-4.746-1.172-6.173-3.239l-48.479-70.203v65.941c0 4.142-3.357 7.5-7.5 7.5s-7.5-3.358-7.5-7.5v-90c0-3.282 2.135-6.183 5.268-7.16 3.137-.975 6.539.197 8.404 2.898l48.479 70.203v-65.941c0-4.142 3.357-7.5 7.5-7.5s7.5 3.358 7.5 7.5v90c0 3.282-2.135 6.183-5.268 7.16-.737.23-1.488.341-2.231.341z" /></g></g></svg>
                                        </div>
                                    </div>
                                </>
                                : messages.map((msg, index) => {
                                    if (msg.user === myId) {
                                        return (
                                            <div className="message myMsg" key={`${index}__${msg.id}`} >
                                                <p className="message__text--paragraph">{msg.text}</p>
                                                <span className="timeMsg">{new Date(msg.data_time).toLocaleDateString()} <span className="verticalLine"> | </span> {new Date(msg.data_time).toLocaleTimeString().slice(0, -3)}</span>
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div className="message" key={`${index}__${msg.id}`} >
                                                <p className="message__text--paragraph">{msg.text}</p>
                                                <span className="timeMsg">{new Date(msg.data_time).toLocaleDateString()} <span className="verticalLine"> | </span> {new Date(msg.data_time).toLocaleTimeString().slice(0, -3)}</span>
                                            </div>
                                        )
                                    }
                                })
                        }
                    </div>
                    <div className="messanger__btn">
                        <MemoText width={630} userTextValue={userTextValue} onChange={changeText} onKeyPress={handleKeyPress} />
                        <div className="buttons">
                            <UploadBtn onClick={onUpLoadBtnClick} />
                            <SendBtn onClick={sendMsgClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messanger
