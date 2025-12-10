import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProviderById } from '../data/providers'
import './ProviderDetail.css'

function ProviderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = getProviderById(id)

  if (!provider) {
    return (
      <div className="provider-detail-page">
        <div className="container">
          <div className="alert alert-warning">
            <h3>Provider Not Found</h3>
            <p>The provider you're looking for doesn't exist.</p>
            <Link to="/providers" className="btn btn-primary">
              Back to Provider Directory
            </Link>
          </div>
        </div>
      </div>
    )
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
    <div className="provider-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/providers">Provider Directory</Link>
          <span>/</span>
          <span>{provider.name}</span>
        </div>

        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back to Search
        </button>

        <div className="detail-layout">
          <div className="detail-main">
            <div className="provider-header-detail">
              <div>
                <h1>{provider.name}</h1>
                <p className="provider-specialty">{provider.specialty}</p>
                <p className="provider-type">{provider.type}</p>
              </div>
              {provider.acceptingNewPatients ? (
                <span className="badge badge-success large-badge">✓ Accepting New Patients</span>
              ) : (
                <span className="badge badge-warning large-badge">Not Accepting New Patients</span>
              )}
            </div>

            <div className="rating-section">
              <div className="stars-large">{renderStars(provider.rating)}</div>
              <span className="rating-value">{provider.rating}</span>
              <span className="rating-reviews">Based on {provider.reviewCount} reviews</span>
            </div>

            <div className="detail-card">
              <h2>About {provider.name}</h2>
              <div className="about-grid">
                <div className="about-item">
                  <strong>Organization:</strong>
                  <span>{provider.organization}</span>
                </div>
                <div className="about-item">
                  <strong>Specialty:</strong>
                  <span>{provider.specialty}</span>
                </div>
                <div className="about-item">
                  <strong>Type:</strong>
                  <span>{provider.type}</span>
                </div>
                {provider.gender !== 'N/A' && (
                  <div className="about-item">
                    <strong>Gender:</strong>
                    <span>{provider.gender}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-card">
              <h2>Services Offered</h2>
              <div className="services-grid">
                {provider.services.map((service, idx) => (
                  <div key={idx} className="service-item">
                    ✓ {service}
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-card">
              <h2>Languages Spoken</h2>
              <div className="languages-list">
                {provider.languages.map((lang, idx) => (
                  <span key={idx} className="language-tag">
                    🗣️ {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-card">
              <h2>Accessibility Features</h2>
              <div className="accessibility-grid">
                {provider.accessibility.map((feature, idx) => (
                  <div key={idx} className="accessibility-item">
                    ✓ {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="contact-card card">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>{provider.address}</p>
                  <p>{provider.city}, {provider.state} {provider.zipCode}</p>
                  {provider.distance && <p className="distance">📏 {provider.distance}</p>}
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p><a href={`tel:${provider.phone}`}>{provider.phone}</a></p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <strong>Hours</strong>
                  <p>{provider.hours}</p>
                </div>
              </div>

              <div className="contact-actions">
                <a href={`tel:${provider.phone}`} className="btn btn-primary btn-block">
                  📞 Call Now
                </a>
                <button className="btn btn-secondary btn-block">
                  📅 Request Appointment
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${provider.address}, ${provider.city}, ${provider.state} ${provider.zipCode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-block"
                >
                  🗺️ Get Directions
                </a>
              </div>
            </div>

            <div className="insurance-card card">
              <h3>Insurance Information</h3>
              <p>This provider accepts all plans offered through the Public Insurance Platform.</p>
              <ul>
                <li>✓ HealthFirst Basic</li>
                <li>✓ CareShield Plus</li>
                <li>✓ WellCare Enhanced</li>
                <li>✓ Premium Choice</li>
              </ul>
              <p className="insurance-note">
                <strong>Note:</strong> Please verify coverage when scheduling your appointment.
              </p>
            </div>

            <div className="help-card card">
              <h3>Need Help?</h3>
              <p>Questions about this provider or need assistance scheduling?</p>
              <p><strong>Call us:</strong><br />1-800-555-HEALTH</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ProviderDetail
