import Card from "./Components/Card";

function App() {
  return (
    <div className="bg-orange-200 w-full h-screen flex justify-center items-center flex-col">
      <p className="font-bold text-2xl text-gray-700 mb-10">News Article Summarizer</p>
      <Card />
      <p className="text-gray-700 font-serif mt-10">&copy; Advait Gogte</p>
    </div>
  );
}

export default App;
