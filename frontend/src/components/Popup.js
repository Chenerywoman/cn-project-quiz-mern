import React from 'react'

const Popup = ({closePopup}) => {
    return (
        <div>
            <div>
                <h1>Please complete all questions</h1>
                <button onClick={closePopup}>close</button>
            </div>
        </div>
    )
}

export default Popup
