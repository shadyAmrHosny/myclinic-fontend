FROM node:16.14
WORKDIR /app
COPY package*.json ./

RUN npm install

RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi
RUN if [ ! -d "/app/.angular" ]; then mkdir /app/.angular; fi
ENV API_URL=https://my-clinic-backend-git-shadyamr24-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/

RUN chown -R 1008230000:0 /.npm
RUN chown -R 1008230000:0 /app/.angular
USER 1008230000
COPY . .
RUN chown -R 1008230000:0 /app/src/environments/environment.ts
RUN sed -i "s|DEFAULT_API_URL|$API_URL|g" /app/src/environments/environment.ts
CMD ["npm", "start"]
