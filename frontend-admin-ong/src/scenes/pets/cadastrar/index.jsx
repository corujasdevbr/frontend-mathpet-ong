import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { mockEspecieRaca, mockPorte, mockPelagem } from "@/data/mockData";
import MuiAlert from "@mui/material/Alert";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import storage from "@/config/firebase";
import axios from "@/services/AxiosHelper";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  urlImagem: yup.string("Informe a imagem").required("Imagem é obrigatoria"),
  especie: yup.string("Informe a espécie").required("Espécie é obrigatoria"),
  idRacaPet: yup.string("Informe a Raça").required("Raça é obrigatoria"),
  nome: yup.string("Informe o Nome").required("Nome é obrigatorio"),
  sexo: yup.string("Informe o Sexo").required("Sexo é obrigatorio"),
  apelido: yup.string("Informe o Apelido").required("Apelido é obrigatorio"),
  dataNascimento: yup
    .string("Informe a Data de Nascimento")
    .required("Data de Nascimento é obrigatoria"),
  pelagem: yup.string("Informe a Pelagem").required("Pelagem é obrigatoria"),
  porte: yup.string("Informe o Porte").required("Porte é obrigatorio"),
  descricao: yup.string("Informe o Porte").required("Porte é obrigatorio"),
});

const theme = createTheme();

export default function CadastrarPetForm() {
  const navigate = useNavigate();
  // State to store uploaded file
  const [racas, setRacas] = useState([]);
  const [tiposSangue, setTiposSangue] = useState([]);
  const [file, setFile] = useState("");
  const [racaDisabled, setRacaDisabled] = useState(true);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("error");
  const [open, setOpen] = React.useState(false);

  const [state] = React.useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      doacao: true,
      tipoSangue: "",
      sexo: "",
      urlImagem: "",
      especie: "",
      idRacaPet: "",
      pelagem: "",
      porte: "",
      nome: "",
      apelido: "",
      dataNascimento: "",
      microchip: "",
      descricao: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        var result = await axios.postData("api/pets", values, true);
        alert("success", "Pet Cadastrado");
        navigate("/ong/pets");
      } catch (error) {
        alert("error", error.message);
      }
    },
  });

  const alert = (type, message) => {
    setOpen(true);
    setType(type);
    setMessage(message);
  };

  // Handle file upload event and update state
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const percent = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          formik.setFieldValue("urlImagem", url);
        });
      }
    );
  };

  const especieSelecionada = async (event) => {
    formik.setFieldValue("especie", event.target.value);
    const result = Object.values(mockEspecieRaca).filter(
      (item) => item.value === event.target.value
    );
    var resultApi = await axios.get(
      "api/RacasPets?quantity=100&tipoPet=" + event.target.value,
      false
    );
    setRacas(resultApi.data.data.items);
    setRacaDisabled(false);
    setTiposSangue(result[0].tiposSangue);
  };

  const racaSelecionada = (event) => {
    formik.setFieldValue("idRacaPet", event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Cadastrar Pet
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Box m="20px" />

            <Grid item xs={12}>
              <center>
                {formik.values.urlImagem === "" ? (
                  <>
                    <input
                      type="file"
                      onChange={handleChange}
                      accept="/image/*"
                    />
                    <button onClick={handleUpload}>Upload to Firebase</button>
                  </>
                ) : (
                  <>
                    <Avatar
                      alt="Remy Sharp"
                      src={formik.values.urlImagem}
                      sx={{ width: 150, height: 150 }}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      onClick={() => formik.setFieldValue("urlImagem", "")}
                      component="label"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
                <Box m="10px" />
                {formik.errors.urlImagem &&
                  formik.touched.urlImagem &&
                  formik.errors.urlImagem}
              </center>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                value={formik.values.doacao}
                onChange={(e) => formik.setFieldValue("doacao", e.target.value)}
                onBlur={(e) => formik.setFieldValue("doacao", e.target.value)}
                label="Para Adoção"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Espécie</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.especie}
                  label="Espécie"
                  onChange={(e) => especieSelecionada(e)}
                  onBlur={(e) => especieSelecionada(e)}
                  error={
                    formik.touched.especie && Boolean(formik.errors.especie)
                  }
                >
                  {mockEspecieRaca.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.nome}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {formik.errors.especie &&
                formik.touched.especie &&
                formik.errors.especie}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Raça</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.idRacaPet}
                  disabled={racaDisabled}
                  label="Raça"
                  onChange={(e) => racaSelecionada(e)}
                  onBlur={(e) => racaSelecionada(e)}
                  error={
                    formik.touched.idRacaPet && Boolean(formik.errors.idRacaPet)
                  }
                >
                  {!racaDisabled &&
                    racas.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.nome}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {formik.errors.idRacaPet &&
                formik.touched.idRacaPet &&
                formik.errors.idRacaPet}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.sexo}
                  label="Sexo"
                  onChange={(e) => formik.setFieldValue("sexo", e.target.value)}
                  onBlur={(e) => formik.setFieldValue("sexo", e.target.value)}
                  error={formik.touched.sexo && Boolean(formik.errors.sexo)}
                >
                  <MenuItem value={0}>Macho</MenuItem>
                  <MenuItem value={1}>Fêmea</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.sexo && formik.touched.sexo && formik.errors.sexo}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de Sangue
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.tipoSangue}
                  label="Tipo Sanguineo"
                  onChange={(e) =>
                    formik.setFieldValue("tipoSangue", e.target.value)
                  }
                  onBlur={(e) =>
                    formik.setFieldValue("tipoSangue", e.target.value)
                  }
                  error={
                    formik.touched.tipoSangue &&
                    Boolean(formik.errors.tipoSangue)
                  }
                >
                  {!racaDisabled &&
                    tiposSangue.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {formik.errors.tipoSangue &&
                formik.touched.tipoSangue &&
                formik.errors.tipoSangue}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pelagem</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.pelagem}
                  label="Pelagem"
                  onChange={(e) =>
                    formik.setFieldValue("pelagem", e.target.value)
                  }
                  onBlur={(e) =>
                    formik.setFieldValue("pelagem", e.target.value)
                  }
                  error={
                    formik.touched.pelagem && Boolean(formik.errors.pelagem)
                  }
                >
                  {mockPelagem.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.nome}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {formik.errors.pelagem &&
                formik.touched.pelagem &&
                formik.errors.pelagem}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Porte</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.porte}
                  label="porte"
                  onChange={(e) =>
                    formik.setFieldValue("porte", e.target.value)
                  }
                  onBlur={(e) => formik.setFieldValue("porte", e.target.value)}
                  error={formik.touched.porte && Boolean(formik.errors.porte)}
                >
                  {mockPorte.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.nome}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {formik.errors.porte &&
                formik.touched.porte &&
                formik.errors.porte}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="nome"
                name="nome"
                label="Nome"
                value={formik.values.nome}
                fullWidth
                variant="standard"
                onChange={(e) => formik.setFieldValue("nome", e.target.value)}
                onBlur={(e) => formik.setFieldValue("nome", e.target.value)}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
              />
              {formik.errors.nome && formik.touched.nome && formik.errors.nome}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="apelido"
                name="apelido"
                label="Apelido"
                value={formik.values.apelido}
                onChange={(e) =>
                  formik.setFieldValue("apelido", e.target.value)
                }
                onBlur={(e) => formik.setFieldValue("apelido", e.target.value)}
                error={formik.touched.apelido && Boolean(formik.errors.apelido)}
                fullWidth
                variant="standard"
              />
              {formik.errors.apelido &&
                formik.touched.apelido &&
                formik.errors.apelido}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                id="dataNascimento"
                name="dataNascimento"
                label="Data Nascimento"
                value={formik.values.dataNascimento}
                onChange={(e) =>
                  formik.setFieldValue("dataNascimento", e.target.value)
                }
                onBlur={(e) =>
                  formik.setFieldValue("dataNascimento", e.target.value)
                }
                error={
                  formik.touched.dataNascimento &&
                  Boolean(formik.errors.dataNascimento)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.dataNascimento &&
                formik.touched.dataNascimento &&
                formik.errors.dataNascimento}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="microchip"
                name="microchip"
                label="Microchip"
                value={formik.values.microchip}
                onChange={(e) =>
                  formik.setFieldValue("microchip", e.target.value)
                }
                onBlur={(e) =>
                  formik.setFieldValue("microchip", e.target.value)
                }
                error={
                  formik.touched.microchip && Boolean(formik.errors.microchip)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.microchip &&
                formik.touched.microchip &&
                formik.errors.microchip}
            </Grid>
            <Grid item xs={12}>
              <TextField
                rows="5"
                multiline
                id="descricao"
                name="descricao"
                label="Observação"
                value={formik.values.descricao}
                onChange={(e) =>
                  formik.setFieldValue("descricao", e.target.value)
                }
                onBlur={(e) =>
                  formik.setFieldValue("descricao", e.target.value)
                }
                error={
                  formik.touched.descricao && Boolean(formik.errors.descricao)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.descricao &&
                formik.touched.descricao &&
                formik.errors.descricao}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth disabled={formik.isSubmitting} variant="contained">
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
