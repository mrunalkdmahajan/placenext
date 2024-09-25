import nodemailer from "nodemailer";

export async function sendEmail(
  email: string,
  token: string,
  username: string,
  template: any
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    // test
    const info = await transporter.sendMail(template(email, username, token));
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}

// export async function sendOrderEmailAdmin(
//   email: string,
//   username: string,
//   orderId: string,
//   orderDate: Date,
//   totalAmount: number,
//   orderItems: { name: string; quantity: number; price: number }[],
//   template: any
// ) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.APP_PASSWORD,
//       },
//     });
//     const info = await transporter.sendMail(
//       template(
//         "laxmicrateindustries1968@gmail.com",
//         username,
//         email,
//         orderId,
//         orderDate,
//         orderItems,
//         totalAmount
//       )
//     );
//   } catch (error: any) {
//     console.error(`Error: ${error.message}`);
//   }
// }
