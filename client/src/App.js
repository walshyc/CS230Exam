import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Clients from './Components/Client/Clients';
import Navbar from './Components/Navbar';
import ClientProfile from './Components/Client/ClientProfile';
import PhysioProfile from './Components/Physio/PhysioProfile';
import Landing from './Components/Landing';
import Physios from './Components/Physio/Physios';
import Sessions from './Components/Sessions/Sessions';
import NewClientForm from './Components/Client/NewClientForm';
import UpdateClientForm from './Components/Client/UpdateClientForm';
import NewPhysioForm from './Components/Physio/NewPhysioForm';
import UpdatePhysioForm from './Components/Physio/UpdatePhysioForm';
import NewSessionForm from './Components/Sessions/NewSessionForm';
import UpdateSessionForm from './Components/Sessions/UpdateSessionForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <div className="bg-gray-300 w-full">
          <div className="w-full min-h-screen container mx-auto bg-gray-300">
            <Switch>
              <Route exact path="/physios/add">
                <NewPhysioForm></NewPhysioForm>
              </Route>
              <Route exact path="/physios/update/:id">
                <UpdatePhysioForm></UpdatePhysioForm>
              </Route>
              <Route exact path="/physios/:id">
                <PhysioProfile></PhysioProfile>
              </Route>
              <Route exact path="/physios">
                <Physios></Physios>
              </Route>
              <Route exact path="/sessions/update/:id">
                <UpdateSessionForm></UpdateSessionForm>
              </Route>
              <Route exact path="/sessions/add">
                <NewSessionForm></NewSessionForm>
              </Route>
              <Route exact path="/sessions">
                <Sessions></Sessions>
              </Route>
              <Route exact path="/clients/add">
                <NewClientForm></NewClientForm>
              </Route>
              <Route exact path="/clients/update/:id">
                <UpdateClientForm></UpdateClientForm>
              </Route>
              <Route exact path="/clients/:id">
                <ClientProfile></ClientProfile>
              </Route>
              <Route exact path="/clients">
                <Clients></Clients>
              </Route>
              <Route path="/">
                <Landing></Landing>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
