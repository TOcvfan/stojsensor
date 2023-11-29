import React from 'react';
import { TextField } from '@mui/material';
import { withStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: 1,
    },
  },
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',

    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
    },
    '& .MuiInput-underline:after': {
      borderColor: 'green',
      borderWidth: 3,
      borderRadius: 10,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        boxShadow: "purple 0px 5px 15px",
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 10,
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
        borderWidth: 3,
        borderRadius: 10,
      },
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: 10,
      },
    },
  },
})(TextField);

export default function SelectTextField({ children, errors, label, defaultV, select, value, onChange, width, id }) {

  return (

    <CssTextField
      sx={{
        width: width ? width : 'auto',
        mt: '20px',
        mb: '10px'
      }}
      id={id}
      value={value}
      label={errors ? errors.message : label}
      defaultValue={defaultV}
      variant="outlined"
      select={select}
      onChange={onChange}>
      {children}
    </CssTextField>

  );
}