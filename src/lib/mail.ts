const nodemailer = require('nodemailer');
export async function sendMail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'aakash2330@gmail.com',
        pass: 'wwoo aczo vepw rwne',
      }
    });
    // Email data
    const mailOptions = {
      from: 'aakash2330@gmail.com',
      to: 'aakash2330@gmail.com',
      subject: 'Registration NITTTR',
      text: 'You have successfull logged into NITTTR/hostels',
    };

    // Send the email
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
