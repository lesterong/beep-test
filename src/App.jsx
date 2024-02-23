import Autocomplete from "./components/Autocomplete.jsx";

function App() {
  return (
    <main className="grid grid-cols-2 max-w-3xl mx-auto gap-4 p-6 items-start justify-center h-dvh ">
      <Autocomplete label="Enabled"></Autocomplete>
      <Autocomplete disabled label="Disabled"></Autocomplete>
      <Autocomplete label="Enabled" description="This is an autocomplete field with a description!"></Autocomplete>
    </main>
  )
}

export default App
