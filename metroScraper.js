require('dotenv').config();

const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

const METRO_URL = 'https://www.metrolisboa.pt/';

// always use capital letter for the line
const checkMetroStatus = async (line) => {
  const status_div_id = `#texto${line}`;

  try {
    console.log('[LOG]: Fetching status...');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // For GitHub Actions, we need to disable the sandbox
      // In local environment, the default options should work fine
    });
    const page = await browser.newPage();
    await page.goto(METRO_URL);

    // Wait for the element to be present
    await page.waitForSelector(status_div_id);

    const lineStatus = await page.$eval(status_div_id, (el) => el.textContent.trim());

    console.log(`Extracted status: ${lineStatus}`);

    await browser.close();
    if (!lineStatus) {
      console.log('[ERROR]: Status not found! The structure might have changed.');
      return;
    }

    if (lineStatus.toLowerCase().includes('normal')) {
      console.log(`[INFO]: A Linha ${line} está normal.`);
    } else {
      console.log(`[ALERT]: A ${line} está com perturbações!`);
      sendEmailNotification(lineStatus, line);
    }
  } catch (error) {
    console.error('[ERROR]: Error fetching metro status:', error);
  }
};

const sendEmailNotification = (status, line) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: `Alerta: Linha ${line}`,
    text: `Atenção: A ${line} está com problemas: ${status}`,
  };
  console.log('[LOG]: Sending email...');
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('[ERROR]: Error sending email:', error);
      return;
    } else {
      console.log('[LOG]: Email sent:', info.response);
    }
  });
};

checkMetroStatus('Verde');
