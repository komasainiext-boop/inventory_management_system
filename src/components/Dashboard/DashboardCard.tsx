import { Card, CardContent, Typography } from "@mui/material";

import type { DashboardCard as DashboardCardData } from "../../types/dashboard";

interface DashboardCardProps {
  card: DashboardCardData;
}

const DashboardCard = ({ card }: DashboardCardProps): React.ReactElement => {
  return (
    <Card className="dashboard-card">
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {card.title}
        </Typography>

        <Typography variant="h4" className="dashboard-card-value">
          {card.value}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
