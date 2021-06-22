import './App.scss';
import Login from './component/login/Login';
import AuthProvider from './provider/AuthProvider';

function App() {
  return (
    <AuthProvider>
        <Login />
    </AuthProvider>
  );
}

export default App;
