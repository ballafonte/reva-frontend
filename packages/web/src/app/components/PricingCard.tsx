import { Card, CardContent, Typography, Box } from '@mui/material';
import { Button } from '@/components/ui';

export type PricingCardProps = {
  title: string;
  price: string;
  features: (string | null)[];
  ctaText: string;
  onClick: () => void;
};

export function PricingCard({
  title,
  price,
  features,
  ctaText,
  onClick,
}: PricingCardProps) {
  return (
    <Card
      sx={{
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="h4" component="p" sx={{ fontWeight: 700, mb: 2 }}>
          {price}
        </Typography>
        <Box
          component="ul"
          sx={{
            textAlign: 'left',
            mt: 2,
            mb: 3,
            pl: 2,
            '& li': {
              mb: 1,
            },
          }}
        >
          {features.map((feature, index) =>
            feature === null ? (
              <Box key={index} sx={{ height: '1.5rem', mb: 1 }} />
            ) : (
              <li key={index}>{feature}</li>
            )
          )}
        </Box>
        <Button
          variant="contained"
          onClick={onClick}
          fullWidth
          sx={{
            py: 2,
          }}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
