function CinemaCard({ name, address, imgUrl }) {
  return (
    <div className="overflow-hidden m-4 px-4 py-1 relative">
      <div className="absolute left-1 top-0 bottom-0 w-thin-line bg-black"></div>
      <div className="w-full h-48 overflow-hidden">
        <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <h4 className="text-md">{address}</h4>
      </div>
    </div>
  );
}

export default CinemaCard;
