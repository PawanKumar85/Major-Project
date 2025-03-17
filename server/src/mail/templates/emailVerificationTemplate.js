export const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
	  <meta charset="UTF-8">
	  <title>EduSpahe OTP Verification</title>
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
	
		.otp {
		  font-size: 24px;
		  font-weight: bold;
		  color: #1a73e8;
		  margin: 20px 0;
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
		<img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Eduspahre Logo">
		<div class="message">Verify your Edusphare Account</div>
		<div class="body">
		  <p>Hello,</p>
		  <p>Use the following verification code to complete your sign-in or account verification process:</p>
		  <div class="otp">${otp}</div>
		  <p>This code will expire in 5 minutes. If you didn’t request this code, you can ignore this email.</p>
		</div>
		<div class="support">If you have any questions, visit the <a href="https://support.google.com" target="_blank">Edusphare Help Center</a>.</div>
		<div class="footer">© 2025 Eduspahe Edu Tech, Kanpur, Mandhana Uttar Pradesh India</div>
	  </div>
	</body>
	
	</html>`;
  };
  