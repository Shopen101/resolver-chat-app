import React, { useState } from 'react'
import { InputAdd, MemoProblem, SendBtn } from '../components'
import { useSelector } from 'react-redux'

import { Howl, Howler } from 'howler'

import { api } from '../config';
import { SnackBar, SnackBarSuccess } from '../components'
import { Snackbar } from '@material-ui/core';

import errMp3 from '../sound/error.mp3'
import snackWav from '../sound/snack.wav'

function CreateAnswer() {
    const userId = useSelector(({ user }) => user.userId)

    const [form, setForm] = useState({
        tag: '',
        text: '',
        header: ''
    })

    const [tagErr, setTagErr] = useState(false)
    const [textErr, setTextErr] = useState(false)
    const [headerErr, setHeaderErr] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [succMsg, setSuccMsg] = useState('')

    Howler.volume(0.5)
    
    const errSound = new Howl({
        src: errMp3
    })

    const snackSound = new Howl({
        src: snackWav
    })

    const changeHandler = event => {
        setErrMsg('')
        setSuccMsg('')
        setForm({ ...form, [event.target.name]: event.target.value })
        event.target.name === 'tag' && event.target.value.length < 2 ? setTagErr(true) : setTagErr(false)
        event.target.name === 'text' && event.target.value.length < 8 ? setTextErr(true) : setTextErr(false)
        event.target.name === 'header' && event.target.value.length < 2 ? setHeaderErr(true) : setHeaderErr(false)
    }

    React.useEffect(() => {
        errMsg  !== '' && errSound.play()
    }, [headerErr, errSound])

    const sendNewAns = async () => {
        try {
            setErrMsg('')
            setSuccMsg('')
            if (form.tag.length < 2 || form.header.length < 2 || form.text.length < 8) {
                setErrMsg('Введены неверные значения!')
                setTimeout(() => {
                    setErrMsg('')
                    setSuccMsg('')
                }, 4000);
                return
            }

            await api.post('addNewTxt', { ...form, userId })
                .then(() => setSuccMsg('Данные добавлены!'))
                .then(() => setForm({
                    tag: '',
                    text: '',
                    header: ''
                }))
            snackSound.play()

        } catch (err) {
            setErrMsg(err.response.data.message)
            
        }
    }

    return (
        <div>
            <h2>Добавить новый ответ на вопрос</h2>
            <div className="inputs">
                <InputAdd
                    value={form.header}
                    autoFocus
                    required
                    width={800}
                    label={'Введите заголовок'}
                    onChange={changeHandler}
                    name='header'
                    error={headerErr}
                    helperText={headerErr && 'минимальная длнна 2 символа!'}
                />
                <InputAdd
                    value={form.tag}
                    autoFocus
                    required
                    width={800}
                    label={'Введите теги через запятую'}
                    onChange={changeHandler}
                    name='tag'
                    error={tagErr}
                    helperText={tagErr && 'минимальная длнна 2 символа!'}
                />
                <MemoProblem
                    value={form.text}
                    required
                    width={800}
                    onChange={changeHandler}
                    name='text'
                    error={textErr}
                    helperText={textErr && 'минимальная длнна 8 символов!'}
                />
                <SendBtn onClick={sendNewAns} />
            </div>
            {errMsg && <SnackBar messageErr={errMsg} />}
            {succMsg && <SnackBarSuccess message={succMsg} />}
            <Snackbar />
        </div>
    )
}

export default CreateAnswer
