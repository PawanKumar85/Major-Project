export const courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <title>Course Enrollment Confirmation</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: 'Roboto', Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #202124;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 480px;
          margin: 0 auto;
          padding: 24px;
          text-align: center;
          border: 1px solid #dadce0;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    
        .logo {
          max-width: 120px;
          margin-bottom: 16px;
        }
    
        .message {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 16px;
        }
    
        .body {
          font-size: 16px;
          margin-bottom: 24px;
        }
    
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #1a73e8;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
    
        .support {
          font-size: 14px;
          color: #5f6368;
          margin-top: 20px;
        }
    
        .footer {
          font-size: 12px;
          color: #80868b;
          margin-top: 24px;
        }
      </style>
    
    </head>
    
    <body>
      <div class="container">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Edusphare Logo">
        <div class="message">Welcome to Your Course!</div>
        <div class="body">
          <p>Hello ${name},</p>
          <p>You have successfully enrolled in the course <span style="font-weight: bold;">"${courseName}"</span>.</p>
          <p>Start learning today by accessing your dashboard:</p>
          <a class="cta" href="#">Go to Dashboard</a>
        </div>
        <div class="support">For any questions, visit the <a href="#" target="_blank">Edusphare Help Center</a>.</div>
        <div class="footer">© 2025 Eduspahe Edu Tech, Kanpur, Mandhana Uttar Pradesh India</div>
      </div>
    </body>
    
    </html>`;
};
