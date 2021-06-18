import "./App.css";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  return (
    <SocketProvider>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={PlaceOrder} />
        </Switch>
      </div>
    </SocketProvider>
  );
}

export default App;
