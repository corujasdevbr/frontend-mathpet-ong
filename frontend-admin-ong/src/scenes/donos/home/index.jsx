import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "@/theme";
import { mockDataContacts } from "@/data/mockData";
import Header from "@/components/Header";
import { useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import axios from "@/services/AxiosHelper";

const DonosHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [donos, setDonos] = useState({});

  const columns = [
    { field: "name", headerName: "Nome", width: 90 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "celular", headerName: "Celular", width: 150 },
    {
      field: "genero",
      headerName: "Sexo",
      width: 250,
      valueGetter: (params) =>
        params.row.genero === 0 ? "Masculino" : "Feminino"
    },
    { 
        field: "endereco", headerName: "Cep", width: 150,
            valueGetter: (params) => params.row.endereco.cep    
    },
    { 
        field: "logradouro", headerName: "Logradouro", width: 450,
            valueGetter: (params) => `${params.row.endereco.logradouro}, ${params.row.endereco.numero}, ${params.row.endereco.complemento}, ${params.row.endereco.uf}, ${params.row.endereco.cidade}  `    
    },
    { 
        field: "dataNascimento", headerName: "Data de Nascimento", width: 250,
            valueGetter: (params) => `${params.row.dataNascimento}`    
    },
  ];

  useEffect(() => {
    const listarDonos = async () => {
      const result = await axios.getData("api/v1/donospets", true);
      console.log(result.data.items);
      setDonos(result.data.items);
    };

    listarDonos().catch(console.error);
  }, []);

  const cadastrarDono = () => {
    navigate("/ong/donos/cadastrar");
  };

  return (
    <Box m="20px">
      <Header
        title="CONTATOS"
        subtitle="Todos os seus contatos abaixo"
      />
      <Box m="20px">
        <Button
          onClick={() => cadastrarDono()}
          variant="contained"
          startIcon={<PersonIcon />}
        >
          Cadastrar Dono
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={donos}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DonosHome;
