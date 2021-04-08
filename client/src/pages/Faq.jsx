import React, { useEffect, useState } from 'react'

import { CSSTransition } from 'react-transition-group'
import { Howl, Howler } from 'howler'

import snackMp3 from '../sound/snack.mp3'
import errMp3 from '../sound/error.mp3'

import { ControlledAccordions, InputFindField, FindBtn, BackDropSolve } from '../components'
import { api } from '../config';

function Faq() {
    const [accordionData, setAccordionData] = useState(null)
    const [isLoadData, setIsLoadData] = useState(null)
    const [isFind, setIsFind] = useState(false)
    const [isErrMsg, setIsErrMsg] = useState(null)
    const [findInputValue, setFindInputValue] = useState('')
    const [findGlobalInputValue, setFindGlobalInputValue] = useState('')

    useEffect(() => {
        addAccordion()
    }, [])

    const snackSound = new Howl({
        src: snackMp3
    })

    const errSound = new Howl({
        src: errMp3
    })

    const changeFinInputHandler = e => {
        setFindInputValue(e.target.value)
    }

    const changeFinFlobalInputHandler = e => {
        setFindGlobalInputValue(e.target.value)
    }

    Howler.volume(0.5)

    const addAccordion = async () => {
        try {
            await api.get('getAccordion')
                .then((response) => setAccordionData(response.data))
        } catch (err) {
            console.log(err)
        }
    }

    const handleOutsideClick = e => {
        if (e.target.classList.contains('backBlack')) {
            setIsFind(false)
            setIsErrMsg(null)
            setIsLoadData(null)
            document.querySelector('body').style.overflow = 'auto'
        }
    }

    const handleAlert = async () => {
        try {
            setIsFind(true)
            const serverAns = await api.post('getUserFindData', { findInputValue })
            setIsLoadData(serverAns.data.problems)
            document.querySelector('body').style.overflow = 'hidden'
            snackSound.play()
        } catch (err) {
            setIsErrMsg(err.response.data.message)
            document.querySelector('body').style.overflow = 'hidden'
            errSound.play()
        }
    }
    
    const handleGlobalFind = async () => {
        try {
            setIsFind(true)
            const serverAns = await api.post('getUserFindData/global', { findInputValue: findGlobalInputValue })
            setIsLoadData(serverAns.data.problems)
            document.querySelector('body').style.overflow = 'hidden'
            snackSound.play()
        } catch (err) {
            setIsErrMsg(err.response.data.message)
            document.querySelector('body').style.overflow = 'hidden'
            errSound.play()
        }
    }

    const handleGlobalKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleGlobalFind()
        }
    }

    const handleTagsKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAlert()
        }
    }


    return (
        <div>
            <h2>Ответы на часто задаваемые вопросы</h2>
            <div className="find__img">
                <svg id="Capa_1" enableBackground="new 0 0 512 512" height={200} viewBox="0 0 512 512" width={200} xmlns="http://www.w3.org/2000/svg"><g><path d="m477.837 71.811c-3.76-6.972-11.127-11.712-19.604-11.712-11.632 0-261.507 0-282.858 0l-27.544-46.19h-15.461l-.02-.039c-2.88-5.505-8.58-8.956-14.793-8.956h-100.861c-9.221.001-16.696 7.476-16.696 16.697v66.896l11.847 14.453v279.909c3.108 1.649 6.65 2.592 10.414 2.592h477.892v-313.65z" fill="#fea613" /><path d="m500.153 385.461v-221.706l11.847-14.499c0-36.585 0-63.546 0-66.896 0-12.295-9.966-22.261-22.261-22.261h-31.506c12.295 0 22.261 9.966 22.261 22.261v303.101z" fill="#fe9901" /><path d="m132.35 13.87 24.189 46.229h31.506l-24.189-46.229c-2.88-5.505-8.58-8.956-14.793-8.956h-31.505c6.212.001 11.912 3.451 14.792 8.956z" fill="#fe9901" /><path d="m179.28 126.995-26.479-48.217h-21.676c-3.107-4.334-8.14-6.967-13.566-6.967h-100.863c-9.221 0-16.696 7.475-16.696 16.696v303.729c0 12.295 9.966 22.261 22.261 22.261h435.973c5.576 0 10.661-2.065 14.567-5.453h19.427v-276.32h-19.124c-3.944-3.549-9.145-5.728-14.868-5.728z" fill="#fec165" /><path d="m489.739 126.995h-31.506c12.294 0 22.261 9.966 22.261 22.261v242.979c0 12.295-9.966 22.261-22.261 22.261h31.506c12.294 0 22.261-9.966 22.261-22.261v-242.979c0-12.295-9.966-22.261-22.261-22.261z" fill="#fdb441" /><path d="m132.35 80.766 24.189 46.229h31.506l-24.189-46.229c-2.88-5.505-8.58-8.956-14.793-8.956h-31.506c6.213.001 11.913 3.451 14.793 8.956z" fill="#fdb441" /><path d="m428.512 503.623 21.162-5.014 15.968-27.815-189.899-191.444-36.297 36.297c-.281.281-.281.737 0 1.018 195.622 195.622 182.818 183.742 189.066 186.958z" fill="#60b7ff" /><path d="m464.964 453.66-181.256-181.256c-.281-.281-.737-.281-1.018 0l-13.812 13.812 167.444 167.444c12.223 12.222 12.223 32.039 0 44.262-2.357 2.357-4.998 4.254-7.81 5.702 11.774 6.061 26.586 4.164 36.452-5.702 12.222-12.223 12.222-32.04 0-44.262z" fill="#26a6fe" /><path d="m179.82 212.778c-50.001 50.001-50.001 131.07 0 181.071 24.477 24.477 56.398 36.963 88.475 37.476 32.077-.513 63.999-13 88.475-37.476 50.001-50.001 50.001-131.07 0-181.071-49.29-49.29-127.065-49.886-176.95 0z" fill="#0055a3" /><path d="m360.891 212.778c-28.649-28.649-67.497-40.875-104.856-36.694 105.541 11.811 152.425 141.555 76.214 217.765-21.352 21.352-48.37 33.578-76.214 36.694 37.359 4.181 76.207-8.045 104.856-36.694 50.001-50.002 50.001-131.07 0-181.071z" fill="#004281" /><path d="m207.986 240.944c-34.39 34.39-34.39 90.347 0 124.738 16.672 16.672 38.413 25.237 60.308 25.744 77.328-1.791 115.022-95.767 60.308-150.481-33.609-33.61-86.326-34.29-120.616-.001z" fill="#d8ecfe" /><path d="m332.724 240.944c-20.843-20.843-49.605-29.03-76.69-24.608 70.623 11.53 98.744 98.65 48.048 149.345-13.547 13.547-30.444 21.734-48.048 24.608 27.085 4.422 55.847-3.765 76.69-24.608 34.39-34.389 34.391-90.346 0-124.737z" fill="#b3dafe" /></g></svg>
            </div>
            <div className="finder__align">
                <div className="finder__align_labels">
                    <h4>Глобальный поиск:</h4>
                    <h4>Поиск по тегам:</h4>
                </div>
                <div className="finder">
                    <div className="finder__parts">
                        <InputFindField width={850} onChange={changeFinFlobalInputHandler} value={findGlobalInputValue} onKeyPress={handleGlobalKeyPress} />
                        <FindBtn onClick={handleGlobalFind} />
                        <CSSTransition
                            in={isFind}
                            classNames='backBlack'
                            timeout={300}
                            mountOnEnter
                            unmountOnExit
                        >
                            <BackDropSolve onClick={handleOutsideClick} isLoadData={isLoadData} isErrMsg={isErrMsg} />
                        </CSSTransition>
                    </div>
                    <div className="finder__parts">
                        <InputFindField width={850} onChange={changeFinInputHandler} value={findInputValue} onKeyPress={handleTagsKeyPress} />
                        <FindBtn onClick={handleAlert} />
                        <CSSTransition
                            in={isFind}
                            classNames='backBlack'
                            timeout={300}
                            mountOnEnter
                            unmountOnExit
                        >
                            <BackDropSolve onClick={handleOutsideClick} isLoadData={isLoadData} isErrMsg={isErrMsg} />
                        </CSSTransition>
                    </div>
                </div>
            </div>
            <ControlledAccordions accordionData={accordionData} />
        </div>
    )
}

export default Faq
