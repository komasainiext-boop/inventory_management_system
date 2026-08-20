import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import type { ForgotPasswordFormValues } from "../../types/auth";

import "./ForgotPassword.css";

const validationSchema: Yup.ObjectSchema<ForgotPasswordFormValues> = Yup.object(
  {
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
  },
);

const ForgotPassword = (): React.ReactElement => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },

    validationSchema,

    onSubmit: async (): Promise<void> => {
      setSuccessMessage("");

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });

      setSuccessMessage(
        "If an account exists with this email, password reset instructions have been sent.",
      );
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void formik.submitForm();
  };

  return (
    <Box className="forgot-password-page">
      <Paper
        component="section"
        className="forgot-password-card"
        elevation={3}
        aria-labelledby="forgot-password-title"
      >
        <Typography
          id="forgot-password-title"
          component="h1"
          variant="h4"
          className="forgot-password-title"
        >
          Forgot Password
        </Typography>

        <Typography
          component="p"
          variant="body1"
          className="forgot-password-description"
        >
          Enter your registered email address and we will send you instructions
          to reset your password.
        </Typography>

        {successMessage.length > 0 && (
          <Alert
            severity="success"
            role="status"
            className="forgot-password-alert"
          >
            {successMessage}
          </Alert>
        )}

        <Box
          component="form"
          className="forgot-password-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            id="forgot-password-email"
            name="email"
            label="Email address"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email === true && Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email === true ? formik.errors.email : ""
            }
            autoComplete="email"
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
            {formik.isSubmitting ? "Sending..." : "Send Reset Instructions"}
          </Button>

          <Button
            type="button"
            variant="text"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
