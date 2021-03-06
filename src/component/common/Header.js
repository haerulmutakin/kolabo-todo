import React, {useContext} from 'react';
import { Navbar, Nav, Dropdown} from 'rsuite';
import { AuthContext } from './../../_provider/AuthProvider';
import { auth } from '../../_firebase-conf/firebase.config';

const Header = ({history}) => {
    const user = useContext(AuthContext);
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                history.push('/login')
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="page-header">
            <Navbar appearance="default">
                <Navbar.Header>
                    <h3 className="navbar-brand logo">TODO</h3>
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