import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function BasicSelect({
  listOptions,
  label,
  handleChange,
  handleClear,
  value,
  width = 150,
  disabled = false
}) {
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
          endAdornment={
            value &&
            handleClear && (
              <IconButton
                onClick={handleClear}
                size="small"
                style={{ marginRight: "13px", width: "20px" }}
              >
                <ClearIcon style={{ width: "20px" }} />
              </IconButton>
            )
          }
        >
          {options.map(option => renderOption(option))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
