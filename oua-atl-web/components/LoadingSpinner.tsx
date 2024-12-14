export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 border-l-transparent"></div>

        {/* Loading Text */}
        <p className="text-lg font-semibold text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  );
}
