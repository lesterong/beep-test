import Autocomplete from "./components/Autocomplete.jsx";

function App() {
  const dataArray = ['Apple', 'Orange', 'Grape', 'Pear', 'Blueberry', 'Pineapple']
  return (
    <main className="grid sm:grid-cols-2 max-w-3xl mx-auto gap-4 p-6 items-start justify-center h-dvh">
      <Autocomplete dataSource={dataArray} label="Enabled"></Autocomplete>
      <Autocomplete disabled label="Disabled"></Autocomplete>
      <Autocomplete dataSource={dataArray} label="Enabled"
                    description="This is an autocomplete field with a description!"></Autocomplete>
      <Autocomplete dataSource={dataArray} transformDisplay={(str) => str.toUpperCase()} label="Enabled"
                    description="This autocomplete field transforms all values into uppercase!"></Autocomplete>
    </main>
  )
}

export default App
