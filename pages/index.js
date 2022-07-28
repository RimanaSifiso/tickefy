import Head from 'next/head'
import { useState } from 'react'
import six from '../lib/6'
import eight from '../lib/8'
import Ticket, { WinBar, LoseBar, DrawBar } from '../components/Ticket'

export default function Home() {
  const [tickets, setTickets] = useState([])
  const [games, setGames] = useState(6)

  let queryTicket = new Array(games).fill('')

  function getTickets(queryTicket) {
    console.log(queryTicket)

    let query = []

    queryTicket.forEach((item, i) => {
      if (item.length) query.push({ outcome: item, pos: i })
    })

    let newTickets = games === 6 ? six : eight

    function compareArrs(comparer, comparee) {
      for (let i1 = 0; i1 < comparer.length; i1++) {
        if (comparer[i1].length > 0) {
          if (!(comparee[i1] === comparer[i1])) {
            return false
          }
        }
      }

      return true
    }

    newTickets = newTickets.filter((ticket) => {
      if (compareArrs(queryTicket, ticket)) {
        return ticket
      }
    })

    setTickets(newTickets)
  }

  function handleInput(e, n) {
    queryTicket[n - 1] = e.target.value
  }

  function handleSetGames() {
    games === 6 ? setGames(8) : setGames(6)

    queryTicket = new Array(games).fill('')
  }

  function OutcomeBlock({ n }) {
    return (
      <div className="outcome-block">
        <input
          onChange={(e) => handleInput(e, n)}
          type="radio"
          name={'row' + n}
          id={'w' + n}
          value="W"
        />
        <label htmlFor={'w' + n}>W</label>

        <input
          onChange={(e) => handleInput(e, n)}
          type="radio"
          name={'row' + n}
          id={'d' + n}
          value="D"
        />
        <label htmlFor={'d' + n}>D</label>

        <input
          onChange={(e) => handleInput(e, n)}
          type="radio"
          name={'row' + n}
          id={'l' + n}
          value="L"
        />
        <label htmlFor={'l' + n}>L</label>
      </div>
    )
  }

  return (
    <div className="App">
      <Head>
        <title>Tickefy</title>
      </Head>

      {!tickets.length ? (
        <div className="Form">
          <div className="FormFlexElement">
            <h1>Customise your tickets</h1>
          </div>
          <div className="FormFlexElement">
            <button onClick={handleSetGames} className="outline">
              Switch to {games === 6 ? '8' : '6'} games
            </button>
          </div>
          <div className="FormFlexElement">
            <div className="TicketCard inForm">
              {new Array(games).fill(games).map((item, idx) => (
                <OutcomeBlock n={idx + 1} key={idx} />
              ))}
            </div>
          </div>
          <div className="FormFlexElement">
            <button onClick={() => getTickets(queryTicket)}>
              Get tickets &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="Tickets">
          <div className="flex-item">
            <h1>
              <b>{tickets.length}</b> tickets
            </h1>
          </div>
          <div className="TicketsContainer">
            {tickets.map((ticketBar, i) => (
              <Ticket key={i}>
                {ticketBar.map((item, k) => {
                  if (item === 'W') return <WinBar key={k ** Math.random()} />
                  else if (item === 'D')
                    return <DrawBar key={k ** Math.random()} />
                  else return <LoseBar key={k ** Math.random()} />
                })}
              </Ticket>
            ))}
          </div>
          <div className="flex-item">
            <button onClick={() => setTickets([])}>Get new tickets</button>
          </div>
        </div>
      )}
    </div>
  )
}
