FROM node:12.14.0-alpine AS builder

RUN mkdir /build

COPY . /build

WORKDIR /build

RUN npm install && npm run build


FROM node:12.14.0-alpine

RUN mkdir /app
RUN addgroup -S appuser && adduser -S appuser -G appuser

COPY ./package.json /app/
COPY --from=builder /build/dist /app/

WORKDIR /app

RUN npm install --only=prod

RUN chown -R appuser:appuser /app

USER appuser

#CMD [ "node", "." ]