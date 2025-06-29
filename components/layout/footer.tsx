export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm sm:text-lg flex items-center justify-center space-x-2">
            <span>A Bitcoin Ordinals Project Created by</span>
            <a
              href="https://x.com/timechainpages"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors inline-flex items-center"
            >
              <span>Operator</span>
              <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
