import Link from 'next/link';

export default function PaymentSuccess({
    searchParams: { amount },
  }: {
    searchParams: { amount: string };
  }) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-4xl w-full mx-auto p-10 text-center m-10 rounded-2xl bg-white shadow-xl">
          <div className="flex flex-col gap-8 mb-12">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto">
              <svg
                className="w-full h-full text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900">
              Payment Successful!
            </h1>
            
            <h2 className="text-2xl text-gray-600">
              Your booking has been confirmed
            </h2>

            <div className="bg-blue-500 p-4 rounded-xl text-white text-3xl font-bold">
              ${parseFloat(amount).toFixed(2)}
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }