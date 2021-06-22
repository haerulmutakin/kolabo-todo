import React, { createContext } from 'react';
import { auth } from "../firebase.config";

export const AuthContext = createContext({ user: null });
class AuthProvider extends React.Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        auth.onAuthStateChanged(userAuth => {
            const userDetail = {
                email: userAuth.email,
            }
            this.setState({ user: userDetail}, () => console.log(this.state.user));
          });
    }
    render() {
        return (
          <AuthContext.Provider value={this.state.user}>
            {this.props.children}
          </AuthContext.Provider>
        );
      }
}

export default AuthProvider;
