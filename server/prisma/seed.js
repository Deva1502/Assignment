const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create Demo User
    const password = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            email: 'demo@example.com',
            name: 'Demo User',
            password,
        },
    });

    console.log({ user });

    // Create Games
    const games = [
        // Sports
        {
            type: 'SPORTS',
            name: 'IPL Final',
            sport: 'Cricket',
            category: 'IPL',
            teamA: 'CSK',
            teamB: 'MI',
            startTime: new Date('2026-05-25T14:00:00Z'),
        },
        {
            type: 'SPORTS',
            name: 'Premier League Match',
            sport: 'Football',
            category: 'EPL',
            teamA: 'Man Utd',
            teamB: 'Liverpool',
            startTime: new Date('2026-01-10T20:00:00Z'),
        },
        {
            type: 'SPORTS',
            name: 'Wimbledon Final',
            sport: 'Tennis',
            category: 'Grand Slam',
            teamA: 'Alcaraz',
            teamB: 'Djokovic',
            startTime: new Date('2026-07-12T13:00:00Z'),
        },
        // Casino
        {
            type: 'CASINO',
            name: 'Starburst',
            provider: 'NetEnt',
            category: 'Slots',
        },
        {
            type: 'CASINO',
            name: 'Lightning Roulette',
            provider: 'Evolution',
            category: 'Live Casino',
        },
        {
            type: 'CASINO',
            name: 'Blackjack VIP',
            provider: 'Pragmatic Play',
            category: 'Table Games',
        },
        {
            type: 'CASINO',
            name: 'Aviator',
            provider: 'Spribe',
            category: 'Crash Games',
        },
    ];

    for (const game of games) {
        await prisma.game.create({ data: game });
    }

    console.log('Seeded games');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
