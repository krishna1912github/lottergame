import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Operator() {
  const MAX_NUM = 39;
  const NUM_COUNT = 5;
  const TICKET_PRICE = 500;
  const STARTING_BALANCE = 0;
  const PRIZE_PERCENTAGE = 0.5;
  const PRIZE_MULTIPLIERS = [0, 0, 10, 100, 1000, 10000];
  const [tickets, setTickets] = useState([]);
  const [draw, setDraw] = useState([]);
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [generate, setGenerate] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  /**
  * @Summary Generates a random number within the valid range for the lottery selection.
  * @returns {Number} generateRandomNumber - Randomly generated number.
  */
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * MAX_NUM) + 1;
  };

  /**
  * @Summary Generates an array of unique random numbers for a lottery ticket.
  * @returns {Array} generateRandomNumbers - Array of randomly generated unique numbers.
  */
  const generateRandomNumbers = () => {
    let nums = [];
    while (nums.length < NUM_COUNT) {
      let num = generateRandomNumber();
      if (!nums.includes(num)) {
        nums.push(num);
      }
    }
    return nums;
  };

  /**
  * @Summary Calculates the number of hits (correctly guessed numbers) in a given ticket.
  * @param {ticket} Object containing the numbers to be checked.
  * @returns {Number} calculateHits - Number of hits in the ticket.
  */
  const calculateHits = (ticket) => {
    let hits = 0;
    if (Array.isArray(ticket?.numbers)) {
      for (let num of ticket?.numbers) {
        if (draw.includes(num)) {
          hits++;
        }
      }
    } else {
      console.error('Invalid ticket structure:', ticket);
    }
    return hits;
  };

  /**
  * @Summary Calculates the prize amount for a given ticket based on hits.
  * @param {ticket} Object containing the numbers to calculate the prize.
  * @returns {Number} calculatePrize - Prize amount for the ticket.
  */
  const calculatePrize = (ticket) => {
    let hits = calculateHits(ticket);
    let prize = PRIZE_MULTIPLIERS[hits] * TICKET_PRICE;
    return prize;
  };

  /**
  * @Summary Calculates the total income generated from all purchased tickets.
  * @returns {Number} calculateTotalIncome - Total income amount.
  */
  const calculateTotalIncome = () => {
    let total = 0;
    for (let ticket of tickets) {
      total += TICKET_PRICE;
    }
    return total;
  };

  /**
  * @Summary Calculates the total prize pool based on a percentage of the total income.
  * @returns {Number} calculateTotalPrizePool - Total prize pool amount.
  */
  const calculateTotalPrizePool = () => {
    let total = calculateTotalIncome() * PRIZE_PERCENTAGE;
    return total;
  };

  /**
  * @Summary Calculates the total payout amount for all purchased tickets.
  * @returns {Number} calculateTotalPayout - Total payout amount.
  */
  const calculateTotalPayout = () => {
    let total = 0;
    for (let ticket of tickets) {
      total += calculatePrize(ticket);
    }
    return total;
  };

  /**
  * @Summary Calculates the profit by subtracting the total payout from the total income.
  * @returns {Number} calculateProfit - Profit amount.
  */
  const calculateProfit = () => {
    let profit = calculateTotalIncome() - calculateTotalPayout();
    return profit;
  };

  /**
  * @Summary Sorts the operator's lottery tickets based on specified criteria (key and order).
  * @returns {Array} sortTickets - Sorted array of tickets.
  */
  const sortTickets = () => {
    let sortedTickets = [...tickets];
    sortedTickets.sort((a, b) => {
      let x = a[sortKey];
      let y = b[sortKey];
      if (sortKey === 'numbers') {
        x = x.join('');
        y = y.join('');
      }
      if (sortOrder === 'asc') {
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      } else {
        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      }
    });
    return sortedTickets;
  };

  /**
  * @Summary Updates the number of tickets to generate based on user input.
  * @param {e} Event object containing the input value.
  * @returns {Void} handleGenerateChange - None.
  */
  const handleGenerateChange = (e) => {
    let num = parseInt(e.target.value) || 0;
    setGenerate(num);
  };

  /**
 * @Summary Handles the submission to generate new lottery tickets, validates inputs, and updates state accordingly.
 * @param {e} Event object from the form submission.
 * @returns {Void} handleGenerateSubmit - None.
 */
  const handleGenerateSubmit = (e) => {
    e.preventDefault();
    if (generate <= 0) {
      setError('Please enter a positive number of tickets to generate.');
      return;
    }

    // Retrieve operator balance from localStorage
    const operatorBalance = parseFloat(localStorage.getItem('operatorBalance')) || 0;

    let newTickets = [];
    for (let i = 0; i < generate; i++) {
      let newTicket = {
        name: 'Operator',
        numbers: generateRandomNumbers(),
        hits: 0,
        prize: 0,
      };
      newTickets.push(newTicket);
    }

    // Calculate total prize for the generated tickets
    const totalPrize = generate * TICKET_PRICE;

    // Update operator balance with the total prize
    const updatedOperatorBalance = operatorBalance + totalPrize;
    localStorage.setItem('operatorBalance', updatedOperatorBalance);

    setTickets((prevTickets) => [...prevTickets, ...newTickets]);

    // Update the balance in the state with the updatedOperatorBalance
    setBalance(updatedOperatorBalance);

    setError('');
    setSuccess(`You have successfully generated ${generate} tickets.`);
  };



  /**
  * @Summary Resets the game for a new round by clearing tickets, draw, and reset messages.
  * @returns {Void} handleNewRound - None.
  */
  const handleNewRound = () => {
    setTickets([]);
    setDraw([]);
    setError('');
    setSuccess('');
  };

  /**
  * @Summary Resets the entire game by clearing all state variables.
  * @returns {Void} handleNewGame - None.
  */
  const handleNewGame = () => {
    setBalance(STARTING_BALANCE);
    setTickets([]);
    setDraw([]);
    setError('');
    setSuccess('');
  };

  /**
  * @Summary Updates the sorting key based on user selection.
  * @param {e} Event object containing the selected value.
  * @returns {Void} handleSortKeyChange - None.
  */
  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
  };

  /**
  * @Summary Updates the sorting order based on user selection.
  * @param {e} Event object containing the selected value.
  * @returns {Void} handleSortOrderChange - None.
  */
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  /**
  * @Summary Triggers after a draw and updates the tickets based on hits and prizes.
  * @returns {Void} useEffect - None.
  */
  useEffect(() => {
    if (draw.length > 0) {
      let updatedTickets = tickets.map((ticket) => {
        return {
          ...ticket,
          hits: calculateHits(ticket),
          prize: calculatePrize(ticket),
        };
      });
      setTickets(updatedTickets);
      const totalPayout = calculateTotalPayout();
      setBalance((prevBalance) => prevBalance - totalPayout);
      // Add the totalPayout directly to the operator's balance
      const updatedOperatorBalance = parseFloat(localStorage.getItem('operatorBalance')) + totalPayout;
      console.log('updatedOperatorBalance: ', updatedOperatorBalance);
      localStorage.setItem('operatorBalance', updatedOperatorBalance);
      setSuccess('The draw has been completed. Check the results below.');
    }
  }, [draw, tickets]);



  /**
  * @Summary Updates the operator's data in local storage whenever relevant state variables change.
  * @returns {Void} useEffect - None.
  */
  useEffect(() => {
    // Store operator data in localStorage
    localStorage.setItem('operatorBalance', balance);
    localStorage.setItem('operatorTickets', JSON.stringify(tickets));
  }, [balance, tickets]);


  return (
    <div className="container">
      <Head>
        <title>Lottery Game - Operator Mode</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-5">
        <h1 className="text-center">Lottery Game - Operator Mode</h1>
        <p className="text-center">Generate tickets, start the draw, and view the results and profits.</p>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleGenerateSubmit}>
              <div className="mb-3">
                <label htmlFor="generate" className="form-label">
                  Number of tickets to generate
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="generate"
                  value={generate}
                  onChange={handleGenerateChange}
                  min="0"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Balance</label>
                <p className="form-control-plaintext">{balance} coins</p>
              </div>
              <button type="submit" className="btn btn-primary">
                Generate Tickets
              </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
          </div>
          <div className="col-md-6">
            <h3 className="text-center">Tickets</h3>
            <div className="mb-3">
              <label className="form-label">Sort by</label>
              <select
                className="form-select"
                value={sortKey}
                onChange={handleSortKeyChange}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Numbers</th>
                  <th>Hits</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                {sortTickets().map((ticket, index) => (
                  <tr key={index}>
                    <td>{ticket.name}</td>
                    <td>{ticket.numbers.join(', ')}</td>
                    <td>{ticket.hits}</td>
                    <td>{ticket.prize} coins</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Summary</td>
                </tr>
                <tr>
                  <td colSpan="3">Total Income</td>
                  <td>{calculateTotalIncome()} coins</td>
                </tr>
                {/* <tr>
                  <td colSpan="3">Total Prize Pool</td>
                  <td>{calculateTotalPrizePool()} coins</td>
                </tr>
                <tr>
                  <td colSpan="3">Total Payout</td>
                  <td>{calculateTotalPayout()} coins</td>
                </tr> */}
                <tr>
                  <td colSpan="3">Profit</td>
                  <td>{calculateProfit()} coins</td>
                </tr>
              </tfoot>
            </table>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={handleNewRound}
                disabled={tickets.length === 0}
              >
                New Round
              </button>
              <button className="btn btn-danger" onClick={handleNewGame}>
                New Game
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
