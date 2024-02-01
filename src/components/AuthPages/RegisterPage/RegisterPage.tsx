import {FC, useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {useAppDispatch} from "../../../hooks/redux.ts";
import {useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import {registerUser} from "../../../store/network/ActionCreatorUser.ts";

interface RegisterPageProps {
}

const RegisterPage: FC<RegisterPageProps> = () => {
    const dispatch = useAppDispatch();
    const jwtToken = Cookies.get('jwtToken')
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {

        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        dispatch(registerUser(login, password))
    };

    if (jwtToken) {
        navigate('/devs')
    }

    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <Col md={5}>
                    <div className="bg-dark p-4 rounded">
                        <h2 className="text-center mb-4" style={{color: 'white'}}>Регистрация</h2>

                        <Form.Label className="mt-3">Логин</Form.Label>
                        <Form.Control
                            onChange={(e) => setLogin(e.target.value)}
                            type="text"
                            placeholder="Введите логин"
                            required
                        />

                        <Form.Label className="mt-3">Пароль</Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Введите пароль"
                            required
                        />

                        <Form.Label className="mt-3">Подтвердите пароль</Form.Label>
                        <Form.Control
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Подтвердите пароль"
                            required
                        />

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mt-4"
                            onClick={handleRegister}
                            style={{borderRadius: '10px'}}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
