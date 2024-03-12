FROM node:20-alpine as build

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Docker build args and environment variables
ARG ENVIRONMENT
ARG VERSION
ARG VITE_ENVIRONMENT=${ENVIRONMENT}
ARG VITE_VERSION=${VERSION}

# Set env variables
ARG VITE_SENTRY_DSN=
ARG NODE_ENV=production

RUN yarn build

# Caddy stage
FROM caddy:2.6-alpine

# Copy Caddyfile
COPY ./caddy/Caddyfile /etc/caddy/Caddyfile

# Copy built files from the build stage
COPY --from=build /app/dist /srv

# Expose port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget -qO- http://localhost/ || exit 1