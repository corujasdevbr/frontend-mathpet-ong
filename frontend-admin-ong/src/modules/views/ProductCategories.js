import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://www.acidadeon.com/__export/1663869478724/sites/acidadeon/img/2022/09/22/adote_amor_2.jpeg_521679039.jpeg',
    title: 'Snorkeling',
    width: '40%',
  },
  {
    url: 'https://jpimg.com.br/uploads/2020/10/inbetweentheblinks-shutterstock.png',
    title: 'Massage',
    width: '20%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyI8r_tcJ2q9qFSRlXJ0w6mRO44hej0nhrbA&usqp=CAU',
    title: 'Hiking',
    width: '40%',
  },
  {
    url: 'https://midia.gruposinos.com.br/_midias/jpg/2021/06/19/202166243_1215831098865346_8398333930614637043_n-19688172.jpg',
    title: 'Tour',
    width: '38%',
  },
  {
    url: 'https://adotar.com.br/painel/upload/2017-07/animais_imagem280504.png',
    title: 'Gastronomy',
    width: '38%',
  },
  {
    url: 'https://adotar.com.br/painel/upload/2015-11/animais_imagem181595.jpeg',
    title: 'Shopping',
    width: '24%',
  },
  {
    url: 'https://crmvsp.gov.br/wp-content/uploads/2021/02/25.10.20_Doa%C3%A7%C3%A3o-de-sangue_seu-pet-pode-salvar-a-vida-de-outros-peludos_Pixabay-1024x676.jpg',
    title: 'Walking',
    width: '40%',
  },
  {
    url: 'https://www.campinas.sp.gov.br/uploads/fotos/a85d3df7d64b4cbc790c981586fb425e.jpg',
    title: 'Fitness',
    width: '20%',
  },
  {
    url: 'https://www.portalc3.net/wp-content/uploads/2021/11/doacao-animal.jpg',
    title: 'Reading',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Diversos Pets para Doação
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
