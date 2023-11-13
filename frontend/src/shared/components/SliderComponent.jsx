import { Slider } from "@mui/material";
import React from "react";

const SliderComponent = ({ marks, sliderValue, setSliderValue, min, max }) => {
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Slider
        aria-label="Ano"
        value={sliderValue}
        onChange={handleSliderChange}
        step={null}
        marks={marks}
        min={min}
        max={max}
        valueLabelDisplay="auto"
      />
      <p>Ano selecionado: {sliderValue}</p>
    </div>
  );
};

export default SliderComponent;
