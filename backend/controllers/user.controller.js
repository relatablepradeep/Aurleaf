import express from 'express'
const app = express();

// Route to handle OAuth callback
app.get('/auth/callback', (req, res) => {
  // Handle authentication process here
  // This route will receive the token or authorization code from OAuth provider

  // Redirect to /chat page after authentication
  res.redirect('/chat');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
