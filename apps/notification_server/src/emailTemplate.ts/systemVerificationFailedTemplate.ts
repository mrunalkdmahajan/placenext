export const systemVerificationFailedTemplate = (
  email: string,
  studentName: string,
  documentError: string
) => {
  return {
    from: {
      name: "Laxmi Crate Industries",
      address: process.env.EMAIL!,
    },
    to: email,
    subject: "System Verification Failed - Laxmi Crate Industries",
    html: `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e0e0e0;
      }
      .header h1 {
        color: #333;
        font-size: 24px;
        margin: 0;
      }
      .content {
        padding: 20px 0;
      }
      .content p {
        color: #666;
        line-height: 1.5;
      }
      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 12px 25px;
        background-color: #56b280;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s;
        text-align: center;
      }
      .button:hover {
        background-color: #3e855f;
      }
      .footer {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;
      }
      .footer p {
        color: #999;
        font-size: 12px;
      }
    </style>
    <body>
      <div class="container">
        <div class="header">
          <h1>System Verification Failed</h1>
        </div>
        <div class="content">
          <p>Dear ${studentName},</p>
          <p>Please fill the form as soon as possible. Document failed: ${documentError}</p>
          <p>If you have any questions or need further assistance, please feel free to reach out to us.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Laxmi Crate Industries. All rights reserved.</p>
        </div>
      </div>
    </body>
    `,
  };
};
