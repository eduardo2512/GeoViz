import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import { dicionarioMapBox } from "../../shared/utils/DicionarioMapBox";

const ModalComponente = ({
  open,
  setOpen,
  mapBox,
  setMapBox,
  visualizacao,
  setVisualizacao,
  disabledMapaCoropletico
}) => {
  const visualizacaoInicial =
    visualizacao === "Mapa de coroplético" && disabledMapaCoropletico
      ? "Mapa normal"
      : visualizacao;
  const [mapBoxInput, setMapBoxInput] = useState(mapBox);
  const [visualizacaoInput, setVisualizacaoInput] = useState(visualizacaoInicial);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmar = () => {
    setMapBox(mapBoxInput);
    setVisualizacao(visualizacaoInput);
    setOpen(false);
  };

  const handleMapBoxChange = event => {
    setMapBoxInput(event.target.value);
  };

  const handleVisualizacaoChange = event => {
    setVisualizacaoInput(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <h2
            id="modal-modal-title"
            style={{
              color: "#656d75",
              fontFamily: "Raleway",
              fontStyle: "normal",
              fontWeight: "700"
            }}
          >
            Configurações mapa
          </h2>
          <FormControl style={{ paddingBottom: "10px" }}>
            <FormLabel id="demo-radio-buttons-group-label">Estilos de mapa</FormLabel>
            <RadioGroup
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
              value={mapBoxInput}
              onChange={handleMapBoxChange}
            >
              {Object.keys(dicionarioMapBox).map(mapbox => {
                return <FormControlLabel value={mapbox} control={<Radio />} label={mapbox} />;
              })}
            </RadioGroup>
          </FormControl>
          <div style={{ width: "100%", height: "1px", backgroundColor: "#cccccc" }} />
          <FormControl style={{ paddingTop: "10px" }}>
            <FormLabel id="demo-radio-buttons-group-label">Visualizações no mapa</FormLabel>
            <RadioGroup
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
              value={visualizacaoInput}
              onChange={handleVisualizacaoChange}
            >
              <FormControlLabel value="Mapa normal" control={<Radio />} label="Mapa normal" />
              <FormControlLabel value="Mapa de calor" control={<Radio />} label="Mapa de calor" />
              <FormControlLabel
                value="Mapa de coroplético"
                control={<Radio />}
                label="Mapa de coroplético"
                disabled={disabledMapaCoropletico}
              />
            </RadioGroup>
          </FormControl>

          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              style={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred"
                }
              }}
            >
              Fechar
            </Button>
            <Button onClick={handleConfirmar} variant="contained" color="primary">
              Aplicar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponente;
