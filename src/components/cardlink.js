import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';

export default function LinkCard({ children, titel, billede }) {

    return (
        <Card sx={{ width: 300, m: 1 }}>
            <CardHeader
                title={titel}
                avatar={
                    <CardMedia
                        component="img"
                        height="25"
                        image={billede}
                        alt={titel}
                    />
                }
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {children}
                </Typography>
            </CardContent>
        </Card>
    );
}
