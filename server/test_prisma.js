try {
    const { PrismaClient } = require('@prisma/client');
    console.log('PrismaClient loaded successfully');
    const prisma = new PrismaClient();
    console.log('PrismaClient instance created');
} catch (e) {
    console.error(e);
}
