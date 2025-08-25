export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-medium transition-all ${className}`}
    >
      {children}
    </button>
  );
}
