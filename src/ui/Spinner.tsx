const Spinner = () => {
  return (
    <div className="flex items-center justify-center mx-auto lg:w-[400px] my-24 ">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-accent mx-auto my-24"
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Spinner;
