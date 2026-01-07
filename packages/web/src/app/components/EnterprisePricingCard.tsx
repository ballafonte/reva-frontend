import { PricingCard } from './PricingCard';

interface EnterprisePricingCardProps {
  onClick: () => void;
}

export function EnterprisePricingCard({ onClick }: EnterprisePricingCardProps) {
  return (
    <PricingCard
      title="Enterprise"
      price="Custom"
      features={[
        'Unlimited Users',
        'Dedicated Support',
        'Custom Workflow Integrations',
        'Training Included',
      ]}
      ctaText="Contact Sales"
      onClick={onClick}
    />
  );
}
