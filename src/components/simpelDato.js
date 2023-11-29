"use client"
import React from 'react';
import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import SelectTextField from './selectTextfield';

export default function SimpelDato({ months, year, setYear, month, setMonth, date, setDate, setValue }) {
    const maxOffset = 90;

    const yearList = Array.from(Array(maxOffset)).map((val, index) => year - index)
    const monthList = Array.from(Array(12)).map((val, index) => index)
    const dateList = Array.from(Array(31)).map((val, index) => index + 1)

    const saetnul = (dato) => dato < 10 ? '0' + dato : dato
    const birth = `${year}-${saetnul(month + 1)}-${saetnul(date)}`
    //console.log(year)
    //console.log(months)
    const handleYear = (event) => {
        setYear(event.target.value)
        //onChange(event.target.value);
        setValue('foedselsdag', birth)
        console.log(birth)
    };

    const handleMonth = (event) => {
        setMonth(event.target.value);
        //onChange(event);
        console.log(birth)
        setValue('foedselsdag', birth)
    };

    const handleDate = (event) => {
        setDate(event.target.value);
        //onChange(event);
        setValue('foedselsdag', birth)
        console.log(birth)
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row-reverse'
        }}>
            <SelectTextField select={true} helper={year} value={year} onChange={handleYear} width={100} id='year'>{
                yearList.map(y => {
                    return (
                        <MenuItem key={y} value={y}>{y}</MenuItem>
                    )
                })
            }</SelectTextField>
            <SelectTextField select={true} helper={months[month]} value={month} onChange={handleMonth} width={125} id='month'>{
                monthList.map(m => {
                    return (
                        <MenuItem key={m} value={m}>{months[m]}</MenuItem>
                    )
                })
            }</SelectTextField>
            <SelectTextField select={true} helper={date} value={date} onChange={handleDate} width={75} id='day'>{
                dateList.map(y => {
                    return (
                        <MenuItem key={y} value={y}>{y}</MenuItem>
                    )
                })
            }</SelectTextField>
        </Box>
    );
}