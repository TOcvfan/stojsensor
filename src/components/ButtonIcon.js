import React from 'react';
import Button from '@mui/material/Button';

export default function ButtonIcon({ children, disabled, type, onClick }) {
    return (
        <div>
            <Button variant="text" type={type} disabled={disabled} onClick={onClick}>
                {children}
            </Button>
        </div>
    );
}