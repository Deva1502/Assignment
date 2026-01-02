const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Game = require('./models/Game');
const Favorite = require('./models/Favorite');

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Favorite.deleteMany({});
        await Game.deleteMany({});
        console.log('Cleared existing games and favorites');

        const games = [
            {
                type: 'SPORTS',
                name: 'IPL Final 2026: CSK vs MI',
                sport: 'Cricket',
                category: 'IPL',
                teamA: 'CSK',
                teamB: 'MI',
                startTime: new Date('2026-05-25T14:00:00Z'),
                image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop'
            },
            {
                type: 'SPORTS',
                name: 'India vs Australia: Boxing Day Test',
                sport: 'Cricket',
                category: 'Test Match',
                teamA: 'India',
                teamB: 'Australia',
                startTime: new Date('2026-12-26T00:00:00Z'),
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop'
            },
            {
                type: 'SPORTS',
                name: 'T20 World Cup: Eng vs NZ',
                sport: 'Cricket',
                category: 'T20 WC',
                teamA: 'England',
                teamB: 'New Zealand',
                startTime: new Date('2026-10-15T10:00:00Z'),
                image: 'https://femalecricket.com/wp-content/uploads/2025/10/england-vs-new-zealand-womens-world-cup-2025-preview.jpg'
            },
            {
                type: 'SPORTS',
                name: 'Champions League Final',
                sport: 'Football',
                category: 'UEFA',
                teamA: 'Real Madrid',
                teamB: 'Man City',
                startTime: new Date('2026-05-30T19:00:00Z'),
                image: 'https://upload.wikimedia.org/wikipedia/en/2/21/2020_UEFA_Champions_League_Final_programme.jpg'
            },
            {
                type: 'SPORTS',
                name: 'Premier League: Arsenal vs Spurs',
                sport: 'Football',
                category: 'EPL',
                teamA: 'Arsenal',
                teamB: 'Tottenham',
                startTime: new Date('2026-03-14T15:00:00Z'),
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtjma1awcVlTQ3gQ4sYjHcVvzTj8L3FccNQ&s'
            },
            {
                type: 'SPORTS',
                name: 'El Clasico',
                sport: 'Football',
                category: 'La Liga',
                teamA: 'Barcelona',
                teamB: 'Real Madrid',
                startTime: new Date('2026-04-10T19:00:00Z'),
                image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1000&auto=format&fit=crop'
            },
            {
                type: 'SPORTS',
                name: 'Wimbledon Men\'s Final',
                sport: 'Tennis',
                category: 'Grand Slam',
                teamA: 'Alcaraz',
                teamB: 'Sinner',
                startTime: new Date('2026-07-12T13:00:00Z'),
                image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop'
            },
            {
                type: 'SPORTS',
                name: 'NBA Finals Game 7',
                sport: 'Basketball',
                category: 'NBA',
                teamA: 'Lakers',
                teamB: 'Celtics',
                startTime: new Date('2026-06-18T01:00:00Z'),
                image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop'
            },
            {
                type: 'CASINO',
                name: 'Starburst',
                provider: 'NetEnt',
                category: 'Slots',
                image: 'https://s.pnimg.net/FYsN2VKB2z53yWpEYnRFa9NWdGX_arSuzSkaQTAQG0g/pr:article-body/aHR0cHM6Ly9wbmlt/Zy5uZXQvdy9zaXRl/bWFwLWF0dGFjaG1l/bnRzLzAvNjZlLzJk/ODA4YmQ3NmEucG5n.webp'
            },
            {
                type: 'CASINO',
                name: 'Book of Dead',
                provider: 'Play\'n GO',
                category: 'Slots',
                image: 'https://s.pnimg.net/ELsO0aN2PJjDYOWnUbk3qZu6u6ZF0MpoqulCdP2yOzI/pr:article-body/aHR0cHM6Ly9wbmlt/Zy5uZXQvdy9zaXRl/bWFwLWF0dGFjaG1l/bnRzLzAvNjVmLzQz/YTRkZThhZTgucG5n.webp'
            },
            {
                type: 'CASINO',
                name: 'Gonzo\'s Quest',
                provider: 'NetEnt',
                category: 'Slots',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGisCVMZi012mAfno-Ll_PcW2Gp5Nem0s2Jg&s'
            },
            {
                type: 'CASINO',
                name: 'Lightning Roulette',
                provider: 'Evolution',
                category: 'Live Casino',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU39J6nz-lxxxojrLX5Til_pbvk4nZ3c1dZg&s'
            },
            {
                type: 'CASINO',
                name: 'Crazy Time',
                provider: 'Evolution',
                category: 'Game Shows',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQwlptymc-bUtCQ7QdOlV5g8qEehl56QeOQ&s'
            },
            {
                type: 'CASINO',
                name: 'Blackjack VIP',
                provider: 'Pragmatic Play',
                category: 'Table Games',
                image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1000&auto=format&fit=crop'
            },
            {
                type: 'CASINO',
                name: 'Aviator',
                provider: 'Spribe',
                category: 'Crash Games',
                image: 'https://spribe.co/assets/images/games/carousel/av-01.jpg'
            }
        ];

        await Game.insertMany(games);
        console.log(`Seeded ${games.length} games`);

        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
