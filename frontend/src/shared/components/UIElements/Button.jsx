function Button({ className = "", children, disabled = false, ...props }) {
  return (
    <button
      className={`px-4 py-2 text-creamy ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-ritzBgBlue hover:bg-ritzHeaderPink transition duration-300"
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
