import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://blog.greenwichtime.com/lifestyle/files/2021/04/load-image-3.jpg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Sua vida mais feliz com um super amigo
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Tenha acesso a milhares de Pets precisando de um lar
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
      >
        Play Store
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Em breve
      </Typography>
    </ProductHeroLayout>
  );
}
