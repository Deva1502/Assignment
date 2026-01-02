console.log('Node is working');
try {
    require('dotenv').config();
    console.log('dotenv loaded');
    const express = require('express');
    console.log('express loaded');
    const { PrismaClient } = require('@prisma/client');
    console.log('prisma client loaded');
} catch (e) {
    console.error('Import error:', e);
}
