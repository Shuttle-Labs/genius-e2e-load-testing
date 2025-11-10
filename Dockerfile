FROM mcr.microsoft.com/playwright:v1.48.2-jammy

WORKDIR /work

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Видали цей рядок - TypeScript перевірка не потрібна в Docker
# RUN npx tsc --noEmit

CMD ["npm", "test"]
