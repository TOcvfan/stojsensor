import React from 'react';
import CustomizedButtons from './Button';
import Modal from './modal';


export default function LoginKnap({ open, handleOpen, children, knaptext, titel }) {


    return (
        <div className="">
            <CustomizedButtons type='button' onClick={handleOpen}>{knaptext}</CustomizedButtons>
            <Modal titel={titel} open={open} handleOpen={handleOpen} >
                {children}
            </Modal>
        </div>
    );
}