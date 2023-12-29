# Sweetr

twitter for people who cannot spell their Ts using solid js and firebaser and tailwind css

<p align="center" width="100%">
<img src="./public/logo.svg" width="250">
</p>

## Run Locally (Client)

```bash
  npm install
```

```bash
  npm run dev
```

## Run Locally (Server)

```bash
  cd api
```

```bash
  composer install
```

```bash
  php artisan migrate
```

```bash
  php artisan serve
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (dev) :

### api/.env

`APP_URL = http://localhost:8000`

`FRONTEND_URL = http://localhost:5173`

`SANCTUM_STATEFUL_DOMAINS = localhost:5173`

`SPA_URL = http://localhost:5173`

`SESSION_DOMAIN = localhost`

### .env

`VITE_BASE_URL = http://127.0.0.1:8000`

`VITE_API_URL = ${APP_URL}/api`

## Todos

- [ ] Add Form Validation
- [ ] Add More Interactions liek block, mute, etc
- [ ] Add More Profile Settings
- [ ] Add better auth system
- [ ] Add better error handling
- [ ] Add better loading states
- [ ] Refactor code and fix messy state management
- [ ] Add More Features (Planning to add a lot more features)
- [ ] Add Image Uploads
- [ ] Add Video Uploads
- [ ] Add Notifications
- [ ] Add Search
- [ ] Add Hashtags
- [ ] Add Mentions
- [ ] Add DMs
- [ ] Add Groups
- [ ] Add Stories
- [ ] Add Live Streaming
- [ ] Add Comments
