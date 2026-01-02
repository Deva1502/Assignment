const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, 'server', '.env');
const content = `MONGO_URI="mongodb+srv://Dev:Mishraji%405407@cluster0.ba8azym.mongodb.net/?appName=Cluster0"
JWT_SECRET="devanshm929_secret_key"
PORT=5000`;

fs.writeFileSync(envPath, content);
console.log('Updated .env');
