FROM node

WORKDIR /app
COPY . .
RUN npm i 
CMD ["tail","-f","/dev/null"] 