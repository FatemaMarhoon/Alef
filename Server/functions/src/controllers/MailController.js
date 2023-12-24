const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

const MailController = {

    async sendEmail(req, res) {
        const { from, to, subject, body } = req.body;
        try {
            const msg = {
                to: to,
                from: from,
                subject: subject,
                text: body,
            };

            await sgMail.send(msg)
                .then(() => {
                    return res.status(201).json({ message: 'Email Sent Successfully.' });
                })
                .catch((error) => {
                    return res.status(500).json({ message: error.message });
                });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async sendCustomPasswordResetEmail(userEmail, displayName, link) {

        const msg = {
            to: userEmail,
            from: 'alef.preschool@gmail.com',
            subject: 'Password Reset',
            text: `Hi ${displayName},
    
          Your Admin has created an account on behalf of you in Alef Web Portal, please follow the link to reset the temperory password to be able to login into your account.
      
          ${link}
      
          This link will expire in 24 hours.
      
          Sincerely,
          Alef Team`,
        };

        await sgMail.send(msg)
            .then(() => {
                console.log('Email sent successfully');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });

    },

    async sendNotificationEmail(userEmail, name, title, body) {

        const msg = {
            to: userEmail,
            from: 'alef.preschool@gmail.com',
            subject: title,
            text: `
        Hello ${name},
        You have a new notification on our portal. Here are the details:
        
          Title: ${title}
          Content: ${body}
        
        Best regards,
        Alef Team
      `,
        };

        await sgMail.send(msg)
            .then(() => {
                console.log('Email sent successfully');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });

    }
}


module.exports = MailController;