const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-accent"
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Spinner;
