import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Porque Participar
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="https://th.bing.com/th/id/R.bc2b7c952c16b824c170266bd3fa4585?rik=fy%2bjjGcb96E90A&riu=http%3a%2f%2fwww.agenciasense.com.br%2fblog%2fwp-content%2fuploads%2f2017%2f09%2ftmp792500740185653249.png&ehk=SLUeqfr9y9ZNULJ%2fQ6ekzKE2Dh4ri8B3cSXlNrrCo%2fg%3d&risl=&pid=ImgRaw&r=0"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  MatchPet é a maior ferramenta de divulção de Pets para doação da web
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Informações sobre os donos de Pets que adotaram de sua ong
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="https://i.pinimg.com/originals/c1/53/ff/c153ff12b17bde1adf1920b4c759215f.png"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Painel que você pode obter diversas informações sobre sua Ong
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/"
          sx={{ mt: 8 }}
        >
          Inscreva-se
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
