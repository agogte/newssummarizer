import Card from "./Components/Card";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex flex-col items-center px-4 py-10 sm:py-16">
      <header className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs sm:text-sm text-indigo-200 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2l1.8 5.6L19.4 9.4 13.8 11.2 12 17l-1.8-5.8L4.6 9.4l5.6-1.8L12 2z" />
          </svg>
          AI-Powered
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          News Article Summarizer
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-md mx-auto">
          Paste a link, get the gist. No more doomscrolling through 2,000-word think pieces.
        </p>
      </header>

      <Card />

      <footer className="mt-10 sm:mt-16 text-xs sm:text-sm text-slate-500">
        © {new Date().getFullYear()} Advait Gogte
      </footer>
    </div>
  );
}

export default App;
