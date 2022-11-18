import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout";
import { HomeLayout } from "../components/layouts/HomeLayout";

import Home from "../scenes/home";
import Login from "../scenes/account/login";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Profile from "../scenes/profile";
import PetsHome from "../scenes/pets/home";
import PetsCadastrar from "../scenes/pets/cadastrar";
import PetsEditar from "../scenes/pets/editar";
import Contacts from "../scenes/contacts";

const AppRoutes = () => (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/ong" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="pets" element={<PetsHome />} />
        <Route path="pets/cadastrar" element={<PetsCadastrar />} />
        <Route path="pets/editar/:id" element={<PetsEditar />} />
        <Route path="team" element={<Team />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
    </Routes>
)

export default AppRoutes;