import react, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext({ value }) {
  return `${value}°C`;
}

const minDistance = 0;

export default function MinimumDistanceSlider({ handleState, handleValues }) {
  const [value1, setValue1] = useState(handleValues);
  

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
    handleState(value1[0], value1[1]);
  };


  return (
    <Box sx={{ width: 300 }}>
      <Slider
        className="slider"
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={15}
        max={30}
        disableSwap
      />
    </Box>
  );
}
