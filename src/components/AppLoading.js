function AppLoading() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Spinner size={80} />
    </div>
  );
}

function Spinner({ size }) {
  return (
    <div className="loading text-black ">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 45 45"
        role="status"
      >
        <circle
          className="loading__circle"
          cx="22.5"
          cy="22.5"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}

export default AppLoading;