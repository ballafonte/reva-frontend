import { PricingCard } from './PricingCard';

interface FederalPricingCardProps {
  onClick: () => void;
}

export function FederalPricingCard({ onClick }: FederalPricingCardProps) {
  return (
    <PricingCard
      title="Federal"
      price="$9,995/yr"
      features={[
        'Appeal Letter Generator & Library',
        'Denial Topic Encyclopedia',
        'Regulatory Library',
        '20 User Accounts',
      ]}
      ctaText="Choose Plan"
      onClick={onClick}
    />
  );
}
