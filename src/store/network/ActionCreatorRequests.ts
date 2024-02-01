import {AppDispatch} from "../store.ts";
import {ICustomerRequest} from "../../models/models.ts";
import Cookies from "js-cookie";
import {animationSlice} from "../reducers/AnimationsState.ts";
import axios from "axios";
import {requestSlice} from "../reducers/RequestState.ts";

export const fetchRequests = (recordStatus: string, formationDateStart: string, formationDateEnd: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
        customer_requests: ICustomerRequest[]
    }

    console.log(recordStatus)
    console.log(formationDateStart)
    console.log(formationDateEnd)

    const accessToken = Cookies.get('jwtToken')

    const params: { [key: string]: string } = {};
    if (recordStatus !== '') {
        params['status'] = recordStatus;
    }
    if (formationDateStart != '') {
        params['formation_date_start'] = formationDateStart + ' 00:00:00';
    }
    if (formationDateEnd != '') {
        params['formation_date_end'] = formationDateEnd + ' 23:59:59';
    }

    const config = {
        method: "get",
        url: `/api/requests`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
        params: params,
    }

    try {
        dispatch(animationSlice.actions.startLoading())

        const response = await axios<ServerResponse>(config);
        console.log(response.data.customer_requests)
        console.log(response)
        dispatch(requestSlice.actions.setRequests(response.data.customer_requests))
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.finishLoading())
        // dispatch(animationSlice.actions.setError(`${e}`))
    }
}

export const fetchRequestByUUID = (uuid: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
        customer_request: ICustomerRequest
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "get",
        url: `/api/requests/${uuid}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(requestSlice.actions.setRequest(response.data.customer_request))
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка просмотра заявки`))
        dispatch(animationSlice.actions.finishLoading())
    }
}

export const deleteDevFromRequest = (requestUUID: string, devUUID: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "delete",
        url: `/api/requests/${requestUUID}/delete_development_service/${devUUID}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка удаления из корзины`))
    }
}

export const userConfirmRequest = (requestUUID: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "put",
        url: `/api/requests/${requestUUID}/user_confirm`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
        params: {
            confirm: true,
        }
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка подтверждения заказа`))
    }
}

export const deleteDraftRequest = (requestUUID: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "delete",
        url: `/api/requests/${requestUUID}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка удаления заказа`))
    }
}

export const moderatorConfirmRequest = (requestUUID: string, status: number) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "put",
        url: `/api/requests/${requestUUID}/moderator_confirm`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
        params: {
            confirm: true,
            status: status,
        }
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка подтверждения заказа`))
    }
}

export const requestSpecSave = (requestUUID: string, workSpec: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "put",
        url: `/api/requests/${requestUUID}/update`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
        params: {
            work_specification: workSpec,
        }
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка сохранения спецификации`))
    }
}

export const requestScopeSave = (requestUUID: string, devId: string, workScope: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "put",
        url: `/api/requests/${requestUUID}/change_scope/${devId}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
        params: {
            work_scope: workScope,
        }
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка сохранения описания`))
    }
}
