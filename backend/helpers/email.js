import nodemailer from "nodemailer"

export const emailRegistro= async(datos) => {
    const{email, nombre, token} = datos

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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

export const emailOlvidePassword= async(datos) => {
    const{email, nombre, token} = datos

    // Looking to send emails in production? Check out our Email API/SMTP product!

    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

    //Informacion del email
    const info = await transport.sendMail({
        from: '"UpTask - Comprueba tu Cuenta"<cuentas@uptask.com>',
        to: email,
        subject:"Uptask - Reestablece tu Password",
        text: "Comprueba tu Password cuenta en UpTask",
        html: `<p>Hola:${nombre} has solicitado reestablecer tu password</p>
        <p>Dar cliclk en el siguiente enlace para generar un nuevo password:</p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password</a>
        <p>Si tu no solicitaste el email, puedes ignorar el mensaje </p>
        `,
    })

        
}