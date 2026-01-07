import { PricingCard } from './PricingCard';

interface ProfessionalPricingCardProps {
  onClick: () => void;
}

export function ProfessionalPricingCard({
  onClick,
}: ProfessionalPricingCardProps) {
  return (
    <PricingCard
      title="Professional"
      price="$12,295/yr"
      features={[
        'Everything in Federal Plan',
        '1 State Jurisdiction',
        null,
        null,
      ]}
      ctaText="Choose Plan"
      onClick={onClick}
    />
  );
}
