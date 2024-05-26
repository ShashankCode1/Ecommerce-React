import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./applayout/AppLayout";

function App() {
  return (
    <div className="app-body">
      <div className="app-container">
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
