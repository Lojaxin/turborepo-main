import * as React from 'react';
import {Box
  , InputLabel
  , MenuItem
  , FormControl
  , Select
  , SelectChangeEvent
} from '@mui/material';

export function BasicSelect({
  options,
  label,
  value,
  onChange,
}: {
  options: { label: string, value: string }[],
  label: string,
  value: string,
  onChange: (event: SelectChangeEvent) => void,
}) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}