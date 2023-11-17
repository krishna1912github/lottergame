This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Lottery Game - Player and Operator Components
The Lottery Game is a web application that simulates the experience of participating in a lottery. The game is divided into two main components: Player and Operator. Each component plays a crucial role in the functionality and flow of the game.

Player Component
The Player component is designed to provide an interactive and user-friendly interface for players to engage with the lottery. It offers several key functionalities to enhance the player's experience.

Functionality
1. Purchasing Tickets
The heart of the Player component lies in the ability for users to purchase lottery tickets. Through the UI, players can input the number of tickets they wish to buy. The purchaseTicket function handles this process, generating random numbers for each ticket and deducting the ticket price from the player's balance. The purchased tickets are then added to the player's ticket list.

2. Checking Results
To keep the game exciting, players can check the results of the draw. The checkResults function is responsible for calculating hits and prizes for each ticket based on the drawn numbers. This allows players to see how successful their tickets were in the latest draw.

3. Displaying Ticket Details
The Player component displays detailed information about each ticket, including the chosen numbers, the number of hits, and the resulting prize. Additionally, the user interface shows the player's current balance, total amount spent on tickets, and potential winnings. This transparency adds to the engagement and enjoyment of the game.

Flow
Purchase Tickets:

Players interact with the UI to specify the number of tickets they want.
The purchaseTicket function generates random numbers for each ticket and updates the player's balance.
Check Results:

After the draw, players can click the "Check Results" button.
The checkResults function calculates hits and prizes for each ticket.
Display Ticket Details:

Ticket details, including numbers, hits, and prizes, are displayed to the player.
The UI presents an overview of the player's financial status in the game.
Operator Component
The Operator component is responsible for managing the overall state of the lottery game. It empowers the operator to initiate draws, generate winning numbers, and oversee the financial aspects of the game.

Functionality
1. Generating Winning Numbers
The Operator component includes the functionality to generate winning numbers for each draw. The generateRandomNumber function ensures that the draw is fair and random, contributing to the excitement of the game.

2. Updating Ticket Information
The useEffect hook is employed to update ticket information for players after each draw. This includes calculating hits and prizes for each ticket based on the drawn numbers, providing players with real-time feedback on their results.

3. Financial Calculations
Financial aspects are a crucial part of the Operator component. The calculateTotalPayout function determines the total amount to be paid out to players based on their winning tickets. Balances are updated, and a financial summary is displayed to the operator, ensuring transparency and accountability.

4. New Rounds and Games
Operators can initiate new rounds and games through the Operator component, resetting the state for a fresh start. This feature allows for continuous engagement and a dynamic gaming experience.

