import {IDevelopmentService} from "../../../models/models.ts";
import {FC, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {
    deleteDevFromRequest, deleteDraftRequest,
    fetchRequestByUUID, moderatorConfirmRequest, requestScopeSave, requestSpecSave,
    userConfirmRequest
} from "../../../store/network/ActionCreatorRequests.ts";
import {useNavigate, useParams} from "react-router-dom";
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import { useCookies } from 'react-cookie';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

interface RequestDetailsProps {
}

const RequestDetails: FC<RequestDetailsProps> = () => {
    const navigate = useNavigate();
    const {request_id} = useParams()
    const dispatch = useAppDispatch()
    const {request} = useAppSelector(state => state.requestSlice)

    const [workSpec, setWorkSpec] = useState(request?.work_specification);
    const [workDesc, setWorkDesc] = useState<{ [key: string]: string }>({});

    const handleWorkDescChange = (uuid: string, newValue: string) => {
        setWorkDesc(prevState => ({
            ...prevState,
            [uuid]: newValue,
        }));
    };

    const [cookies] = useCookies(['role']);

    useEffect(() => {
        if (request_id) {
            dispatch(fetchRequestByUUID(request_id))
        }
    }, []);

    useEffect(() => {
        // Заполнение начальными значениями из request?.development_services
        if (request) {
            const initialWorkDesc = request.development_services.reduce((acc, developmentService) => {
                acc[developmentService.uuid] = developmentService.ServiceRequest?.WorkScope || '';
                return acc;
            }, {} as { [key: string]: string });

            setWorkDesc(initialWorkDesc);
        }
    }, [request]);

    useEffect(() => {
        if (request) {
            setWorkSpec(request.work_specification)
        }
    }, [request]);

    const handleDelete = (service: IDevelopmentService) => {
        dispatch(deleteDevFromRequest(request_id ?? '', service.uuid))
            .then(() => {
                window.location.reload(); // Устанавливаем значение в false после завершения операции
            });
    };

    const handleUserConfirm = () => {
        dispatch(userConfirmRequest(request_id ?? ''))
            .then(() => {
                window.location.reload(); // Устанавливаем значение в false после завершения операции
            });
    };

    const handleDraftDelete = () => {
        dispatch(deleteDraftRequest(request_id ?? ''))
            .then(() => {
                navigate('/devs')
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

    const handleSaveSpec = () => {
        dispatch(requestSpecSave(request_id ?? '', workSpec ?? ''))
    };

    const handleSaveDev = (dev_id: string, workScope: string) => {
        dispatch(requestScopeSave(request_id ?? '', dev_id ?? '', workScope ?? ''))
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
                            { request?.record_status !== 0 && (
                                <p>Спецификация работы: {request?.work_specification || 'отсутствует'}</p>
                            )}
                            { request?.record_status === 0 && (
                            <div className="row mb-3">
                                <p className="mb-1">Спецификация работы: </p>
                                <div>
                                    <input type="text" value={workSpec} className="col-9 ms-3 h-100 mt-1"
                                           onChange={(e) => setWorkSpec(e.target.value)}/>
                                    <button className='btn btn-light ms-3' onClick={handleSaveSpec}>Сохранить</button>
                                </div>
                            </div>
                            )}
                            <p>Статус оплаты:
                                {
                                    request?.payment_status === '0' ? ' 1) Отклонена' :
                                        request?.payment_status === '1' ? ' 2) Успешна' :
                                            request?.payment_status === '2' ? ' 3) Не обработана' :
                                                ' Статус неизвестен'
                                }
                            </p>
                            <p>Создатель: {request?.creator || 'отсутствует'}</p>
                            <p>Модератор: {request?.moderator || 'отсутствует'}</p>
                        </div>
                        <div className="card-buttons ms-3 mb-4">
                        {cookies.role && (cookies.role === 1 || cookies.role === 2) && request?.record_status === 0 && (
                                <>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleUserConfirm()}
                                    >
                                        Сформировать
                                    </button>
                                    <button
                                        className="btn btn-danger ms-3"
                                        onClick={() => handleDraftDelete()}
                                    >
                                        Удалить
                                    </button>
                                </>
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
                                    <th>Описание работы</th>
                                    { request?.record_status === 0 && (
                                    <th></th>
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                {request?.development_services.map((developmentService, index) => (
                                    <tr key={index}>
                                        <td>{developmentService.Title}</td>
                                        <td>{developmentService.Description}</td>
                                        <td><img src={developmentService.image_url} style={{
                                            width: 200,
                                            height: 100,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            objectFit: 'cover',
                                            backgroundRepeat: "no-repeat"
                                        }}/></td>
                                        <td>{developmentService.Price}</td>
                                        <td>{developmentService.Technology}</td>
                                        <td>{developmentService.DetailedPrice}</td>
                                        <td className="col-3">
                                            { request?.record_status !== 0 && (
                                                workDesc[developmentService.uuid]
                                            )}
                                            { request?.record_status === 0 && (
                                            <textarea value={workDesc[developmentService.uuid] || ''} className="col-9 ms-3 h-100 mt-1"
                                            onChange={(e) => handleWorkDescChange(developmentService.uuid, e.target.value)}
                                            />
                                            )}
                                        </td>
                                        { request?.record_status === 0 && (
                                        <td>
                                            <button
                                                className="btn btn-light mb-3"
                                                onClick={() => handleSaveDev(developmentService.uuid, workDesc[developmentService.uuid])}
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(developmentService)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                        )}
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
