export const insurancePlans = [
  {
    id: 'healthfirst-basic',
    name: 'HealthFirst Basic',
    tier: 'Bronze',
    type: 'HMO',
    premium: 0,
    deductible: 0,
    outOfPocketMax: 0,
    coverageLevel: 'Comprehensive',
    networkSize: 'Large - 15,000+ providers',
    benefits: {
      preventiveCare: '100% covered, no copay',
      primaryCare: '$0 copay',
      specialist: '$5 copay',
      urgentCare: '$10 copay',
      emergency: '$50 copay',
      hospitalStay: '$0 copay',
      prescriptions: {
        generic: '$1 copay',
        brandName: '$3 copay',
        specialty: '$5 copay'
      },
      mentalHealth: '$0 copay',
      dental: 'Limited coverage included',
      vision: 'Eye exam covered annually',
      maternity: '100% covered'
    },
    features: [
      'No monthly premium',
      'No deductible',
      'Comprehensive coverage',
      'Large provider network',
      'Includes dental and vision',
      'No referrals needed for specialists',
      'Telehealth included'
    ],
    limitations: [
      'Must use in-network providers',
      'Limited out-of-state coverage',
      'Dental coverage is basic only'
    ],
    eligibility: 'Available for households up to 138% of Federal Poverty Level'
  },
  {
    id: 'careshield-plus',
    name: 'CareShield Plus',
    tier: 'Silver',
    type: 'PPO',
    premium: 75,
    deductible: 500,
    outOfPocketMax: 3000,
    coverageLevel: 'Enhanced',
    networkSize: 'Large - 20,000+ providers',
    benefits: {
      preventiveCare: '100% covered, no copay',
      primaryCare: '$15 copay',
      specialist: '$35 copay',
      urgentCare: '$50 copay',
      emergency: '$150 copay',
      hospitalStay: '$250 per day (max 5 days)',
      prescriptions: {
        generic: '$10 copay',
        brandName: '$40 copay',
        specialty: '$80 copay'
      },
      mentalHealth: '$15 copay',
      dental: 'Full coverage available',
      vision: 'Annual exam + $150 toward glasses',
      maternity: '80% covered after deductible'
    },
    features: [
      'Low monthly premium',
      'Flexible PPO network',
      'Out-of-network coverage available',
      'Enhanced dental and vision',
      'Nationwide coverage',
      'Prescription mail order option',
      '24/7 telehealth services',
      'Wellness program rewards'
    ],
    limitations: [
      'Deductible applies to most services',
      'Higher copays for specialists',
      'Out-of-network services cost more'
    ],
    eligibility: 'Available for households 138-250% of Federal Poverty Level'
  },
  {
    id: 'wellcare-enhanced',
    name: 'WellCare Enhanced',
    tier: 'Gold',
    type: 'PPO',
    premium: 200,
    deductible: 1000,
    outOfPocketMax: 5000,
    coverageLevel: 'Premium',
    networkSize: 'Very Large - 25,000+ providers',
    benefits: {
      preventiveCare: '100% covered, no copay',
      primaryCare: '$25 copay',
      specialist: '$45 copay',
      urgentCare: '$75 copay',
      emergency: '$250 copay',
      hospitalStay: '$500 per day (max 5 days)',
      prescriptions: {
        generic: '$15 copay',
        brandName: '$50 copay',
        specialty: '$100 copay'
      },
      mentalHealth: '$25 copay',
      dental: 'Comprehensive coverage',
      vision: 'Annual exam + $200 toward glasses/contacts',
      maternity: '90% covered after deductible'
    },
    features: [
      'Extensive provider network',
      'Lower out-of-pocket costs',
      'Full dental coverage included',
      'Enhanced vision benefits',
      'International coverage',
      'Free gym membership',
      'Alternative medicine coverage',
      'Prescription home delivery',
      'Care coordination services',
      'Health coaching included'
    ],
    limitations: [
      'Higher monthly premium',
      'Moderate deductible',
      'Some services require pre-authorization'
    ],
    eligibility: 'Available for households 250-400% of Federal Poverty Level'
  },
  {
    id: 'premium-choice',
    name: 'Premium Choice',
    tier: 'Platinum',
    type: 'PPO',
    premium: 350,
    deductible: 500,
    outOfPocketMax: 3000,
    coverageLevel: 'Comprehensive Plus',
    networkSize: 'Extensive - 30,000+ providers',
    benefits: {
      preventiveCare: '100% covered, no copay',
      primaryCare: '$10 copay',
      specialist: '$30 copay',
      urgentCare: '$50 copay',
      emergency: '$150 copay',
      hospitalStay: '$250 per day (max 3 days)',
      prescriptions: {
        generic: '$5 copay',
        brandName: '$25 copay',
        specialty: '$50 copay'
      },
      mentalHealth: '$10 copay',
      dental: 'Premium coverage with orthodontics',
      vision: 'Annual exam + $250 toward eyewear',
      maternity: '100% covered after deductible'
    },
    features: [
      'Lowest out-of-pocket costs',
      'Premium provider network',
      'Comprehensive dental with orthodontics',
      'Top-tier vision benefits',
      'Global coverage',
      'Concierge care coordination',
      'Virtual care platform',
      'Mental health and wellness programs',
      'Chronic disease management',
      'Fitness and nutrition counseling',
      'Acupuncture and chiropractic care',
      'No pre-authorization required'
    ],
    limitations: [
      'Highest monthly premium',
      'May have more coverage than needed'
    ],
    eligibility: 'Available for all income levels'
  }
]

export const getPlanById = (id) => {
  return insurancePlans.find(plan => plan.id === id)
}

export const comparePlans = (planIds) => {
  return planIds.map(id => getPlanById(id)).filter(Boolean)
}
