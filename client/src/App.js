import "./App.css";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import Kitchen from "./components/Kitchen/Kitchen";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={PlaceOrder} />
        <Route path="/kitchen" component={Kitchen} />
      </Switch>
    </div>
  );
}

export default App;
