FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json yarn.lock tsconfig.json components.json next.config.mjs postcss.config.mjs tailwind.config.ts ./

COPY prisma ./prisma/

# Install dependencies
RUN npm ci 

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]