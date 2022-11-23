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

export default function CadastrarDonoForm() {
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
            Cadastrar Dono
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Box m="20px" />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="username"
                label="Nome"
                value={formik.values.name}
                fullWidth
                variant="standard"
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
                onBlur={(e) => formik.setFieldValue("name", e.target.value)}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </Grid>
            
            
            <Grid item xs={12} sm={6}>
              <TextField
                id="username"
                name="username"
                label="Apelido"
                value={formik.values.username}
                onChange={(e) =>
                  formik.setFieldValue("username", e.target.value)
                }
                onBlur={(e) => formik.setFieldValue("username", e.target.value)}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.username &&
                formik.touched.username &&
                formik.errors.username}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                onBlur={(e) => formik.setFieldValue("email", e.target.value)}
                error={formik.touched.email && Boolean(formik.errors.email)}
                fullWidth
                variant="standard"
              />
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="password"
                name="password"
                label="Senha"
                value={formik.values.password}
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                onBlur={(e) => formik.setFieldValue("password", e.target.value)}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="telefone"
                name="telefone"
                label="Telefone"
                value={formik.values.telefone}
                onChange={(e) =>
                  formik.setFieldValue("telefone", e.target.value)
                }
                onBlur={(e) => formik.setFieldValue("telefone", e.target.value)}
                error={
                  formik.touched.telefone && Boolean(formik.errors.telefone)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.telefone &&
                formik.touched.telefone &&
                formik.errors.telefone}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="celular"
                name="celular"
                label="Celular"
                value={formik.values.celular}
                onChange={(e) =>
                  formik.setFieldValue("celular", e.target.value)
                }
                onBlur={(e) => formik.setFieldValue("celular", e.target.value)}
                error={
                  formik.touched.celular && Boolean(formik.errors.celular)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.celular &&
                formik.touched.celular &&
                formik.errors.celular}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.genero}
                  label="genero"
                  onChange={(e) => formik.setFieldValue("genero", e.target.value)}
                  onBlur={(e) => formik.setFieldValue("genero", e.target.value)}
                  error={formik.touched.genero && Boolean(formik.errors.genero)}
                >
                  <MenuItem value={0}>Masculino</MenuItem>
                  <MenuItem value={1}>Feminino</MenuItem>
                  <MenuItem value={2}>Outro</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.genero && formik.touched.genero && formik.errors.genero}
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
                id="cep"
                name="cep"
                label="Cep"
                value={formik.values.cep}
                onChange={(e) =>
                  formik.setFieldValue("cep", e.target.value)
                }
                onBlur={(e) =>
                  formik.setFieldValue("cep", e.target.value)
                }
                error={
                  formik.touched.cep &&
                  Boolean(formik.errors.cep)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.cep &&
                formik.touched.cep &&
                formik.errors.cep}
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="logradouro"
                name="logradouro"
                label="Logradouro"
                value={formik.values.logradouro}
                onChange={(e) =>
                  formik.setFieldValue("logradouro", e.target.value)
                }
                onBlur={(e) =>
                  formik.setFieldValue("logradouro", e.target.value)
                }
                error={
                  formik.touched.logradouro && Boolean(formik.errors.logradouro)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.logradouro &&
                formik.touched.logradouro &&
                formik.errors.logradouro}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="numero"
                name="numero"
                label="Número"
                value={formik.values.numero}
                onChange={(e) =>
                  formik.setFieldValue("numero", e.target.value)
                }
                onBlur={(e) =>
                  formik.setFieldValue("numero", e.target.value)
                }
                error={
                  formik.touched.numero && Boolean(formik.errors.numero)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.numero &&
                formik.touched.numero &&
                formik.errors.numero}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="complemento"
                name="complemento"
                label="Complemento"
                value={formik.values.numero}
                onChange={(e) =>
                  formik.setFieldValue("complemento", e.target.value)
                }
                onBlur={(e) =>
                  formik.setFieldValue("complemento", e.target.value)
                }
                error={
                  formik.touched.complemento && Boolean(formik.errors.complemento)
                }
                fullWidth
                variant="standard"
              />
              {formik.errors.complemento &&
                formik.touched.complemento &&
                formik.errors.complemento}
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">UF</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.uf}
                  label="uf"
                  onChange={(e) => formik.setFieldValue("uf", e.target.value)}
                  onBlur={(e) => formik.setFieldValue("uf", e.target.value)}
                  error={formik.touched.uf && Boolean(formik.errors.uf)}
                >
                  <MenuItem value={0}>Masculino</MenuItem>
                  <MenuItem value={1}>Feminino</MenuItem>
                  <MenuItem value={2}>Outro</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.uf && formik.touched.uf && formik.errors.uf}
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.uf}
                  label="Cidade"
                  onChange={(e) => formik.setFieldValue("cidade", e.target.value)}
                  onBlur={(e) => formik.setFieldValue("cidade", e.target.value)}
                  error={formik.touched.cidade && Boolean(formik.errors.cidade)}
                >
                  <MenuItem value={0}>Masculino</MenuItem>
                  <MenuItem value={1}>Feminino</MenuItem>
                  <MenuItem value={2}>Outro</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.cidade && formik.touched.cidade && formik.errors.cidade}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                disabled={formik.isSubmitting}
                variant="contained"
              >
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
