# Task Panda App

A mobile-first HTML/CSS/JavaScript prototype based on the supplied Task Panda screens.

## Included
- Panda-style purple/yellow UI
- YouTube daily routine video: +12 coins
- YouTube subscribe task: +120 coins
- Telegram join task: +120 coins
- WhatsApp, Facebook and Instagram buttons
- Panda mining section ⛏️
- Daily streak counter
- LocalStorage balance/progress
- Mobile bottom navigation

## Important
This is a frontend prototype. A browser cannot reliably verify that someone actually followed/subscribed/joined a social account. The buttons open the supplied pages and the demo then awards the reward.

For a real Telegram Mini App you should add:
1. Telegram Web App authentication
2. A backend/database for balances and tasks
3. Server-side anti-cheat/rate limits
4. Official APIs or permitted verification methods where available
5. A real video URL instead of the placeholder YouTube URL
6. Server-side mining/reward calculations so users cannot edit LocalStorage

## Run
Open `index.html` in a browser, or host the folder on a static website.
