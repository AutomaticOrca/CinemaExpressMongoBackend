function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 text-creamy bg-ritzBgBlue  hover:bg-ritzHeaderPink transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
