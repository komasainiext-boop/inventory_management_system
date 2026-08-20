import { useState, type FormEvent } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAuth } from "../../context/useAuth";
import { mockAuthResponse } from "../../stubs/authStub";
import type { LoginFormValues } from "../../types/auth";

import "./Login.css";

interface LoginProps {
  onForgotPassword?: () => void;
}

const loginValidationSchema: Yup.ObjectSchema<LoginFormValues> = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required"),

  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),
});

const Login = ({ onForgotPassword }: LoginProps): React.ReactElement => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [apiError, setApiError] = useState<string>("");

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginValidationSchema,

    onSubmit: async (): Promise<void> => {
      setApiError("");

      try {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 500);
        });

        login(mockAuthResponse.token);
        navigate("/dashboard");
      } catch {
        setApiError("Unable to sign in. Please try again.");
      }
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void formik.submitForm();
  };

  const emailHasError =
    formik.touched.email === true && Boolean(formik.errors.email);

  const passwordHasError =
    formik.touched.password === true && Boolean(formik.errors.password);

  return (
    <Box className="login-page">
      <Paper
        component="section"
        className="login-card"
        elevation={3}
        aria-labelledby="login-title"
      >
        <Typography
          id="login-title"
          component="h1"
          variant="h4"
          className="login-title"
        >
          Sign In
        </Typography>

        <Typography component="p" variant="body1" className="login-subtitle">
          Sign in to continue
        </Typography>

        {apiError.length > 0 && (
          <Alert severity="error" role="alert" className="login-alert">
            {apiError}
          </Alert>
        )}

        <Box
          component="form"
          className="login-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            id="login-email"
            name="email"
            label="Email address"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={emailHasError}
            helperText={emailHasError ? formik.errors.email : ""}
            autoComplete="email"
            fullWidth
            required
          />

          <TextField
            id="login-password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={passwordHasError}
            helperText={passwordHasError ? formik.errors.password : ""}
            autoComplete="current-password"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={formik.isSubmitting}
            aria-label="Sign in to your account"
          >
            {formik.isSubmitting ? (
              <CircularProgress
                size={24}
                color="inherit"
                aria-label="Signing in"
              />
            ) : (
              "Sign In"
            )}
          </Button>

          <Link
            component="a"
            href="/forgot-password"
            className="login-link"
            onClick={(event) => {
              if (onForgotPassword !== undefined) {
                event.preventDefault();
                onForgotPassword();
              }
            }}
          >
            Forgot password?
          </Link>

          <Link component="a" href="/register" className="login-link">
            Sign Up
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
