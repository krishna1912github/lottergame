// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';

// export default function Operator() {
//   // constants
//   const MAX_NUM = 39; // maximum number to guess
//   const NUM_COUNT = 5; // number of numbers to guess
//   const TICKET_PRICE = 500; // price of a ticket
//   const STARTING_BALANCE = 0; // starting balance of the operator
//   const PRIZE_PERCENTAGE = 0.5; // percentage of the income as the prize pool
//   const PRIZE_MULTIPLIERS = [0, 0, 10, 100, 1000, 10000]; // multipliers for the prizes based on the number of hits

//   // state variables
//   const [tickets, setTickets] = useState([]); // tickets submitted by the players and the operator
//   const [draw, setDraw] = useState([]); // numbers drawn by the operator
//   const [balance, setBalance] = useState(STARTING_BALANCE); // balance of the operator
//   const [generate, setGenerate] = useState(0); // number of tickets to generate by the operator
//   const [error, setError] = useState(''); // error message
//   const [success, setSuccess] = useState(''); // success message
//   const [sortKey, setSortKey] = useState('name'); // key to sort the tickets table
//   const [sortOrder, setSortOrder] = useState('asc'); // order to sort the tickets table

//   // helper functions
//   // generate a random number between 1 and MAX_NUM
//   const generateRandomNumber = () => {
//     return Math.floor(Math.random() * MAX_NUM) + 1;
//   };

//   // generate an array of NUM_COUNT random numbers without duplicates
//   const generateRandomNumbers = () => {
//     let nums = [];
//     while (nums.length < NUM_COUNT) {
//       let num = generateRandomNumber();
//       console.log('num: ', num);
//       if (!nums.includes(num)) {
//         nums.push(num);
//       }
//     }
//     return nums;
//   };

//   // calculate the number of hits for a ticket
//   const calculateHits = (ticket) => {
//    let hits = 0;
//    console.log('hits: ', hits);
 
//    // Check if ticket.numbers is an array
//    if (Array.isArray(ticket?.numbers)) {
//      for (let num of ticket?.numbers) {
//       console.log('draw: ', draw);
//        if (draw.includes(num)) {
//          hits++;
//        }
//      }
//    } else {
//      // Handle the case where ticket.numbers is not an array
//      console.error('Invalid ticket structure:', ticket);
//    }
 
//    return hits;
//  };
 
// //   // calculate the prize for a ticket
//   const calculatePrize = (ticket) => {
//     let hits = calculateHits(ticket);
//     let prize = PRIZE_MULTIPLIERS[hits] * TICKET_PRICE;
//     return prize;
//   };
  
// // calculate the prize for a ticket
// // const calculatePrize = (ticket) => {
// //    let hits = calculateHits(ticket);
// //    // Use static prize numbers 2, 3, 4, and 5
// //    let prizeNumbers = [2,3,5,6];
// //    let prize = prizeNumbers[hits] * TICKET_PRICE;
// //    return prize;
// //  };
 

//   // calculate the total income from the tickets
//   const calculateTotalIncome = () => {
//     let total = 0;
//     for (let ticket of tickets) {
//       total += TICKET_PRICE;
//     }
//     return total;
//   };

//   // calculate the total prize pool from the income
//   const calculateTotalPrizePool = () => {
//     let total = calculateTotalIncome() * PRIZE_PERCENTAGE;
//     return total;
//   };

//   // calculate the total payout for the tickets
//   const calculateTotalPayout = () => {
//     let total = 0;
//     for (let ticket of tickets) {
//       total += calculatePrize(ticket);
//     }
//     return total;
//   };

//   // calculate the profit for the operator
//   const calculateProfit = () => {
//     let profit = calculateTotalIncome() - calculateTotalPayout();
//     return profit;
//   };

//   // sort the tickets based on the sort key and order
//   const sortTickets = () => {
//     let sortedTickets = [...tickets];
//     sortedTickets.sort((a, b) => {
//       let x = a[sortKey];
//       let y = b[sortKey];
//       if (sortKey === 'numbers') {
//         // compare the numbers as strings
//         x = x.join('');
//         y = y.join('');
//       }
//       if (sortOrder === 'asc') {
//         // sort in ascending order
//         if (x < y) return -1;
//         if (x > y) return 1;
//         return 0;
//       } else {
//         // sort in descending order
//         if (x < y) return 1;
//         if (x > y) return -1;
//         return 0;
//       }
//     });
//     return sortedTickets;
//   };

//   // handle the change of the generate input
//   const handleGenerateChange = (e) => {
//     let num = parseInt(e.target.value) || 0;
//     setGenerate(num);
//   };

//   // handle the submission of the generate form
//   const handleGenerateSubmit = (e) => {
//     e.preventDefault();
//     // check if the generate input is positive
//     if (generate <= 0) {
//       setError('Please enter a positive number of tickets to generate.');
//       return;
//     }
//     // generate the tickets and add them to the tickets array
//     let newTickets = [];
//     for (let i = 0; i < generate; i++) {
//       let newTicket = {
//         name: 'Operator',
//         numbers: generateRandomNumbers(),
//         hits: 0,
//         prize: 0,
//       };
//       newTickets.push(newTicket);
//     }
//     setTickets((prevTickets) => [...prevTickets, ...newTickets]);
//     // add the income from the tickets to the balance
//     setBalance((prevBalance) => prevBalance + generate * TICKET_PRICE);
//     // clear the error message
//     setError('');
//     // show a success message
//     setSuccess(`You have successfully generated ${generate} tickets.`);
//   };

//   // handle the start of the draw
//   const handleDraw = () => {
//     // check if there are any tickets
//     if (tickets.length === 0) {
//       setError('There are no tickets to draw.');
//       return;
//     }
//     // generate the draw numbers and set them to the draw state
//     let newDraw = generateRandomNumbers();
//     setDraw(newDraw);
//     // clear the error message
//     setError('');
//     // show a success message
//     setSuccess('The draw has been started. Check the results below.');
//   };

//   // handle the start of a new round
//   const handleNewRound = () => {
//     // reset the tickets and the draw
//     setTickets([]);
//     setDraw([]);
//     // clear the error and success messages
//     setError('');
//     setSuccess('');
//   };

//   // handle the start of a new game
//   const handleNewGame = () => {
//     // reset the balance, tickets, and draw
//     setBalance(STARTING_BALANCE);
//     setTickets([]);
//     setDraw([]);
//     // clear the error and success messages
//     setError('');
//     setSuccess('');
//   };

//   // handle the change of the sort key
//   const handleSortKeyChange = (e) => {
//     setSortKey(e.target.value);
//   };

//   // handle the change of the sort order
//   const handleSortOrderChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   // use effect hook to update the hits and prizes for the tickets when the draw changes
//   useEffect(() => {
//     if (draw.length > 0) {
//       // update the tickets with the hits and prizes
//       let updatedTickets = tickets.map((ticket) => {
//         return {
//           ...ticket,
//           hits: calculateHits(ticket.numbers),
//           prize: calculatePrize(ticket.numbers),
//         };
//       });
//       setTickets(updatedTickets);
//       // deduct the total payout from the balance
//       setBalance((prevBalance) => prevBalance - calculateTotalPayout());
//     }
//   }, [draw]);

//   return (
//     <div className="container">
//       <Head>
//         <title>Lottery Game - Operator Mode</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="mt-5">
//         <h1 className="text-center">Lottery Game - Operator Mode</h1>
//         <p className="text-center">Generate tickets, start the draw, and view the results and profits.</p>
//         <div className="row">
//           <div className="col-md-6">
//             <form onSubmit={handleGenerateSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="generate" className="form-label">
//                   Number of tickets to generate
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="generate"
//                   value={generate}
//                   onChange={handleGenerateChange}
//                   min="0"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Balance</label>
//                 <p className="form-control-plaintext">{balance} coins</p>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Generate Tickets
//               </button>
//             </form>
//             <button
//               className="btn btn-success mt-3"
//               onClick={handleDraw}
//               disabled={tickets.length === 0}
//             >
//               Start Draw
//             </button>
//             {error && <div className="alert alert-danger mt-3">{error}</div>}
//             {success && <div className="alert alert-success mt-3">{success}</div>}
//           </div>
//           <div className="col-md-6">
//             <h3 className="text-center">Tickets</h3>
//             <div className="mb-3">
//               <label className="form-label">Sort by</label>
//               <select
//                 className="form-select"
//                 value={sortKey}
//                 onChange={handleSortKeyChange}
//               >
//                 <option value="asc">Ascending</option>
//                 <option value="desc">Descending</option>
//               </select>
//             </div>
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   {/* <th>Numbers</th> */}
//                   <th>Hits</th>
//                   <th>Prize</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortTickets().map((ticket, index) => (
//                   <tr key={index}>
//                     <td>{ticket.name}</td>
//                     {/* <td>{ticket.numbers.join(', ')}</td> */}
//                     <td>{ticket.hits}</td>
//                     <td>{ticket.prize} coins</td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colSpan="4">Summary</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="3">Total Income</td>
//                   <td>{calculateTotalIncome()} coins</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="3">Total Prize Pool</td>
//                   <td>{calculateTotalPrizePool()} coins</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="3">Total Payout</td>
//                   <td>{calculateTotalPayout()} coins</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="3">Profit</td>
//                   <td>{calculateProfit()} coins</td>
//                 </tr>
//               </tfoot>
//             </table>
//             <div className="d-flex justify-content-between">
//               <button
//                 className="btn btn-secondary"
//                 onClick={handleNewRound}
//                 disabled={tickets.length === 0}
//               >
//                 New Round
//               </button>
//               <button className="btn btn-danger" onClick={handleNewGame}>
//                 New Game
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';

// const WINNING_NUMBERS = [1, 2, 3, 4, 5];
// export default function Player() {
//   // constants
//   const MAX_NUM = 39; // maximum number to guess
//   const NUM_COUNT = 5; // number of numbers to guess
//   const TICKET_PRICE = 500; // price of a ticket
//   const STARTING_BALANCE = 10000; // starting balance of the player
//   const PRIZE_PERCENTAGE = 0.5; // percentage of the income as the prize pool
//   const PRIZE_MULTIPLIERS = [0, 0, 10, 100, 1000, 10000]; // multipliers for the prizes based on the number of hits

//   // state variables
//   const [name, setName] = useState(''); // name of the player
//   const [numbers, setNumbers] = useState(Array(NUM_COUNT).fill('')); // numbers entered by the player
//   const [balance, setBalance] = useState(STARTING_BALANCE); // balance of the player
//   const [tickets, setTickets] = useState([]); // tickets submitted by the player
//   const [draw, setDraw] = useState([]); // numbers drawn by the operator
//   const [error, setError] = useState(''); // error message
//   const [success, setSuccess] = useState(''); // success message
//   const [sortKey, setSortKey] = useState('hits'); // key to sort the tickets table
//   const [sortOrder, setSortOrder] = useState('desc'); // order to sort the tickets table

//   // helper functions
//   // check if a number is valid (between 1 and MAX_NUM)
//   const isValidNumber = (num) => {
//     return num >= 1 && num <= MAX_NUM;
//   };

//   // check if a number is duplicate (already in the numbers array)
//   const isDuplicateNumber = (num, index) => {
//     return numbers.indexOf(num) !== -1 && numbers.indexOf(num) !== index;
//   };

//   // check if all numbers are valid and not duplicate
//   const areValidNumbers = () => {
//     for (let i = 0; i < NUM_COUNT; i++) {
//       if (!isValidNumber(numbers[i]) || isDuplicateNumber(numbers[i], i)) {
//         return false;
//       }
//     }
//     return true;
//   };

//   // generate a random number between 1 and MAX_NUM
//   const generateRandomNumber = () => {
//     return Math.floor(Math.random() * MAX_NUM) + 1;
//   };

//   // generate an array of NUM_COUNT random numbers without duplicates
//   const generateRandomNumbers = () => {
//     let nums = [];
//     while (nums.length < NUM_COUNT) {
//       let num = generateRandomNumber();
//       if (!nums.includes(num)) {
//         nums.push(num);
//       }
//     }
//     return nums;
//   };

// //   // calculate the number of hits for a ticket
// //   const calculateHits = (ticket) => {
// //  // Static numbers to compare against
// //    let hits = 0;
// //    const ticketNumbers = ticket.numbers || []; // Assuming numbers is the property containing an array
// //    console.log('ticketNumbers: ', ticketNumbers);
// //    for (let num of ticketNumbers) {
// //      if (staticNumbers.includes(num)) {
// //        hits++;
// //      }
// //    }
// //    return hits;
// //  };
 


// //   // calculate the prize for a ticket
// //   const calculatePrize = (ticket) => {
// //    console.log('calculatePrize ticket: ', ticket);
// //     let hits = calculateHits(ticket);
// //     let prize = PRIZE_MULTIPLIERS[hits] * TICKET_PRICE;
// //     return prize;
// //   };
//   const calculateHits = (ticket) => {
//    const ticketNumbers = ticket.numbers || [];
//    return ticketNumbers.filter(num => WINNING_NUMBERS.includes(num)).length;
//  };

//  const calculatePrize = (ticket) => {
//    const hits = calculateHits(ticket);
//    const prize = PRIZE_MULTIPLIERS[hits] * TICKET_PRICE;
//    return prize;
//  };
//   // calculate the total winnings for the player
// //   const calculateTotalWinnings = () => {
// //     let total = 0;
// //     console.log('calculateTotalWinnings: ', tickets);
// //     for (let ticket of tickets) {
// //       total += calculatePrize(ticket);
// //     }
// //     return total;
// //   };
//   const calculateTotalWinnings = () => {
//    let total = 0;
//    for (let ticket of tickets) {
//      total += ticket.prize; // Use the 'prize' property of each ticket
//    }
//    return total;
//  };
 

//   // sort the tickets based on the sort key and order
//   const sortTickets = () => {
//     let sortedTickets = [...tickets];
//     sortedTickets.sort((a, b) => {
//       let x = a[sortKey];
//       let y = b[sortKey];
//       if (sortKey === 'numbers') {
//         // compare the numbers as strings
//         x = x.join('');
//         y = y.join('');
//       }
//       if (sortOrder === 'asc') {
//         // sort in ascending order
//         if (x < y) return -1;
//         if (x > y) return 1;
//         return 0;
//       } else {
//         // sort in descending order
//         if (x < y) return 1;
//         if (x > y) return -1;
//         return 0;
//       }
//     });
//     return sortedTickets;
//   };

//   // handle the change of the name
//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   // handle the change of the numbers
//   const handleNumberChange = (e, index) => {
//     let num = parseInt(e.target.value) || '';
//     let newNumbers = [...numbers];
//     newNumbers[index] = num;
//     setNumbers(newNumbers);
//   };

//   // handle the submission of the ticket
//   const handleSubmit = (e) => {
//    e.preventDefault();
//    // check if the name is empty
//    if (name === '') {
//      setError('Please enter your name.');
//      return;
//    }
//    // check if the numbers are valid
//    if (!areValidNumbers()) {
//      setError('Please enter five valid and distinct numbers from 1 to 39.');
//      return;
//    }
//    // check if the balance is sufficient
//    if (balance < TICKET_PRICE) {
//      setError('You do not have enough balance to buy a ticket.');
//      return;
//    }
//    // create a new ticket object
//    // let newTicket = {
//    //   name: name,
//    //   numbers: generateRandomNumbers(), // Use the generated random numbers
//    //   hits: 0,
//    //   prize: 0,
//    // };
//    // // add the new ticket to the tickets array
//    // setTickets((prevTickets) => [...prevTickets, newTicket]);
//    // // deduct the ticket price from the balance
//    // setBalance((prevBalance) => prevBalance - TICKET_PRICE);
//    // // clear the error message
//    // setError('');
//    // // show a success message
//    // setSuccess('You have successfully bought a ticket.');
//    let newTicket = {
//       name: name,
//       numbers: generateRandomNumbers(),
//       hits: calculateHits({ numbers: numbers }), // Use the entered numbers to calculate hits
//       prize: calculatePrize({ numbers: numbers }), // Use the entered numbers to calculate prize
//     };

//     setTickets((prevTickets) => [...prevTickets, newTicket]);
//     setBalance((prevBalance) => prevBalance - TICKET_PRICE);
//     setError('');
//     setSuccess('You have successfully bought a ticket.');
//   };
 

//   // handle the start of a new round
//   const handleNewRound = () => {
//     // reset the numbers, tickets, and draw
//     setNumbers(Array(NUM_COUNT).fill(''));
//     setTickets([]);
//     setDraw([]);
//     // clear the error and success messages
//     setError('');
//     setSuccess('');
//   };

//   // handle the start of a new game
//   const handleNewGame = () => {
//     // reset the name, balance, numbers, tickets, and draw
//     setName('');
//     setBalance(STARTING_BALANCE);
//     setNumbers(Array(NUM_COUNT).fill(''));
//     setTickets([]);
//     setDraw([]);
//     // clear the error and success messages
//     setError('');
//     setSuccess('');
//   };

//   // handle the change of the sort key
//   const handleSortKeyChange = (e) => {
//     setSortKey(e.target.value);
//   };

//   // handle the change of the sort order
//   const handleSortOrderChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   // use effect hook to update the hits and prizes for the tickets when the draw changes
//   useEffect(() => {
//    if (draw.length > 0) {
//      // update the tickets with the hits and prizes
//      let updatedTickets = tickets?.map((ticket) => {
//        const randomNumbers = generateRandomNumbers(); // Generate new random numbers
//        console.log('randomNumbers: ', randomNumbers);
//        return {
//          ...ticket,
//          numbers: randomNumbers,
//          hits: calculateHits(randomNumbers),
//          prize: calculatePrize(randomNumbers),
//        };
//      });
//      setTickets(updatedTickets);
//      // add the total winnings to the balance
//      setBalance((prevBalance) => prevBalance + calculateTotalWinnings());
//      // show a success message
//      setSuccess('The draw has been completed. Check your results below.');
//    }
//  }, [draw]);

//   return (
//     <div className="container">
//       <Head>
//         <title>Lottery Game - Player Mode</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="mt-5">
//     <h1 className="text-center">Lottery Game - Player Mode</h1>
//     <p className="text-center">Guess five numbers from 1 to 39 and win prizes.</p>
//     <div className="row">
//       <div className="col-md-6">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               value={name}
//               onChange={handleNameChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Numbers</label>
//             <div className="d-flex">
//               {numbers.map((num, index) => (
//                 <input
//                   type="number"
//                   className="form-control m-1"
//                   key={index}
//                   value={num}
//                   onChange={(e) => handleNumberChange(e, index)}
//                   min="1"
//                   max={MAX_NUM}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Balance</label>
//             <p className="form-control-plaintext">{balance} coins</p>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Price</label>
//             <p className="form-control-plaintext">{TICKET_PRICE} coins</p>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Buy Ticket
//           </button>
//         </form>
//         {error && <div className="alert alert-danger mt-3">{error}</div>}
//         {success && <div className="alert alert-success mt-3">{success}</div>}
//       </div>
//       <div className="col-md-6">
//         <h3 className="text-center">Your Tickets</h3>
//         <div className="mb-3">
//           <label className="form-label">Sort by</label>
//           <select
//             className="form-select"
//             value={sortKey}
//             onChange={handleSortKeyChange}
//           >
//             <option value="numbers">Numbers</option>
//             <option value="hits">Hits</option>
//             <option value="prize">Prize</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Order by</label>
//           <select
//             className="form-select"
//             value={sortOrder}
//             onChange={handleSortOrderChange}
//           >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </div>
//         <table className="table table-bordered table-striped">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Numbers</th>
//               <th>Hits</th>
//               <th>Prize</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortTickets().map((ticket, index) => (
//               <tr key={index}>
//                 <td>{ticket.name}</td>
//                 <td>{ticket.numbers.join(', ')} </td>
//                 <td>{ticket.hits}</td>
//                 <td>{ticket.prize} coins</td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="3">Total Winnings</td>
//               <td>{calculateTotalWinnings()} coins</td>
//             </tr>
//           </tfoot>
//         </table>
//         <div className="d-flex justify-content-between">
//           <button
//             className="btn btn-secondary"
//             onClick={handleNewRound}
//             disabled={tickets.length === 0}
//           >
//             New Round
//           </button>
//           <button className="btn btn-danger" onClick={handleNewGame}>
//             New Game
//           </button>
//         </div>
//       </div>
//     </div>
//   </main>
// </div>
//   );
// }