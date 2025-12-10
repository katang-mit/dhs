# Department of Health Services - Public Insurance Platform

A modern, fully functional demo website for a fictional Department of Health Services Public Insurance Platform. This application provides a comprehensive health insurance enrollment and management experience.

## Features

### 1. Eligibility Screening & Enrollment System
- Multi-step eligibility questionnaire
- Collects household information, income, and special circumstances
- Instant eligibility determination based on Federal Poverty Level
- Identifies qualifying programs (Medicaid, CHIP, Marketplace plans)
- Complete enrollment application with document upload simulation
- Digital signature capture
- Application confirmation with tracking number

### 2. Plan Comparison & Selection
- 4 detailed insurance plan tiers (Bronze, Silver, Gold, Platinum)
- Interactive comparison table for side-by-side plan analysis
- Detailed breakdown of benefits, coverage, and costs
- Plan selection with automatic cart management
- Comprehensive plan details including:
  - Monthly premiums and deductibles
  - Provider network information
  - Coverage for medical services, prescriptions, dental, and vision
  - Plan features and limitations

### 3. Provider Directory
- Searchable database of 50+ healthcare providers
- Advanced filtering by:
  - Provider type (Primary Care, Specialists, Hospitals, etc.)
  - Specialty
  - Language
  - Gender
  - Accepting new patients
  - Location
- Both list and map view options
- Detailed provider profiles with:
  - Contact information
  - Services offered
  - Hours of operation
  - Patient ratings and reviews
  - Accessibility features
  - Insurance acceptance
- Pagination for large result sets

### 4. Document Center (Member Portal)
- Mock login system (accepts any credentials for demo)
- Digital insurance card (downloadable and printable)
- Organized document library:
  - Coverage documents and policy details
  - Explanation of Benefits (EOB) samples
  - Tax forms (1095-B)
  - Educational resources
- Search and filter functionality
- Document preview and download capabilities

## Technical Stack

- **Framework:** React 18.2
- **Routing:** React Router DOM 6.20
- **Build Tool:** Vite 5.0
- **Styling:** Pure CSS with CSS Variables
- **State Management:** React Context API and hooks
- **Data Persistence:** localStorage
- **No external UI libraries** - All components built from scratch

## Key Technical Features

- Single-page application architecture
- Client-side routing for seamless navigation
- Responsive design (mobile, tablet, desktop)
- Accessibility-compliant (WCAG guidelines)
- Form validation throughout
- Progress indicators for multi-step processes
- Loading states and error handling
- LocalStorage persistence for user data
- Print-friendly pages
- High contrast and semantic HTML

## Installation

1. **Clone or download the project**
   ```bash
   cd dhs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build:

```bash
npm run preview
```

## Project Structure

```
dhs/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── EligibilityQuestionnaire.jsx
│   │   ├── EligibilityQuestionnaire.css
│   │   ├── EligibilityResults.jsx
│   │   ├── EligibilityResults.css
│   │   ├── EnrollmentApplication.jsx
│   │   ├── EnrollmentApplication.css
│   │   ├── PlanComparison.jsx
│   │   ├── PlanComparison.css
│   │   ├── ProviderDirectory.jsx
│   │   ├── ProviderDirectory.css
│   │   ├── ProviderDetail.jsx
│   │   ├── ProviderDetail.css
│   │   ├── MemberLogin.jsx
│   │   ├── MemberLogin.css
│   │   ├── DocumentCenter.jsx
│   │   └── DocumentCenter.css
│   ├── data/             # Sample data
│   │   ├── plans.js
│   │   └── providers.js
│   ├── context/          # React context
│   │   └── AppContext.js
│   ├── App.jsx           # Main app component
│   ├── App.css
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Complete User Journey

1. **Check Eligibility**
   - Navigate to "Check Eligibility"
   - Complete the 5-step questionnaire
   - Receive instant eligibility results

2. **Compare Plans**
   - View eligible health insurance programs
   - Navigate to "Compare Plans"
   - Review plan details side-by-side
   - Select a plan

3. **Find Providers**
   - Search the provider directory
   - Filter by specialty, location, language
   - View detailed provider profiles
   - Get contact information

4. **Enroll**
   - Complete enrollment application
   - Upload required documents (simulated)
   - Sign digitally
   - Receive confirmation

5. **Access Member Portal**
   - Login (any credentials work for demo)
   - View digital insurance card
   - Download documents
   - Access resources

## Sample Data

### Insurance Plans
- **HealthFirst Basic** (Bronze) - FREE, Medicaid equivalent
- **CareShield Plus** (Silver) - $75/month, subsidized marketplace
- **WellCare Enhanced** (Gold) - $200/month, premium coverage
- **Premium Choice** (Platinum) - $350/month, comprehensive plus

### Providers
50+ fictional healthcare providers including:
- Primary Care Physicians
- Specialists (Cardiology, Orthopedics, Dermatology, etc.)
- Hospitals
- Urgent Care Centers
- Pharmacies
- Dentists
- Mental Health Professionals
- Alternative Medicine Practitioners

## Design Philosophy

### Government-Appropriate Styling
- Clean, trustworthy color scheme (blues and greens)
- Professional typography
- High accessibility and contrast
- Clear call-to-action buttons
- Generous whitespace
- Mobile-first responsive design

### Accessibility
- Semantic HTML throughout
- ARIA labels where appropriate
- Keyboard navigation support
- High color contrast ratios
- Screen reader friendly
- Clear focus indicators

### User Experience
- Clear navigation and breadcrumbs
- Progress indicators for multi-step processes
- Helpful tooltips for complex terms
- Error messages with clear guidance
- Loading states for async operations
- Success confirmations

## Mock Login Credentials

For demo purposes, the member portal accepts **any username and password combination**. Simply enter any text in both fields to access the document center.

## Edge Cases Handled

- No eligibility for programs → Shows marketplace options and resources
- Failed searches → Clear messaging with reset options
- Form validation errors → Inline error messages
- Empty states → Helpful guidance
- Loading states → Visual feedback
- Providers not accepting patients → Clear badge indication

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

### State Management
The application uses React Context API for global state management, managing:
- Eligibility data
- Selected insurance plan
- Enrollment application data
- Login status
- Language preference (UI toggle)

### Data Persistence
User data persists across page refreshes using localStorage:
- Eligibility results
- Selected plan
- Enrollment data
- Login status

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Future Enhancements

Potential features for a production version:
- Backend API integration
- Real authentication and authorization
- Actual file upload processing
- Email notifications
- Payment processing
- Live chat integration
- Multi-language support (full translation)
- Interactive maps with geocoding
- Appointment scheduling
- Claims management
- Premium payment portal

## License

This is a demonstration project for educational purposes. Not affiliated with any government agency.

## Contact

For questions or support regarding this demo:
- Demo Email: info@dhspublicinsurance.gov
- Demo Phone: 1-800-555-HEALTH (4325)

---

**Note:** This is a fully functional demo application. All data is fictional and for demonstration purposes only.
