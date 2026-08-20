import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import "./Dashboard.css";

const Dashboard = (): React.ReactElement => {
  return (
    <Box className="dashboard">
      <Typography variant="h4" component="h1" gutterBottom>
        Inventory Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Products
              </Typography>

              <Typography variant="h4">248</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Low Stock
              </Typography>

              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Orders
              </Typography>

              <Typography variant="h4">56</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Users
              </Typography>

              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
