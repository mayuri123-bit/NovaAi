export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  priceMonthly: string;
  priceAnnually: string;
  popular?: boolean;
  tagline?: string;
  badge?: string;
  features: string[];
  buttonText: string;
  buttonStyle: 'primary' | 'outline';
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  metric?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
