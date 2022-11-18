import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import SharePet from './SharePet';


export default function PetsCard({pet}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={pet.nome}
        subheader={pet.racaPet.nome}
      />
      <CardMedia
        component="img"
        height="194"
        src={pet.urlImagem}
        alt={pet.mome}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {pet.descricao}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <SharePet urlImagem={pet.urlImagem} message={`O ${pet.nome} precisa de um lar, entre em contato!`}/>
        <IconButton aria-label="edit" onClick={() => navigate('/ong/pets/editar/' + pet.id)}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
