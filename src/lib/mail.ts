import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import nodeMailer from 'nodemailer';

type TmailOptions = {
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string
}
export async function sendMail({ subject, text, templatePath }: { subject: string, text: string, templatePath?: any }) {
  try {
    const transporter = nodeMailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'aakash2330@gmail.com',
        pass: 'wwoo aczo vepw rwne',
      }
    });
    // Email data
    const mailOptions: TmailOptions = {
      from: 'aakash2330@gmail.com',
      to: 'aakash2330@gmail.com',
      subject,
      text,
      html: ''
    };
    if (templatePath) {

      const __dirname = path.resolve();
      const filePath = path.join(__dirname, templatePath);
      console.log({ filePath })
      const source = fs.readFileSync(filePath, 'utf-8').toString();
      const template = handlebars.compile(source);
      const replacements = {};
      const htmlToSend = template(replacements);
      mailOptions.html = htmlToSend

    }
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
