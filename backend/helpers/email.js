import nodemailer from "nodemailer"

export const emailRegistro= async(datos) => {
    const{email, nombre, token} = datos

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "2ff43ea992738f",
        pass: "afa699749bcb22"
        }
    });

    //Informacion del email
    const info = await transport.sendMail({
        from: '"UpTask - Comprueba tu Cuenta"<cuentas@uptask.com>',
        to: email,
        subject:"Uptask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola:${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        </p> 
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje </p>
        `,
    })

        
}