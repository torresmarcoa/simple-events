const router = require('express').Router();

// Styled Welcome Page
router.get('/', (req, res) => {
  //#swagger.tags=['Welcome Message']
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Simple Events - Welcome</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Roboto&display=swap');

          body {
            margin: 0;
            background: linear-gradient(135deg, #667eea, #764ba2);
            font-family: 'Roboto', sans-serif;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            padding: 20px;
          }

          .logo {
            font-family: 'Poppins', sans-serif;
            font-size: 4rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            background: linear-gradient(90deg, #f7971e, #ffd200);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5em;
            user-select: none;
            cursor: default;
          }

          h1 {
            font-weight: 400;
            margin-bottom: 1.5em;
            text-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }

          .buttons {
            display: flex;
            gap: 20px;
            margin-bottom: 1.5em;
            flex-wrap: wrap;
            justify-content: center;
          }

          a.btn {
            text-decoration: none;
            background-color: #ffd200;
            color: #333;
            font-weight: 600;
            padding: 15px 40px;
            border-radius: 30px;
            box-shadow: 0 6px 12px rgba(255, 210, 0, 0.4);
            transition: background-color 0.3s ease, transform 0.2s ease;
            font-size: 1.2rem;
            user-select: none;
            min-width: 160px;
            display: inline-block;
          }

          a.btn:hover {
            background-color: #f7971e;
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(247, 151, 30, 0.6);
          }

          p.note {
            font-style: italic;
            color: rgba(255,255,255,0.7);
            max-width: 350px;
            margin: 0 auto;
            user-select: none;
          }

          footer {
            position: absolute;
            bottom: 15px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
            user-select: none;
          }
        </style>
      </head>
      <body>
        <div class="logo">SimpleEvents</div>
        <h1>Your gateway to amazing events 🚀</h1>
        <div class="buttons">
          <a href="/api-docs" class="btn" target="_blank" rel="noopener noreferrer">Explore API Docs</a>
          <a href="/auth/google" class="btn">Login with Google</a>
        </div>
        <p class="note">Feel free to explore the API documentation without logging in. When ready, log in to access full features.</p>
        <footer>© 2025 Simple Events. All rights reserved.</footer>
      </body>
      </html>

  `);
});

// Swagger Docs
router.use('/', require('./swagger'));

// Other Routes
router.use('/users', require('./userRoutes'));
router.use('/events', require('./eventRoutes'));
router.use('/auth', require('./authRoutes'));

module.exports = router;
