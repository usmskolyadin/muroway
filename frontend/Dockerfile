FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

FROM node:20-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

EXPOSE 3000
CMD ["npm", "start"]
