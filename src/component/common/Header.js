import React, {useContext} from 'react';
import { Navbar, Nav, Dropdown} from 'rsuite';
import { AuthContext } from './../../_provider/AuthProvider';
import { auth } from '../../_firebase-conf/firebase.config';
import { Redirect } from 'react-router-dom';

const Header = () => {
    const user = useContext(AuthContext);
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                return <Redirect to="/" />
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="page-header">
            <Navbar appearance="default">
                <Navbar.Header>
                    <a href="/" className="navbar-brand logo">RSUITE</a>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav pullRight>
                        <Dropdown title={user.email} placement="bottomEnd">
                            <Dropdown.Item>{user.email}</Dropdown.Item>
                            <Dropdown.Item onSelect={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </div>
    )
}

export default Header;