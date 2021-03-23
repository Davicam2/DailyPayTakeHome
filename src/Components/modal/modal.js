import React from 'react';
import './modal.css'

import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

const Modal = props => {
    let modalPairClass = '';
    const mediaClasses = {
        modalPairBase: 'modal-content-pair',
        modalPairSmall: 'modal-pair-sm'
       
    }

    
    const isSmScreen = useMediaQuery({
    maxDeviceWidth: 600
    })

    if(isSmScreen){
        modalPairClass = `${mediaClasses.modalPairBase} ${mediaClasses.modalPairSmall}`
    } else {
        modalPairClass = `${mediaClasses.modalPairBase}`
    }
if(!props.show){
    return null;
}

return (
    <div className='modal-overlay' onClick={props.onClose}>
        <div className='modal-body'>
            <div className='modal-close' onClick={props.onClose}>X</div>
            <div className='modal-title font-large'>Your Nominations</div>
            <div className='modal-content'>
                { props.nominations.map(nom => (
                    <div className={modalPairClass} key={nom.nomination.id}>
                        <div className='modal-headline'>{nom.category}:</div>
                        <div className='modal-line-item'>{nom.nomination.title}</div>
                    </div>
                   )
                )
                }
            </div>
        </div>

    </div>
);

}

export default Modal;
