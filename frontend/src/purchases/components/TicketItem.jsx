import React, { useState, useEffect } from "react";

const TicketItem = ({ type, price, onAddTicket }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onAddTicket(type, count);
  }, [count, type, onAddTicket]);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <h2 className="text-xl font-bold text-red-500">{type}</h2>
        <p className="text-lg">${price}0</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <button
            className="bg-ritzHeaderPink text-white px-2 py-1"
            onClick={handleDecrement}
          >
            -
          </button>
          <input
            type="text"
            value={count}
            readOnly
            className="w-12 text-center bg-white text-black"
          />
          <button
            className="bg-ritzHeaderPink text-white px-2 py-1"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
