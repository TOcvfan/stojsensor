import React from "react";
import { Controller } from "react-hook-form";
import { alpha, styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Stack, Switch, Typography } from "@mui/material";
import { Box } from "@mui/material";

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: purple[600],
    '&:hover': {
      backgroundColor: alpha(purple[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: purple[600],
  },
}));

export default function LillaSwitch({ onChange, on, off, value, label }) {
  return (
    <Box>
      <label>{label}</label>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{off}</Typography>
        <PurpleSwitch
          onChange={(e) => onChange(e.target.checked)}
          checked={value}
        />
        <Typography>{on}</Typography>
      </Stack>
    </Box>
  );
}
