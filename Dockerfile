# AstaHub — production image (Vite SPA + Express API)
# Built in two stages: build then run. Powered by Prosperity Systems Hub (ps-hub.org)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm run server:build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-server ./dist-server
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/public ./public
COPY --from=build /app/src ./src
EXPOSE 3000 4000
CMD ["sh","-c","node dist-server/server/index.js & npx vite preview --host 0.0.0.0 --port 3000 --outDir dist"]
