import {IDevelopmentService} from "../../../models/models.ts";
import {FC, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {
    deleteDevFromRequest,
    fetchRequestByUUID, moderatorConfirmRequest,
    userConfirmRequest
} from "../../../store/network/ActionCreatorRequests.ts";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import { useCookies } from 'react-cookie';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

interface RequestDetailsProps {
}

const RequestDetails: FC<RequestDetailsProps> = () => {
    const {request_id} = useParams()
    const dispatch = useAppDispatch()
    const {request} = useAppSelector(state => state.requestSlice)

    const [cookies] = useCookies(['role']);

    useEffect(() => {
        if (request_id) {
            dispatch(fetchRequestByUUID(request_id))
        }
    }, []);

    const handleDelete = (service: IDevelopmentService) => {
        dispatch(deleteDevFromRequest(request_id ?? '', service.uuid))
            .then(() => {
                window.location.reload(); // Устанавливаем значение в false после завершения операции
            });
    };

    const handleUserConfirm = () => {
        // toast.success('Запрос отправлен');
        // console.log("toast")
        dispatch(userConfirmRequest(request_id ?? ''))
            .then(() => {
                window.location.reload(); // Устанавливаем значение в false после завершения операции
            });
    };

    const handleConfirm = () => {
        dispatch(moderatorConfirmRequest(request_id ?? '', 2))
            .then(() => {
                window.location.reload(); // Устанавливаем значение в false после завершения операции
            });
    };

    const handleCancel = () => {
        dispatch(moderatorConfirmRequest(request_id ?? '', 3))
            .then(() => {
                window.location.reload(); // Устанавливаем значение в false после завершения операции
            });
    };

    if (!request_id) {
        return <h1>Неверный формат заказа</h1>
    }

    return (
        <>
            <Breadcrumbs paths={[
                {name: 'Заказы', path: '/requests'},
                {name: `${request?.uuid}`, path: `/requests/${request_id}`}
            ]}/>

            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="card bg-dark text-white">
                        <div className="card-header">
                            <h2>Информация о заказе</h2>
                        </div>
                        <div className="card-body">
                            {/*<p>UUID: {request?.uuid}</p>*/}
                            <p>Статус заказа: {
                                request?.record_status === 0 ? '0) Составляется' :
                                request?.record_status === 1 ? '1) В работе' :
                                    request?.record_status === 2 ? '2) Завершена' :
                                        request?.record_status === 3 ? '3) Отклонена' :
                                            'Статус неизвестен'
                            }</p>
                            <p>Дата создания: {request?.creation_date || 'отсутствует'}</p>
                            <p>Дата формирования: {request?.formation_date || 'отсутствует'}</p>
                            <p>Дата завершения: {request?.completion_date || 'отсутствует'}</p>
                            <p>Спецификация работы: {request?.work_specification || 'отсутствует'}</p>
                            <p>Создатель: {request?.creator || 'отсутствует'}</p>
                            <p>Модератор: {request?.moderator || 'отсутствует'}</p>
                        </div>
                        <div className="card-buttons ms-3 mb-4">
                            {cookies.role && (cookies.role === 1 || cookies.role === 2) && request?.record_status === 0 && (
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleUserConfirm()}
                                >
                                    Сформировать
                                </button>
                            )}
                            {cookies.role && cookies.role === 2 && request?.record_status === 1 && (
                                <>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleConfirm()}
                                    >
                                        Подтвердить
                                    </button>
                                    <button
                                        className="btn btn-danger ms-3"
                                        onClick={() => handleCancel()}
                                    >
                                        Отменить
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="card bg-dark text-white">
                        <div className="card-header">
                            <h2>Виды разработки в заказе</h2>
                        </div>
                        <div className="card-body">
                            <table className="table table-dark">
                                <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Описание</th>
                                    <th>Изображение</th>
                                    <th>Начальная стоимость</th>
                                    <th>Технологии</th>
                                    <th>Цена за день</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {request?.development_services.map((serviceRequest, index) => (
                                    <tr key={index}>
                                        <td>{serviceRequest.Title}</td>
                                        <td>{serviceRequest.Description}</td>
                                        <td><img src={serviceRequest.image_url} style={{
                                            width: 200,
                                            height: 100,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            objectFit: 'cover',
                                            backgroundRepeat: "no-repeat"
                                        }}/></td>
                                        <td>{serviceRequest.Price}</td>
                                        <td>{serviceRequest.Technology}</td>
                                        <td>{serviceRequest.DetailedPrice}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(serviceRequest)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestDetails;
