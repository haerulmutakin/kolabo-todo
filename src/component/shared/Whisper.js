import React from 'react';

const Whisper = ({children, backdrop = false, onClose}) => {
    const outerClass = backdrop ? 'backdrop' : '';
    return (
        <div className="kol-whisper">
            <div className="kol-whisper-inner">{children}</div>
            <div className={"kol-whisper-outer " + outerClass} onClick={onClose}></div>
        </div>
    )
}

export default Whisper;