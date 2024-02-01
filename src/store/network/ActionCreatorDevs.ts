import Cookies from "js-cookie";
import axios from "axios";
import {AppDispatch} from "../store.ts";
import {IDevelopmentService, IDraftCustomerRequest} from "../../models/models.ts";
import {animationSlice} from "../reducers/AnimationsState.ts";
import {devsSlice} from "../reducers/DevsState.ts";
import {mockDevs} from "../../models/MockData.ts";

export const fetchDevs = (filter?: string, makeLoading: boolean = true) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
        draft_customer_request: IDraftCustomerRequest | null
        development_services: IDevelopmentService[]
    }

    const accessToken = Cookies.get('jwtToken')
    // dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken != ""));
    const config = {
        method: "get",
        url: `/api/devs?name=${filter ?? ""}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
    }

    try {
        if (makeLoading) {
            dispatch(animationSlice.actions.startLoading())
        }
        const response = await axios<ServerResponse>(config);
        console.log(response)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
            console.log('Bad server response or GitHub');
            dispatch(devsSlice.actions.setDevs(filterMock(filter)));
            dispatch(animationSlice.actions.finishLoading());
            return;
        }

        dispatch(devsSlice.actions.setDevs(response.data.development_services))
        const draftCustomerRequestUuid = response.data.draft_customer_request ? response.data.draft_customer_request.uuid : '';
        dispatch(devsSlice.actions.setBasketID(draftCustomerRequestUuid));
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        // dispatch(animationSlice.actions.setError(`${e}`))
        dispatch(devsSlice.actions.setDevs(filterMock(filter)))
        dispatch(animationSlice.actions.finishLoading())
    }
}

export const getDevByUUID = (uuid: string) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('jwtToken')
    // dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken != ""));
    const config = {
        method: "get",
        url: `/api/devs/${uuid}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<IDevelopmentService>(config);
        console.log(response)
        dispatch(devsSlice.actions.setDev(response.data))
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        // dispatch(animationSlice.actions.setError(`Ошибка нахождения услуги по разработке`))
        dispatch(devsSlice.actions.setDev(mockByUUID(uuid)!))
    }
}

export const updateDev = (updateDev: IDevelopmentService, image: File | undefined) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }


    const formData = new FormData();
    if (image) {
        formData.append('image', image);
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "put",
        url: `/api/devs/${updateDev.uuid}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
        params: {
            Title: updateDev.Title ? updateDev.Title : undefined,
            Description: updateDev.Description ? updateDev.Description : undefined,
            Price: updateDev.Price !== 0 ? updateDev.Price : undefined,
            DetailedPrice: updateDev.DetailedPrice !== 0 ? updateDev.DetailedPrice : undefined,
            Technology: updateDev.Technology ? updateDev.Technology : undefined,
        },
        data: formData,
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        // dispatch(animationSlice.actions.setSuccess(`${developmentServiceID} Успешно добавлен в заявку`))
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка удаления услуги по разработке`))
    }
}

export const deleteDev = (uuid: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "delete",
        url: `/api/devs/${uuid}`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        // dispatch(animationSlice.actions.setSuccess(`${developmentServiceID} Успешно добавлен в заявку`))
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка удаления услуги по разработке`))
    }
}

export const createDev = (createDev: IDevelopmentService, image: File | undefined) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }


    const formData = new FormData();
    if (image) {
        formData.append('image', image);
    }
    if (createDev.Title) {
        formData.append('Title', createDev.Title)
    }
    if (createDev.Description) {
        formData.append('Description', createDev.Description)
    }
    if (createDev.Technology) {
        formData.append('Technology', createDev.Technology)
    }
    if (createDev.Price !== 0) {
        formData.append('Price', createDev.Price.toString())
    }
    if (createDev.DetailedPrice !== 0) {
        formData.append('DetailedPrice', createDev.DetailedPrice.toString())
    }
    console.log(image)
    console.log(formData.get('image'))

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "post",
        url: `/api/devs/`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
        data: formData,
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        // dispatch(animationSlice.actions.setSuccess(`${developmentServiceID} Успешно добавлен в заявку`))
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка создания услуги по разработке`))
    }
}

export const addDevIntoRequest = (developmentServiceID: string) => async (dispatch: AppDispatch) => {
    interface ServerResponse {
    }

    const accessToken = Cookies.get('jwtToken')
    const config = {
        method: "post",
        url: `/api/devs/${developmentServiceID}/add_to_request`,
        headers: {
            Authorization: `Bearer ${accessToken ?? ''}`,
        },
    }

    try {
        dispatch(animationSlice.actions.startLoading())
        const response = await axios<ServerResponse>(config);
        console.log(response)
        dispatch(animationSlice.actions.setSuccess(`${developmentServiceID} Успешно добавлен в заявку`))
        dispatch(animationSlice.actions.finishLoading())
    } catch (e) {
        console.log(e)
        dispatch(animationSlice.actions.setError(`Ошибка добавления услуги по разработке в корзину`))
    }
}

// MARK: - Helper

function filterMock(searchValue?: string): IDevelopmentService[] {
    if (searchValue) {
        return mockDevs.filter(dev =>
            dev.Title?.toLowerCase().includes((searchValue ?? '').toLowerCase())
            || `${dev.Price ?? ''}`.includes((searchValue ?? '').toLowerCase())
        );
    }
    return mockDevs
}

function mockByUUID(uuid: string): IDevelopmentService | undefined {
    return mockDevs.find(dev => dev.uuid === uuid);
}
