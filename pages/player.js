import { useState, useEffect } from "react";
import Head from "next/head";

const WINNING_NUMBERS = [1, 2, 3, 4, 5];

export default function Player() {
  const MAX_NUM = 39;
  const NUM_COUNT = 5;
  const TICKET_PRICE = 500;
  const STARTING_BALANCE = 10000;
  const PRIZE_MULTIPLIERS = [0, 0, 10, 100, 1000, 10000];
  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState(Array(NUM_COUNT).fill(""));
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [tickets, setTickets] = useState([]);
  const [draw, setDraw] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sortKey, setSortKey] = useState("hits");
  const [sortOrder, setSortOrder] = useState("desc");

  /**
   *@Summary Checks if a given number is within the valid range for the lottery selection.
   * @param {num} Number to be checked.
   * @returns isValidNumber:Boolean indicating whether the number is valid
   */
  const isValidNumber = (num) => {
    return num >= 1 && num <= MAX_NUM;
  };
  /**
   *@Summary Checks if a given number is duplicated within the selected numbers array.
   * @param {num} Number to be checked for duplication.
   * @returns {Boolean} isDuplicateNumber - Boolean indicating whether the number is duplicated.
   */
  const isDuplicateNumber = (num, index) => {
    return numbers.indexOf(num) !== -1 && numbers.indexOf(num) !== index;
  };
  /**
   *@Summary Validates the entire set of selected numbers, ensuring they are valid and distinct.
   * @returns {Boolean} areValidNumbers - Boolean indicating whether the selected numbers are all valid and distinct.
   */
  const areValidNumbers = () => {
    for (let i = 0; i < NUM_COUNT; i++) {
      if (!isValidNumber(numbers[i]) || isDuplicateNumber(numbers[i], i)) {
        return false;
      }
    }
    return true;
  };

  /**
   *@Summary Generates a random number within the valid range for the lottery selection.
   * @returns {Number} generateRandomNumber - Randomly generated number.
   */
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * MAX_NUM) + 1;
  };
  /**
   * *@Summary Generates an array of unique random numbers for a lottery ticket.
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
   *@Summary Calculates the number of hits (correctly guessed numbers) in a given ticket.
* @param {ticket} Object containing the numbers to be checked.
* @returns {Number} calculateHits - Number of hits in the ticket.

   */
  const calculateHits = (ticket) => {
    const ticketNumbers = ticket.numbers || [];
    return ticketNumbers.filter((num) => WINNING_NUMBERS.includes(num)).length;
  };
  /**
   * @Summary Calculates the prize amount for a given ticket, updates operator balance if needed.
   * @param {ticket} Object containing the numbers to calculate the prize.
   * @returns {Number} calculatePrize - Prize amount for the ticket.
   */
  const calculatePrize = (ticket) => {
    const hits = calculateHits(ticket);
    const prize = PRIZE_MULTIPLIERS[hits] * TICKET_PRICE;
    if (prize === 0) {
      const operatorBalance = parseFloat(
        localStorage.getItem("operatorBalance")
      );
      const updatedOperatorBalance = operatorBalance + TICKET_PRICE;
      console.log("updatedOperatorBalance: ", updatedOperatorBalance);
      localStorage.setItem("operatorBalance", updatedOperatorBalance);
    }
    return prize;
  };

  /**
   * @Summary Calculates the total winnings across all purchased tickets.
   * @returns {Number} calculateTotalWinnings - Total winnings amount.
   */
  const calculateTotalWinnings = () => {
    let total = 0;
    for (let ticket of tickets) {
      total += ticket.prize;
    }
    return total;
  };
  /** 
   * @Summary Sorts the player's lottery tickets based on specified criteria (key and order).
* @returns {Array} sortTickets - Sorted array of tickets.

   */
  const sortTickets = () => {
    let sortedTickets = [...tickets];
    sortedTickets.sort((a, b) => {
      let x = a[sortKey];
      let y = b[sortKey];
      if (sortKey === "numbers") {
        x = x.join("");
        y = y.join("");
      }
      if (sortOrder === "asc") {
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
   * @Summary Updates the player's name based on user input.
* @param {e} Event object containing the input value.
* @returns {Void} handleNameChange - None.

   */
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  /**
   * @Summary Updates the selected numbers for a ticket based on user input.
* @param {e} Event object containing the input value.
* @param {index} Index of the number being updated.
* @returns {Void} handleNumberChange - None.

   */
  const handleNumberChange = (e, index) => {
    let num = parseInt(e.target.value) || "";
    let newNumbers = [...numbers];
    newNumbers[index] = num;
    setNumbers(newNumbers);
  };
  /**
   * @Summary Handles the submission of a new lottery ticket, validates inputs and updates state accordingly.
* @param {e} Event object from the form submission.
* @returns {Void} handleSubmit - None.

   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setError("Please enter your name.");
      return;
    }
    if (!areValidNumbers()) {
      setError("Please enter five valid and distinct numbers from 1 to 39.");
      return;
    }
    if (balance < TICKET_PRICE) {
      setError("You do not have enough balance to buy a ticket.");
      return;
    }
    let newTicket = {
      name: name,
      numbers: generateRandomNumbers(),
      hits: calculateHits({ numbers: numbers }),
      prize: calculatePrize({ numbers: numbers }),
    };
    setTickets((prevTickets) => [...prevTickets, newTicket]);
    setBalance((prevBalance) => prevBalance - TICKET_PRICE);
    if (newTicket.prize > 0) {
      const playerLocalStorageBalance = parseFloat(localStorage.getItem("playerBalance")) || 0;
      const updatedPlayerBalance = playerLocalStorageBalance + newTicket.prize;
  
      // Update state balance
      setBalance((prevBalance) => prevBalance + newTicket.prize);
      // Update local storage balance
        localStorage.setItem("playerBalance", updatedPlayerBalance);
        const operatorBalance = parseFloat( localStorage.getItem("operatorBalance"));
        const updatedOperatorBalance1 = operatorBalance - newTicket.prize ;
        localStorage.setItem("operatorBalance", updatedOperatorBalance1);
    
    }
    setError("");
    setSuccess("You have successfully bought a ticket.");
  };
  /**
   * *@Summary Resets the game for a new round by clearing selected numbers, tickets, and draw.
* @returns {Void} handleNewRound - None.

   */
  const handleNewRound = () => {
    setNumbers(Array(NUM_COUNT).fill(""));
    setTickets([]);
    setDraw([]);
    setError("");
    setSuccess("");
  };
  /**
   * *@Summary Resets the entire game by clearing all state variables.
* @returns {Void} handleNewGame - None.

   */
  const handleNewGame = () => {
    setName("");
    setBalance(STARTING_BALANCE);
    setNumbers(Array(NUM_COUNT).fill(""));
    setTickets([]);
    setDraw([]);
    setError("");
    setSuccess("");
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
   *@Summary Updates the player's data in local storage whenever relevant state variables change.
   * @returns {Void} useEffect - None.
   */
  useEffect(() => {
    if (draw.length > 0) {
      let updatedTickets = tickets?.map((ticket) => {
        const randomNumbers = generateRandomNumbers();
        const hits = calculateHits(randomNumbers);
        const prize = calculatePrize(randomNumbers);
        console.log("prize: ", prize);
        return {
          ...ticket,
          numbers: randomNumbers,
          hits: hits,
          prize: prize,
        };
      });
      setTickets(updatedTickets);
      setBalance((prevBalance) => prevBalance + calculateTotalWinnings());
      setSuccess("The draw has been completed. Check your results below.");
    }
  }, [draw]);
  /**
   * @Summary Triggers after a draw and updates the tickets based on random numbers.
   * @returns {Void} useEffect - None.
   */
  useEffect(() => {
    localStorage.setItem("playerName", name);
    localStorage.setItem("playerBalance", balance);
    localStorage.setItem("playerTickets", JSON.stringify(tickets));
  }, [name, balance, tickets]);
  return (
    <div className="container">
      <Head>
        <title>Lottery Game - Player Mode</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-5">
        <h1 className="text-center">Lottery Game - Player Mode</h1>
        <p className="text-center">
          Guess five numbers from 1 to 39 and win prizes.
        </p>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Numbers</label>
                <div className="d-flex">
                  {numbers.map((num, index) => (
                    <input
                      type="number"
                      className="form-control m-1"
                      key={index}
                      value={num}
                      onChange={(e) => handleNumberChange(e, index)}
                      min="1"
                      max={MAX_NUM}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Balance</label>
                <p className="form-control-plaintext">{balance} coins</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <p className="form-control-plaintext">{TICKET_PRICE} coins</p>
              </div>
              <button type="submit" className="btn btn-primary">
                Buy Ticket
              </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}
          </div>
          <div className="col-md-6">
            <h3 className="text-center">Your Tickets</h3>
            <div className="mb-3">
              <label className="form-label">Sort by</label>
              <select
                className="form-select"
                value={sortKey}
                onChange={handleSortKeyChange}
              >
                <option value="numbers">Numbers</option>
                <option value="hits">Hits</option>
                <option value="prize">Prize</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Order by</label>
              <select
                className="form-select"
                value={sortOrder}
                onChange={handleSortOrderChange}
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
                    <td>{ticket.numbers.join(", ")} </td>
                    <td>{ticket.hits}</td>
                    <td>{ticket.prize} coins</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total Winnings</td>
                  <td>{calculateTotalWinnings()} coins</td>
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
