FROM node:20-alpine

ARG NODE_ENV=development

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Always install ALL deps for build (TS needed for next.config.ts)
RUN npm ci  # Full install: Prod + dev for build/transpile

# Copy the rest of the code
COPY . .

# Build if prod (uses TS for config, Turbopack for speed)
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build && \
      npm prune --production && \
      npm cache clean --force; \
    fi

EXPOSE 3000

# Default command: dev in dev, start in prod
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run dev; fi"]