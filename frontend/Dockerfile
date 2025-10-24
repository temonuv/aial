FROM node:20-alpine

# This ARG will be used for the build/prune/start steps
ARG NODE_ENV=development

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Force NODE_ENV=development for this step ONLY
# This ensures devDependencies (like typescript) are installed for the build.
RUN NODE_ENV=development npm ci

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