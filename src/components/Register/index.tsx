import { type FormEvent, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import type { RegisterFormValues } from '../../types/auth';

import './Register.css';

const registerValidationSchema: Yup.ObjectSchema<RegisterFormValues> =
  Yup.object({
    name: Yup.string()
      .trim()
      .min(2, 'Name must contain at least 2 characters')
      .required('Name is required'),

    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required'),

    password: Yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .required('Password is required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

const Register = (): React.ReactElement => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: registerValidationSchema,

    onSubmit: async (): Promise<void> => {
      setSuccessMessage('');

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });

      setSuccessMessage(
        'Registration successful. You can now sign in.',
      );

      formik.resetForm();
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void formik.submitForm();
  };

  return (
    <Box className="register-page">
      <Paper
        component="section"
        className="register-card"
        elevation={3}
        aria-labelledby="register-title"
      >
        <Typography
          id="register-title"
          component="h1"
          variant="h4"
          className="register-title"
        >
          Create Account
        </Typography>

        <Typography
          component="p"
          variant="body1"
          className="register-subtitle"
        >
          Register for Inventory Management System
        </Typography>

        {successMessage.length > 0 && (
          <Alert
            severity="success"
            role="status"
            className="register-alert"
          >
            {successMessage}
          </Alert>
        )}

        <Box
          component="form"
          className="register-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            id="register-name"
            name="name"
            label="Full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name === true &&
              Boolean(formik.errors.name)
            }
            helperText={
              formik.touched.name === true
                ? formik.errors.name
                : ''
            }
            autoComplete="name"
            fullWidth
            required
          />

          <TextField
            id="register-email"
            name="email"
            label="Email address"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email === true &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email === true
                ? formik.errors.email
                : ''
            }
            autoComplete="email"
            fullWidth
            required
          />

          <TextField
            id="register-password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password === true &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password === true
                ? formik.errors.password
                : ''
            }
            autoComplete="new-password"
            fullWidth
            required
          />

          <TextField
            id="register-confirm-password"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword === true &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword === true
                ? formik.errors.confirmPassword
                : ''
            }
            autoComplete="new-password"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <CircularProgress
                size={24}
                color="inherit"
                aria-label="Creating account"
              />
            ) : (
              'Create Account'
            )}
          </Button>

          <Button
            type="button"
            variant="text"
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;