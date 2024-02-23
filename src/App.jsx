import Autocomplete from "./components/Autocomplete.jsx";

function App() {
  return (
    <main className="flex gap-4 p-6 items-start justify-center h-dvh bg-gray-50">
      <Autocomplete label="Enabled"></Autocomplete>
      <Autocomplete disabled label="Disabled"></Autocomplete>
    </main>
  )
}

export default App
