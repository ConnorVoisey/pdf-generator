FROM oven/bun

WORKDIR /app

RUN touch .env
COPY package.json .
COPY bun.lockb .

RUN bun install
# RUN bun install --production

COPY src src
COPY tsconfig.json .
# COPY public public

ENV NODE_ENV production
# CMD ["bun", "src/index.ts"]

EXPOSE 5173
