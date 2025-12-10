import { createContext } from 'react'

export const AppContext = createContext({
  eligibilityData: null,
  setEligibilityData: () => {},
  selectedPlan: null,
  setSelectedPlan: () => {},
  enrollmentData: null,
  setEnrollmentData: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  language: 'en',
  setLanguage: () => {}
})
