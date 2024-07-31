import { useState, useEffect } from "react";
import TicketChooseCard from "./TicketChooseCard";

const TicketSelection = ({ updateNextButtonStatus }) => {
  const ticketTypes = [
    { type: "ADULT", price: 24.5 },
    { type: "CHILD", price: 15.5 },
    { type: "SENIOR", price: 16.5 },
    { type: "CONCESSION", price: 19.5 },
    { type: "PENSION", price: 16.0 },
    { type: "STUDENT", price: 8.0 },
  ];

  const [ticketCounts, setTicketCounts] = useState(
    ticketTypes.reduce((acc, ticket) => {
      acc[ticket.type] = 0;
      return acc;
    }, {})
  );
  // {ADULT: 0, CHILD: 0, SENIOR: 0, CONCESSION: 0, PENSION: 0, STUDENT: 0}

  const handleAddTicket = (type, count) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type]: count,
    }));
  };

  // Calculate total price
  const totalPrice = Object.keys(ticketCounts)
    .filter((type) => ticketCounts[type] > 0)
    .reduce((total, type) => {
      const ticketType = ticketTypes.find((t) => t.type === type);
      return total + ticketCounts[type] * ticketType.price;
    }, 0);

  useEffect(() => {
    // Check if at least one ticket is selected
    const hasTickets = Object.values(ticketCounts).some((count) => count > 0);
    updateNextButtonStatus(hasTickets);
  }, [ticketCounts, updateNextButtonStatus]);

  return (
    <div className="p-6 text-white">
      {ticketTypes.map((ticket) => (
        <TicketChooseCard
          key={ticket.type}
          type={ticket.type}
          price={ticket.price}
          onAddTicket={handleAddTicket}
        />
      ))}

      <hr className="border-t-2 border-dotted border-gray-600 my-4" />
      <div className="mt-4 text-black">
        {/* {Object.keys(ticketCounts).map((type) => (
          <p key={type}>
            {type}: {ticketCounts[type]} tickets
          </p>
        ))} */}
        {Object.keys(ticketCounts)
          .filter((type) => ticketCounts[type] > 0)
          .map((type) => {
            const ticketType = ticketTypes.find((t) => t.type === type);
            const totalPrice = ticketCounts[type] * ticketType.price;
            return (
              <p key={type} className="grid grid-cols-3 gap-4">
                <span>{type}</span>
                <span className="text-left">
                  {ticketCounts[type]}{" "}
                  {ticketCounts[type] > 1 ? "tickets" : "ticket"}
                </span>{" "}
                <span className="text-right">${totalPrice.toFixed(2)}</span>
              </p>
            );
          })}
        <p className="mt-2 flex justify-between font-bold">
          <span>TOTAL</span> <span>${totalPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default TicketSelection;
