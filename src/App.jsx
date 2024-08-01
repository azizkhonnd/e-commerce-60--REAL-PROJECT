import { useState } from "react";
import RouteController from "./routes";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <RouteController searchQuery={searchQuery} onSearch={handleSearch} />
    </>
  );
}

export default App;
