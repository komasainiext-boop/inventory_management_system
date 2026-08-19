import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './NotFound.css';

const NotFound = (): React.ReactElement => {
  const navigate = useNavigate();

  const handleGoToDashboard = (): void => {
    navigate('/dashboard');
  };

  return (
    <Box
      component="main"
      className="not-found-page"
      aria-labelledby="not-found-title"
    >
      <Paper
        component="section"
        className="not-found-card"
        elevation={2}
      >
        <Typography
          component="p"
          variant="h1"
          className="not-found-code"
          aria-label="Error 404"
        >
          404
        </Typography>

        <Typography
          id="not-found-title"
          component="h1"
          variant="h4"
          className="not-found-title"
        >
          Page Not Found
        </Typography>

        <Typography
          component="p"
          variant="body1"
          className="not-found-description"
        >
          Sorry, the page you are looking for does not exist or
          may have been moved.
        </Typography>

        <Button
          type="button"
          variant="contained"
          size="large"
          onClick={handleGoToDashboard}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;