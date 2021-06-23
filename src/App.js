import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Login from './component/login/Login';
import Core from './component/core/Core';
import RouteGuard from './_helpers/RouteGuard';
import AuthProvider from './_provider/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
          <RouteGuard exact path="/" component={Core} />
          <Route exact path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
