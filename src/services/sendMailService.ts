import nodeMailer, { Transporter } from 'nodemailer';

class SendMailService {

  private client: Transporter

  constructor(){
    nodeMailer.createTestAccount().then(account => {
      // Create a SMTP transporter object
      const transporter = nodeMailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      }
    });

    // Aqui subimos o valor do transporter para o client, assim podemos usa-lo fora do contructor
    this.client = transporter;

    })
  }

  async execute(to: string, subject: string, body: string){

    const message = await this.client.sendMail({
      to,
      subject,
      html: body,
      from: "NPS <noreplay@nps.com.br>"
    })

    console.log('Message sent: %s', message.messageId);
    // Pré-visualização disponível apenas ao enviar através de uma conta Ethereal
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(message));

  }

}

export default new SendMailService();