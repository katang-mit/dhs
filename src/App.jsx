import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import EligibilityQuestionnaire from './pages/EligibilityQuestionnaire'
import EligibilityResults from './pages/EligibilityResults'
import EnrollmentApplication from './pages/EnrollmentApplication'
import PlanComparison from './pages/PlanComparison'
import ProviderDirectory from './pages/ProviderDirectory'
import ProviderDetail from './pages/ProviderDetail'
import MemberLogin from './pages/MemberLogin'
import DocumentCenter from './pages/DocumentCenter'
import FAQ from './pages/FAQ'
import { AppContext } from './context/AppContext'
import './App.css'

function App() {
  const [eligibilityData, setEligibilityData] = useState(() => {
    const saved = localStorage.getItem('eligibilityData')
    return saved ? JSON.parse(saved) : null
  })

  const [selectedPlan, setSelectedPlan] = useState(() => {
    const saved = localStorage.getItem('selectedPlan')
    return saved ? JSON.parse(saved) : null
  })

  const [enrollmentData, setEnrollmentData] = useState(() => {
    const saved = localStorage.getItem('enrollmentData')
    return saved ? JSON.parse(saved) : null
  })

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn')
    return saved === 'true'
  })

  const [language, setLanguage] = useState('en')

  useEffect(() => {
    if (eligibilityData) {
      localStorage.setItem('eligibilityData', JSON.stringify(eligibilityData))
    }
  }, [eligibilityData])

  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan))
    }
  }, [selectedPlan])

  useEffect(() => {
    if (enrollmentData) {
      localStorage.setItem('enrollmentData', JSON.stringify(enrollmentData))
    }
  }, [enrollmentData])

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString())
  }, [isLoggedIn])

  const contextValue = {
    eligibilityData,
    setEligibilityData,
    selectedPlan,
    setSelectedPlan,
    enrollmentData,
    setEnrollmentData,
    isLoggedIn,
    setIsLoggedIn,
    language,
    setLanguage
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eligibility" element={<EligibilityQuestionnaire />} />
              <Route path="/eligibility/results" element={<EligibilityResults />} />
              <Route path="/enrollment" element={<EnrollmentApplication />} />
              <Route path="/plans" element={<PlanComparison />} />
              <Route path="/providers" element={<ProviderDirectory />} />
              <Route path="/providers/:id" element={<ProviderDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<MemberLogin />} />
              <Route path="/member/documents" element={
                isLoggedIn ? <DocumentCenter /> : <Navigate to="/login" />
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default App
