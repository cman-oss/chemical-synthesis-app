# AI Chemical Synthesis App

An AI-powered application for predicting and analyzing chemical synthesis pathways.

## Features

- AI-powered synthesis pathway prediction
- Detailed reaction steps with conditions and reagents
- Safety information and hazard warnings
- Yield calculations and analytics
- Export functionality
- User authentication and authorization
- Subscription-based access levels

## Tech Stack

- React 18
- Vite
- Firebase Authentication
- Stripe Payments
- ASKCOS API Integration
- GitHub Actions CI/CD

## Getting Started

### Prerequisites

- Node.js 18+
- npm 8+
- Firebase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chemical-synthesis-app.git
cd chemical-synthesis-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Fill in your environment variables:
```plaintext
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=your_api_url
```

5. Start the development server:
```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Testing

```bash
npm test
```

## Deployment

The app is automatically deployed to Vercel through GitHub Actions when changes are pushed to the main branch.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- ASKCOS for synthesis predictions
- Chemical structure visualization libraries
- React community
