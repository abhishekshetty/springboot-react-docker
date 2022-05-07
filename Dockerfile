FROM openjdk:11-jre-slim

RUN apt-get update && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && curl -L https://www.npmjs.com/install.sh | sh

WORKDIR /app
EXPOSE 8080

ADD ./springboot/target/resapi-0.0.1-SNAPSHOT.jar api.jar
COPY ./react/build ./
COPY package* ./
COPY ./index.js ./indes.js
RUN npm install --only=production
COPY ./startup.sh ./startup.sh
RUN chmod +x ./startup.sh
ENTRYPOINT [ "./startup.sh" ]