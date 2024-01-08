import {FC, useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../../store/network/ActionCreatorUser.ts";
import Cookies from "js-cookie";
// import {useAppDispatch} from '../../../hooks/redux.ts';
// import {loginSession} from "../../../store/reducers/ActionCreator.ts";
// import {useNavigate} from 'react-router-dom';

interface LoginPageProps {
}

const LoginPage: FC<LoginPageProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const jwtToken = Cookies.get('jwtToken')
    const {errorText} = useAppSelector(state => state.animationReducer)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (!login || !password) {
            alert('Введите логин и пароль');
            return;
        }
        dispatch(loginUser(login, password))
    };

    if (jwtToken) {
        navigate('/devs')
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <label className="link-danger text-wrong-password">
                            {errorText}
                        </label>
                        <div className="bg-dark p-4 rounded">
                            <h2 className="text-center mb-4" style={{color: 'white'}}>Авторизация</h2>
                            <Form.Label className="font-weight-bold text-left">Логин</Form.Label>
                            <Form.Control
                                onChange={(e) => setLogin(e.target.value)}
                                type="login"
                                placeholder="Введите логин"
                                required
                            />

                            <Form.Label className="mt-3">Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button variant="primary" type="submit" className="w-100 mt-4" onClick={handleSubmit}
                                    style={{borderRadius: '10px'}}>
                                Войти
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;
