import React from 'react'

function WinBar() {
  return (
    <div className="outcome-block">
      <span className="highlighted">W</span>
      <span>D</span>
      <span>L</span>
    </div>
  )
}

function DrawBar() {
  return (
    <div className="outcome-block">
      <span>W</span>
      <span className="highlighted">D</span>
      <span>L</span>
    </div>
  )
}
function LoseBar() {
  return (
    <div className="outcome-block">
      <span>W</span>
      <span>D</span>
      <span className="highlighted">L</span>
    </div>
  )
}

export default function Ticket({ children }) {
  return <div className="TicketCard">{children}</div>
}

export { WinBar, DrawBar, LoseBar }
