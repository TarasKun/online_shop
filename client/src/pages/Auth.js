import React, {useState, useContext} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {useNavigate} from 'react-router-dom';
import {login, registration} from "../http/userAPI";
import {Context} from "../index";


const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                await login(email, password);
            } else {
                await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Don't have account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                            </div>
                            :
                            <div>
                                Have account? <NavLink to={LOGIN_ROUTE}>Enter!</NavLink>
                            </div>
                        }
                        <Button
                            variant='outline-success'
                            onClick={click}
                        >
                            {isLogin ? 'Enter' : 'Register'}
                        </Button>
                    </div>

                </Form>
            </Card>
        </Container>
    );
};

export default Auth;