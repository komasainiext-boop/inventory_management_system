import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardCard from "./DashboardCard";
import {
  dashboardCards,
  inventoryOverview,
  stockSummary,
} from "../../stubs/dashboardStub";

import "./Dashboard.css";

const Dashboard = (): React.ReactElement => {
  const navigate = useNavigate();

  const maxOverviewValue = Math.max(
    ...inventoryOverview.map((item) => item.value),
  );

  return (
    <Box className="dashboard">
      <Box className="dashboard-header">
        <Box>
          <Typography variant="h4" component="h1">
            Inventory Dashboard
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Overview of your inventory management system.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => navigate("/profile")}
          aria-label="Open user profile"
        >
          View Profile
        </Button>
      </Box>

      <Grid container spacing={3} className="dashboard-cards">
        {dashboardCards.map((card) => (
          <Grid key={card.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <DashboardCard card={card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} className="dashboard-widgets">
        <Grid size={{ xs: 12, md: 8 }}>
          <Card className="dashboard-widget">
            <CardContent>
              <Typography variant="h6" component="h2">
                Inventory Overview
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Current inventory distribution.
              </Typography>

              <Box
                className="inventory-chart"
                aria-label="Inventory overview chart"
              >
                {inventoryOverview.map((item) => {
                  const percentage = (item.value / maxOverviewValue) * 100;

                  return (
                    <Box className="chart-row" key={item.id}>
                      <Typography variant="body2" className="chart-label">
                        {item.label}
                      </Typography>

                      <Box className="chart-bar-container">
                        <Box
                          className="chart-bar"
                          sx={{
                            width: `${percentage}%`,
                          }}
                        />
                      </Box>

                      <Typography variant="body2" className="chart-value">
                        {item.value}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="dashboard-widget">
            <CardContent>
              <Typography variant="h6" component="h2">
                Stock Summary
              </Typography>

              <Box className="stock-summary">
                <Box className="summary-item">
                  <Typography variant="body2">Total Products</Typography>

                  <Typography variant="h5">
                    {stockSummary.totalProducts}
                  </Typography>
                </Box>

                <Box className="summary-item">
                  <Typography variant="body2">Low Stock</Typography>

                  <Typography variant="h5">{stockSummary.lowStock}</Typography>
                </Box>

                <Box className="summary-item">
                  <Typography variant="body2">Healthy Stock</Typography>

                  <Typography variant="h5">
                    {stockSummary.healthyStock}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
