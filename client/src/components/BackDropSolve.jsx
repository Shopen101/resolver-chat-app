import React from 'react'
import CirclLoader from './CircLoader'
import { ControlledAccordions } from '../components'

function BackDropSolve({ onClick, isLoadData, isErrMsg }) {

    if (isErrMsg) {
        return (
            <div
                className='backBlack'
                onClick={onClick}
            >
                <div className="text__block">
                    <h2>Результат по вашему запросу</h2>
                    <hr />
                    <div className="alltext">
                        <p>{isErrMsg}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className='backBlack'
            onClick={onClick}
        >
            <div className="text__block">
                <h2>Результат по вашему запросу</h2>
                <hr />
                <div className="alltext">
                    {
                        !isLoadData ? <CirclLoader /> : <ControlledAccordions accordionData={isLoadData} />
                    }
                </div>
            </div>
        </div>
    )
}

export default BackDropSolve
