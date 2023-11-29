import React, { useState } from 'react';
import { getYear, getDate, getMonth } from 'date-fns';
import SimpelDato from './simpelDato';

export default function DatoValger({ lan, setValue, dato }) {
  const [year, setYear] = useState(getYear(new Date(dato)));
  const [date, setDate] = useState(getDate(new Date(dato)));
  const [month, setMonth] = useState(getMonth(new Date(dato)));
  const set = lan === 'Dk';

  const monthEng = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const monthDK = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"
  ];
  const months = set ? monthDK : monthEng

  return (
    <SimpelDato months={months} year={year} setYear={setYear} month={month} setMonth={setMonth} date={date} setValue={setValue} setDate={setDate} />
  )

}