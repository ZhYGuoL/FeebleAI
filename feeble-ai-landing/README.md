# FeebleAI Landing Page

A modern, responsive landing page for FeebleAI, an automation agency that helps businesses automate their workflows and focus on what truly matters.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Sections for showcasing the company's process, tools, and team
- Built with React and styled-components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/feeble-ai-landing.git
cd feeble-ai-landing
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
feeble-ai-landing/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── index.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Process.js
│   │   ├── Tools.js
│   │   ├── Value.js
│   │   ├── Team.js
│   │   └── Footer.js
│   ├── App.js
│   ├── GlobalStyles.js
│   └── index.js
└── package.json
```

## Customization

### Adding Team Members

To add or update team members, edit the `teamMembers` array in `src/components/Team.js`:

```javascript
const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'CEO & Founder',
    bio: 'Automation expert with 10+ years of experience...',
    image: placeholderPerson
  },
  // Add more team members here
];
```

### Updating Tools

To update the tools showcased, edit the `tools` array in `src/components/Tools.js`:

```javascript
const tools = [
  { name: 'Google', logo: googleLogo },
  { name: 'Airtable', logo: airtableLogo },
  // Add more tools here
];
```

## Deployment

To build the app for production:

```bash
npm run build
# or
yarn build
```

This will create a `build` folder with optimized production files that can be deployed to any static hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
