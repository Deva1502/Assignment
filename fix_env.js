const fs = require('fs');
const content = `DATABASE_URL="postgres://9ebada0c4e9b3bd6545edda68d4cf14e5824403530d439b89fe60e3227cf145d:sk_Xq8vNKrPyb85sU8aIc12J@db.prisma.io:5432/postgres?sslmode=require"
PORT=5000
JWT_SECRET="devanshm929_secret_key"
`;
fs.writeFileSync('server/.env', content);
console.log('.env written');
