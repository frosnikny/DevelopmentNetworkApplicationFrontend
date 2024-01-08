import {AppDispatch} from "../store.ts";
import Cookies from "js-cookie";
import {animationSlice} from "../reducers/AnimationsState.ts";
import axios from "axios";
// import jwtt from 'jsonwebtoken';

export const registerUser = (
    login: string,
    password: string,
) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const config = {
        method: "post",
        url: `/api/user/sign_up`,
        data: {
            login: login,
            password: password,
        }
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.setSuccess('Вы успешно зарегистрировались'))
    } catch (e) {
        dispatch(animationSlice.actions.setError(`${e}`))
    }
}

export const loginUser = (
    login: string,
    password: string,
) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
        access_token: string
        role: number
    }

    const config = {
        method: "post",
        url: `/api/user/login`,
        data: {
            login: login,
            password: password,
        }
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);

        // const secret = 'peppa'; // секретный ключ
        // //
        // // // получение роли из расшифрованного токена
        // const token = response.data.access_token
        //
        // // декодирование токена с использованием секретного ключа
        // const decodedToken = jwtt.verify(token, secret);
        //
        // console.log(decodedToken)

        // получение роли из расшифрованного токена
        // const role = decodedToken.role;

        // console.log(role)
        // console.log(loggn)

        Cookies.set('jwtToken', response.data.access_token)
        Cookies.set('login', login)
        Cookies.set('role', response.data.role.toString())
        dispatch(animationSlice.actions.setSuccess('Успешный вход'))
    } catch (e) {
        dispatch(animationSlice.actions.setError(`${e}`))
    }
}
