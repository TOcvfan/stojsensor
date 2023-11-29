import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Kort({ children, titel, billede, om }) {
    //console.log(billede.src)
    return (
        <Card sx={{ maxWidth: 345, minWidth: 340, m: 2 }} raised>
            <CardMedia
                component="img"
                height="340"
                image={billede.src}
                alt={om}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {titel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {children}
                </Typography>
            </CardContent>
        </Card>

    );
}
