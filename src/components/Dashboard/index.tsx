import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';

import './Dashboard.css';

interface DashboardCard {
  id: string;
  title: string;
  value: number;
  description: string;
}

const dashboardCards: DashboardCard[] = [
  {
    id: 'total-products',
    title: 'Total Products',
    value: 248,
    description: 'Products currently in inventory',
  },
  {
    id: 'low-stock',
    title: 'Low Stock',
    value: 18,
    description: 'Products need restocking',
  },
  {
    id: 'orders',
    title: 'Orders',
    value: 76,
    description: 'Orders processed this month',
  },
  {
    id: 'users',
    title: 'Users',
    value: 32,
    description: 'Registered system users',
  },
];

const getCardIcon = (id: string): React.ReactElement => {
  switch (id) {
    case 'total-products':
      return <Inventory2OutlinedIcon aria-hidden="true" />;

    case 'low-stock':
      return <WarningAmberOutlinedIcon aria-hidden="true" />;

    case 'orders':
      return <ShoppingCartOutlinedIcon aria-hidden="true" />;

    case 'users':
      return <PeopleOutlineOutlinedIcon aria-hidden="true" />;

    default:
      return <Inventory2OutlinedIcon aria-hidden="true" />;
  }
};

const Dashboard = (): React.ReactElement => {
  return (
    <Box
      component="main"
      className="dashboard-page"
      aria-labelledby="dashboard-title"
    >
      <Box className="dashboard-header">
        <Typography
          id="dashboard-title"
          component="h1"
          variant="h4"
          className="dashboard-title"
        >
          Inventory Dashboard
        </Typography>

        <Typography
          component="p"
          variant="body1"
          className="dashboard-description"
        >
          Overview of your inventory management system
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        aria-label="Inventory statistics"
      >
        {dashboardCards.map(
          (card: DashboardCard): React.ReactElement => (
            <Grid
              key={card.id}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Card
                component="article"
                className="dashboard-card"
                elevation={2}
              >
                <CardContent className="dashboard-card-content">
                  <Box
                    className="dashboard-card-icon"
                    aria-hidden="true"
                  >
                    {getCardIcon(card.id)}
                  </Box>

                  <Typography
                    component="h2"
                    variant="h6"
                    className="dashboard-card-title"
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    component="p"
                    variant="h3"
                    className="dashboard-card-value"
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    component="p"
                    variant="body2"
                    className="dashboard-card-description"
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;