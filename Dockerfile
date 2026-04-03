# Step 1: Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
# Peer dependencies issues ko bypass karne ke liye
RUN npm install --legacy-peer-deps 
COPY . .
# Warnings ko error na banane ke liye CI=false
RUN CI=false npm run build 

# Step 2: Production Stage
FROM nginx:stable-alpine
# Vite default dist folder use karta hai, wahi copy hoga
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
