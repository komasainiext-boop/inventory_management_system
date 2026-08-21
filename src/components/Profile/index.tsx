import { useEffect, useMemo, useState } from "react";

import { useFormik } from "formik";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useProfile } from "../../context/useProfile";
import type { ProfileFormValues } from "../../types/profile";

import "./Profile.css";

interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
}

const emptyInitialValues: ProfileFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  avatarUrl: "",
};

const validate = (values: ProfileFormValues): ProfileFormErrors => {
  const errors: ProfileFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?[0-9\s-]{10,15}$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.role.trim()) {
    errors.role = "Role is required";
  }

  return errors;
};

const Profile = (): React.ReactElement => {
  const {
    profile,
    loading,
    error,
    loadProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  } = useProfile();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const formInitialValues = useMemo<ProfileFormValues>(() => {
    if (profile === null) {
      return emptyInitialValues;
    }

    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,
      avatarUrl: profile.avatarUrl,
    };
  }, [profile]);

  const formik = useFormik<ProfileFormValues>({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validate,

    onSubmit: async (values): Promise<void> => {
      console.log("PROFILE FORM SUBMIT:", values);

      if (profile === null) {
        await createProfile(values);
      } else {
        await updateProfile(values);
      }
    },
  });

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];

    if (file === undefined) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    void formik.setFieldValue("avatarUrl", imageUrl);
  };

  const handleUpdateClick = (): void => {
    console.log("UPDATE BUTTON CLICKED");

    void formik.submitForm();
  };

  const handleDelete = async (): Promise<void> => {
    await deleteProfile();

    setDeleteDialogOpen(false);
    formik.resetForm();
  };

  if (loading && profile === null) {
    return (
      <Box
        className="profile-loading"
        role="status"
        aria-label="Loading profile"
      >
        <CircularProgress />
        <Typography component="p">Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      className="profile-page"
      aria-labelledby="profile-title"
    >
      <Box className="profile-header">
        <Typography id="profile-title" component="h1" variant="h4">
          User Profile
        </Typography>

        <Typography component="p" variant="body1">
          Manage your inventory system profile information.
        </Typography>
      </Box>

      {error !== null && (
        <Alert severity="error" className="profile-alert" role="alert">
          {error}
        </Alert>
      )}

      <Card className="profile-card">
        <CardContent>
          <Box className="profile-avatar-section">
            <Avatar
              src={formik.values.avatarUrl || undefined}
              alt={`${formik.values.firstName} ${formik.values.lastName} profile avatar`}
              className="profile-avatar"
            >
              {formik.values.firstName.charAt(0)}
            </Avatar>

            <Button
              component="label"
              variant="outlined"
              aria-label="Upload profile avatar"
            >
              Upload Avatar
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                aria-label="Select profile avatar image"
              />
            </Button>
          </Box>

          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              void formik.submitForm();
            }}
            noValidate
            className="profile-form"
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName ? formik.errors.firstName : ""
                  }
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={
                    formik.touched.lastName ? formik.errors.lastName : ""
                  }
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email ? formik.errors.email : ""}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone ? formik.errors.phone : ""}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="role"
                  name="role"
                  label="Role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role ? formik.errors.role : ""}
                  required
                />
              </Grid>
            </Grid>

            <Box className="profile-actions">
              <Button
                type="button"
                variant="contained"
                disabled={formik.isSubmitting || loading}
                onClick={handleUpdateClick}
              >
                {profile === null ? "Create Profile" : "Update Profile"}
              </Button>

              {profile !== null && (
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={loading}
                >
                  Delete Profile
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-profile-title"
        aria-describedby="delete-profile-description"
      >
        <DialogTitle id="delete-profile-title">Delete Profile?</DialogTitle>

        <DialogContent>
          <DialogContentText id="delete-profile-description">
            Are you sure you want to delete this profile? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button type="button" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>

          <Button
            type="button"
            color="error"
            variant="contained"
            onClick={() => void handleDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
