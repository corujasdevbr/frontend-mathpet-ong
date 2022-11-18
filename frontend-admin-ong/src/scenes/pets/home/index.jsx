import React, { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import Header from "@/components/Header";
import PetsCard from "@/components/PetsCard";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import axios from "@/services/AxiosHelper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const PetsHome = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState({});

  useEffect(() => {
    const listarPets = async () => {
      const result = await axios.getData("/v1/donospets/pets", true);
      setPets(result.data);
    };

    listarPets().catch(console.error);
  }, []);

  const cadastrarPet = () => {
    navigate("/ong/pets/cadastrar");
  };

  return (
    <Box m="20px">
      <Header title="Pets" subtitle="Visualize todos os seus Pets" />
      <Box m="20px">
        <Button
          onClick={() => cadastrarPet()}
          variant="contained"
          startIcon={<PetsIcon />}
        >
          Cadastrar Pet
        </Button>
      </Box>
      <Grid container spacing={2}>
        {pets.items
          ? pets.items.map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <PetsCard pet={item} key={index} />
                </Grid>
              );
            })
          : <Alert severity="warning">
          <AlertTitle>Aviso</AlertTitle>
          Você não tem nenhum pet cadastrado, <strong>cadastre agora!</strong>
        </Alert>}
        <Box m="20px" />
        {!pets.items && (
          <Alert severity="warning">
            <AlertTitle>Aviso</AlertTitle>
            Você não tem nenhum pet cadastrado, <strong>cadastre agora!</strong>
          </Alert>
        )}
      </Grid>
    </Box>
  );
};

export default PetsHome;
