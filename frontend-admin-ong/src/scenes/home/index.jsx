import React from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";

const Home = () => {
  return (
    <Box m="20px">
      <Header title="Home" subtitle="Bem vindo ao site" />
      <a href="/login">Login</a>
    </Box>
  );
};

export default Home;
