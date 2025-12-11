import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { providers, searchProviders, getUniqueSpecialties, getUniqueLanguages, getUniqueStates } from '../data/providers'
import './ProviderDirectory.css'

function ProviderDirectory() {
  const [viewMode, setViewMode] = useState('list') // 'list' or 'map'
  const [filters, setFilters] = useState({
    type: 'all',
    specialty: 'all',
    language: 'all',
    gender: 'all',
    state: 'all',
    acceptingNewPatients: false,
    searchTerm: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const specialties = getUniqueSpecialties()
  const languages = getUniqueLanguages()
  const states = getUniqueStates()

  const filteredProviders = useMemo(() => {
    return searchProviders(filters)
  }, [filters])

  const paginatedProviders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProviders.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProviders, currentPage])

  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage)

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({
      type: 'all',
      specialty: 'all',
      language: 'all',
      gender: 'all',
      state: 'all',
      acceptingNewPatients: false,
      searchTerm: ''
    })
    setCurrentPage(1)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>)
    }
    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>)
    }
    return stars
  }

  return (
    <div className="providers-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Provider Directory</span>
        </div>

        <div className="page-header">
          <h1>Find Healthcare Providers</h1>
          <p>Search our network of {providers.length}+ healthcare professionals and facilities</p>
        </div>

        <div className="providers-layout">
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filter Results</h3>
              <button className="btn-link" onClick={resetFilters}>Reset All</button>
            </div>

            <div className="filter-group">
              <label htmlFor="searchTerm" className="filter-label">Search by Name</label>
              <input
                type="text"
                id="searchTerm"
                className="form-input"
                placeholder="Doctor or facility name..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="type" className="filter-label">Provider Type</label>
              <select
                id="type"
                className="form-select"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Primary Care Physician">Primary Care</option>
                <option value="Specialist">Specialists</option>
                <option value="Hospital">Hospitals</option>
                <option value="Urgent Care">Urgent Care</option>
                <option value="Pharmacy">Pharmacies</option>
                <option value="Dentist">Dentists</option>
                <option value="Eye Care">Eye Care</option>
                <option value="Physical Therapy">Physical Therapy</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Chiropractor">Chiropractors</option>
                <option value="Alternative Medicine">Alternative Medicine</option>
                <option value="Nutrition">Nutrition</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="specialty" className="filter-label">Specialty</label>
              <select
                id="specialty"
                className="form-select"
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="language" className="filter-label">Language</label>
              <select
                id="language"
                className="form-select"
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
              >
                <option value="all">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="gender" className="filter-label">Gender</label>
              <select
                id="gender"
                className="form-select"
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="all">Any Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="state" className="filter-label">State</label>
              <select
                id="state"
                className="form-select"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              >
                <option value="all">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.acceptingNewPatients}
                  onChange={(e) => handleFilterChange('acceptingNewPatients', e.target.checked)}
                />
                <span>Accepting new patients</span>
              </label>
            </div>
          </aside>

          <div className="providers-content">
            <div className="results-header">
              <div className="results-info">
                <h3>{filteredProviders.length} Providers Found</h3>
                <p>
                  Showing {filteredProviders.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredProviders.length)} of {filteredProviders.length} results
                </p>
              </div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  ☰ List
                </button>
                <button
                  className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
                  onClick={() => setViewMode('map')}
                  aria-label="Map view"
                >
                  📍 Map
                </button>
              </div>
            </div>

            {totalPages > 1 && viewMode === 'list' && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}

            {filteredProviders.length === 0 ? (
              <div className="no-results">
                <h3>No providers found</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'list' ? (
              <>
                <div className="providers-list">
                  {paginatedProviders.map(provider => (
                    <Link key={provider.id} to={`/providers/${provider.id}`} className="provider-card">
                      <div className="provider-header">
                        <div>
                          <h3>{provider.name}</h3>
                          <p className="provider-specialty">{provider.specialty}</p>
                          <p className="provider-org">{provider.organization}</p>
                        </div>
                        {provider.acceptingNewPatients && (
                          <span className="badge badge-success">Accepting Patients</span>
                        )}
                      </div>

                      <div className="provider-rating">
                        <div className="stars">{renderStars(provider.rating)}</div>
                        <span className="rating-text">{provider.rating} ({provider.reviewCount} reviews)</span>
                      </div>

                      <div className="provider-info">
                        <div className="info-item">
                          <span className="info-icon">📍</span>
                          <span>{provider.address}, {provider.city}, {provider.state} {provider.zipCode}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-icon">📞</span>
                          <span>{provider.phone}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-icon">🕐</span>
                          <span>{provider.hours}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-icon">🗣️</span>
                          <span>{provider.languages.join(', ')}</span>
                        </div>
                        {provider.distance && (
                          <div className="info-item">
                            <span className="info-icon">📏</span>
                            <span>{provider.distance}</span>
                          </div>
                        )}
                      </div>

                      <div className="provider-accessibility">
                        {provider.accessibility.map((feature, idx) => (
                          <span key={idx} className="accessibility-tag">
                            ✓ {feature}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>
                    <span className="page-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="map-view">
                <div className="map-placeholder">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="#e6f2ff"/>
                    <path d="M50 20C38.9543 20 30 28.9543 30 40C30 54.1667 50 80 50 80C50 80 70 54.1667 70 40C70 28.9543 61.0457 20 50 20ZM50 47C45.5817 47 42 43.4183 42 39C42 34.5817 45.5817 31 50 31C54.4183 31 58 34.5817 58 39C58 43.4183 54.4183 47 50 47Z" fill="#0066cc"/>
                  </svg>
                  <h3>Interactive Map View</h3>
                  <p>In a production environment, this would display an interactive map showing provider locations.</p>
                  <p className="map-count">Showing {filteredProviders.length} providers on map</p>
                  <button className="btn btn-secondary" onClick={() => setViewMode('list')}>
                    Switch to List View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDirectory
