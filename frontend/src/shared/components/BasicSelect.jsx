import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function BasicSelect({ listOptions, label, handleChange, value, width = 150, disabled = false }) {
  let options = listOptions;
  if (!Array.isArray(options) || !options.length) {
    options = ["Nenhuma opção disponível"];
  }

  const renderOption = option => {
    return (
      <MenuItem value={option} key={`${value} ${option}`}>
        {option}
      </MenuItem>
    );
  };

  return (
    <Box sx={{ width: { width } }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        >
          {options.map(option => renderOption(option))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
