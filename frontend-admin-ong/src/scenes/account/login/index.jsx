import React from "react";
import axios from '@/services/AxiosHelper';
import {
    Box,
    Avatar,
    CssBaseline,
    Link,
    Button,
    Typography,
    Grid,
    Paper,
    TextField,
    Snackbar
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useAuth} from '../../../hooks/useAuth';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});



const Login = () => {
    const [state] = React.useState({
      vertical: 'top',
      horizontal: 'right',
    });

    const alert = (type, message) => {
      setOpen(true)
      setType(type);
      setMessage(message)
    }

    const { vertical, horizontal} = state;
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('error');
    const [open, setOpen] = React.useState(false);
    const {login} = useAuth();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            email: 'clubedosviralatas@clubedosviralatas.com.br',
            password: 'Matchpet@132',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          try {
            const response = await axios.postData('api/account/login', {
              email: values.email,
              password: values.password,
            },false);
            alert('success', 'Login efetuado')
            login(response.data);
          } catch (error) {
            alert('error', 'E-mail ou senha inválidos')
          }
        },
    });

    return (
      <div>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                type="email"
                fullWidth
                label="Enter your email"
                placeholder="Email Address"
                variant="outlined"
                required
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                onBlur={(e) => formik.setFieldValue('email', e.target.value)}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              {formik.errors.email && formik.touched.email && formik.errors.email}

              <TextField
                type="password"
                margin="normal"
                fullWidth
                label="Password"
                placeholder="Password"
                variant="outlined"
                required
                value={formik.values.password}
                onChange={(e) => formik.setFieldValue('password', e.target.value)}
                onBlur={(e) => formik.setFieldValue('password', e.target.value)}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {formik.errors.password && formik.touched.password && formik.errors.password}
                
                <Button 
                  type="submit" 
                  disabled={formik.isSubmitting} 
                  fullWidth 
                  variant="contained">
                  Sign In
                </Button>
                
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical, horizontal }}>
                  <Alert severity={type} sx={{ width: '100%' }}>
                    {message}
                  </Alert>
                </Snackbar>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div >
    );
};

export default Login;