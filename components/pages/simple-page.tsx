"use client"
// Removed InscriptionPage from here as it now has its own file

export const SimplePage = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-gray-50 py-12 sm:py-16">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-lg sm:text-xl text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  </div>
)
