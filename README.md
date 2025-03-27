# Metro Alert

A Node.js application that monitors Lisbon Metro line status and sends email notifications when disruptions occur.

## Description

Metro Alert automatically checks the Lisbon Metro website for service disruptions on specified lines. When there's a problem, it sends an email notification to keep you informed without having to manually check the website.

## Features

- Monitors Lisbon Metro lines (Verde, Azul, Amarela, Vermelha)
- Automated web scraping using Puppeteer
- Email notifications when service disruptions are detected
- Configurable through environment variables

## Installation

1. Clone this repository:

```

git clone https://github.com/R-Camacho/metro-alert.git
cd metro-alert

```

2. Install dependencies:

```

npm install puppeteer nodemailer dotenv

```

3. Create a `.env` file in the root directory with the following content:

```

EMAIL_USER="your-gmail-address@gmail.com"
EMAIL_PASS="your-app-password" # See below for App Password instructions
TO_EMAIL="recipient@email.com"

```

## Gmail App Password Setup

Since this application uses Gmail for sending notifications, you need to set up an App Password:

1. Go to your [Google Account Security settings](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to "App passwords" section
4. Select "Mail" and "Other (Custom name)" and enter "Metro Alert"
5. Copy the generated 16-character password to your `.env` file

## Usage

### Local Usage

To check a specific line once:

```javascript
// In metroScraper.js, uncomment and modify:
checkMetroStatus('Verde'); // Options: 'Verde', 'Azul', 'Amarela', 'Vermelha'
```

Then run:

```
node metroScraper.js
```

To check multiple lines at once, modify the script to include:

```javascript
checkMetroStatus('Verde');
checkMetroStatus('Azul');
checkMetroStatus('Amarela');
checkMetroStatus('Vermelha');
```

### GitHub Actions Integration

This project includes a GitHub Actions workflow that runs every 3 hours to check the metro status automatically.

To enable this:

1. Fork this repository to your GitHub account
2. Go to your repository's Settings > Secrets and Variables > Actions
3. Add the following repository secrets:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password
   - `TO_EMAIL`: Email address to receive notifications

The workflow can also be triggered manually from the "Actions" tab in your GitHub repository.

## License

MIT

## Author

Rodrigo Camacho
