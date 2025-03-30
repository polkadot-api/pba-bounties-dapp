import { BountiesList } from "./BountiesList";

function App() {
  return (
    <div className="container m-auto">
      <div className="p-2 border-b">
        <h1 className="font-bold text-2xl">Bounties</h1>
      </div>
      <BountiesList />
    </div>
  );
}

export default App;
