export default function ConfirmPage() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Order Confirmed</h1>
          <p className="mb-4">Thank you for your purchase!</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </main>
    );
  }