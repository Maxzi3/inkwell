const ErrorFallback = () => {
  return (
    <main className="min-h-screen bg-primary text-text-primary flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg bg-white shadow-md border border-gray-200 rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-500 mb-6">
          An unexpected error occurred. Please try refreshing the page or return
          to the homepage.
        </p>
        <button
          onClick={() => window.location.replace("/")}
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
        >
          Go Home
        </button>
      </div>
    </main>
  );
};

export default ErrorFallback;
