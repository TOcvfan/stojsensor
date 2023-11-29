import React from "react";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box, FormHelperText } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

export default function Selector({ liste, label, onChange, helper, value }) {

  return (
    <Box>
      <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          input={<OutlinedInput label={label} />}
        ><MenuItem value="">
            <em>None</em>
          </MenuItem>
          {liste?.map((b, i) => {
            const navn = b === undefined ? "ingen lister" : b.navn;
            const value = !b.value ? b.navn : b.value
            return (
              <MenuItem key={i} value={value}>
                {navn}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>{helper}</FormHelperText>
      </FormControl>
    </Box>
  );
}