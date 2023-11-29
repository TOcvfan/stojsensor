import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Text, CustomizedButtons, Title } from '../../components';
import { format } from 'date-fns'
//import { data } from '../../helpers/messurements';
import Plot from 'react-plotly.js';

import { Box } from '@mui/material';
import hent from '../../services/location';

export default function ControlPage({ setIsLoggedIn, user }) {
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [userlocations, setUserLocations] = useState({})
    const id = user.id;
    const datoFormat = (dato) => format(new Date(dato), 'dd/MM/yyyy HH:mm')
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 200
    }

    useEffect(() => {
        hent(setData, setError, '/Location/GeoLocation/1?LocationID=3').then((d) => {
            console.log(d)
        })
        /*const result = data.filter(d => {
            console.log(d)
            return d.id === id
        })
        console.log(result[0])
        setData(result)*/
    }, []);
    //console.log(data)
    let x = [];
    let y = [];
    /*data?.map(g => {
        return g.geoLocations.map(p => {
            const sort = p.mesurrementSets[0].messurements.sort((p1, p2) => (p1.dateTime > p2.dateTime) ? 1 : (p1.dateTime < p2.dateTime) ? -1 : 0)
            return sort.map((DB) => {
                console.log(DB)
                //DB.sort((p1, p2) => (p1.dateTime > p2.dateTime) ? 1 : (p1.dateTime < p2.dateTime) ? -1 : 0)
                y.push(DB.decibel)
                x.push(DB.dateTime)
                return x, y
            })
        })
    })
    const title = () => data?.map(g => {
        return g.geoLocations.map(p => {
            const dato = p.mesurrementSets[0]
            return `start: ${datoFormat(dato.startDate)} slut: ${datoFormat(dato.endDate)}`
        })
    })
    //console.log(x);*/


    return (

        <Box sx={{
            centrer
        }}>
            {/*data?.map(g => {
                return g.geoLocations.map(p => {
                    return (
                        <Box sx={{ color: 'blue' }} key={p.id}>latitude: {p.latitude} longtitude: {p.longtitude} </Box>
                    )
                })
            })
            }
            <Box sx={{ color: 'blue' }} >2023</Box>
            {data?.map(g => {
                return g.geoLocations.map(p => {
                    const dato = p.mesurrementSets[0]
                    return (
                        <Box sx={{ color: 'blue' }} key={dato.id}>start: {datoFormat(dato.startDate)} slut: {datoFormat(dato.endDate)} </Box>
                    )
                })
            })
        */}
            <Plot
                data={[
                    {
                        x,
                        y,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    //{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                ]}

                layout={{ width: 1200, height: 500, title: 'pølse' }}

            />
        </Box>

    );
}