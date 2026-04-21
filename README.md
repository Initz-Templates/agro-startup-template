## Try on Initializ
 
## On Dev 
[![Kubeday India](https://res.cloudinary.com/daosik5yi/image/upload/f_auto,q_auto/pntsnjpa1sxbc2d02q9n)](https://console.dev.initializ.ai/create-app/?clone=https://github.com/initializ-templates/agro-startup-template&repo_name=agro-startup-template&description=♾️%20Customizable%20Agriculture%20based%20Startup%20Template&github=true)
 
## On Prod 
[![Kubeday India](https://res.cloudinary.com/daosik5yi/image/upload/f_auto,q_auto/pntsnjpa1sxbc2d02q9n)](https://console.initializ.ai/create-app/?clone=https://github.com/initializ-templates/agro-startup-template&repo_name=agro-startup-template&description=♾️%20Customizable%20Agriculture%20based%20Startup%20Template&github=true)
 
## Prerequisite 
### Must have an Account on [Initializ.ai](https://console.initializ.ai/register/)<br><br>
 
#### Steps to Create Account
Step 1: [SignUp](https://console.initializ.ai/register/) <br>
<br>[![Sign Up](https://res.cloudinary.com/dd4xje8fc/image/upload/v1717773727/image_1_eaxyhp.png)](https://console.initializ.ai/register/)<br><br>
Step 2: Verify Your Email<br><br>
Step 3: [Sign In](https://console.initializ.ai/login/) <br><br>[![Sign In](https://res.cloudinary.com/dd4xje8fc/image/upload/v1717773726/image_2_pi56ah.png)](https://console.initializ.ai/login/)<br><br>
Step 4: [Deploy on Initializ](https://console.initializ.ai/create-app/?clone=https://github.com/initializ-templates/agro-startup-template&repo_name=agro-startup-template&description=♾️%20Customizable%20Agriculture%20based%20Startup%20Template&github=true)
 
 
## How To Use
 
From your command line, clone and run agro-startup-template:
 
```bash
# Clone this repository
git clone https://github.com/initializ-templates/agro-startup-template.git
 
# Go into the repository
cd agro-startup-template
 
# Setup default environment variables
 
# For Linux
cp .env.example .env
# For Windows
copy .env.example .env
 
# Install dependencies
npm install

## Backend Configuration

This project now uses strict backend APIs with no static fallback.

- Set `VITE_API_BASE_URL` in `.env`.
- Example value: `http://localhost:5000/api`
- API contract reference: `docs/API_CONTRACT.md`

## Auth Endpoints Required

To use Login/Register and role-protected farmer pages, backend should expose:

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`

Login/register responses should include:

- `token`
- `refreshToken`
- `user` with `role` (`farmer` or `customer`)

Protected frontend routes:

- `/checkout` and `/payment-success` require authenticated user.
- `/profile` requires authenticated user.
- `/admin/products/*` requires authenticated farmer user.

## Backend Setup (Mongo + Node + Express)

```bash
# From project root
cd backend

# Create backend env
cp .env.example .env
# Windows
copy .env.example .env

# Install backend dependencies
npm install

# Seed sample FarmStore users and products
npm run seed

# Run backend
npm run dev
```

Default seeded farmer credentials:

- Email: `farmer.arjun@agro.com`
- Password: `Farmer@123`
