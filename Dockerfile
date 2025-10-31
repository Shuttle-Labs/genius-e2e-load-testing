# === 1. Base image ===
# MCR = Microsoft Container Registry.
# Contains Node.js, Chromium, Firefox, WebKit, and Xvfb for headful tests.
FROM mcr.microsoft.com/playwright:v1.48.2-jammy

# === 2. Working directory inside the container ===
WORKDIR /work

# === 3. Copying package.json and package-lock.json ===
# This allows caching npm install between builds (if dependencies haven't changed).
COPY package*.json ./

# === 4. Install dependencies ===
# npm ci — clean install from lock file, ideal for CI/CD and Docker.
RUN npm ci

# === 5. Copying the rest of the project into the container ===
COPY . .

# === 6. Installing Playwright browsers (if not already installed) ===
RUN npx playwright install --with-deps

# === 7. Default command ===
# Just open bash (so you can run npm commands).
CMD ["bash"]
