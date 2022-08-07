import { Route, Routes } from "react-router-dom";
import { Signin } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
