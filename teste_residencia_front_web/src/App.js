import { Route, Switch, BrowserRouter } from "react-router-dom";
import {Login} from "./pages/Login";
import { UserProvider } from "./service/UserContext";
import {MySkills} from './pages/MySkills'


function App() {
  return (
    <BrowserRouter>

      <Switch>
        <UserProvider>
        <Route path="/" exact component={Login} />
        <Route path="/mySkills" exact component={MySkills} />
        </UserProvider>
      </Switch>
    
    </BrowserRouter>
  );
}

export default App;