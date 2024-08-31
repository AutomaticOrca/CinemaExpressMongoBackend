import MenuItem from "./MenuItem";

function Menu() {
  const ticketTypes = [
    { type: "ADULT", unitPrice: 24.5 },
    { type: "CHILD", unitPrice: 15.5 },
    { type: "SENIOR", unitPrice: 16.5 },
    { type: "CONCESSION", unitPrice: 19.5 },
    { type: "PENSION", unitPrice: 16.5 },
    { type: "STUDENT", unitPrice: 19.5 },
  ];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {ticketTypes.map((ticket, index) => (
        <MenuItem ticket={ticket} key={"t-" + index} />
      ))}
    </ul>
  );
}

export default Menu;
