import {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import './CustomerRequestsTable.css';
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {
    fetchRequests,
    moderatorConfirmRequest,
} from "../../../store/network/ActionCreatorRequests.ts";
import Cookies from "js-cookie";
import {useCookies} from "react-cookie";
import {Button} from "react-bootstrap";
import {progressSlice} from "../../../store/reducers/ProgressState.ts";

const CustomerRequestsTable = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const jwtToken = Cookies.get('jwtToken')
    const role = Cookies.get('role')
    const {requests} = useAppSelector(state => state.requestSlice)

    const {recordStatusValue, formationDateStartValue, formationDateEndValue, creatorFilterValue} = useAppSelector(state => state.progressReducer)

    const [recordStatus, setRecordStatus] = useState(recordStatusValue);
    const [formationDateStart, setFormationDateStart] = useState(formationDateStartValue);
    const [formationDateEnd, setFormationDateEnd] = useState(formationDateEndValue);

    const [filteredRequests, setFilteredRequests] = useState(requests);
    const [creatorFilter, setCreatorFilter] = useState(creatorFilterValue);

    const [cookies] = useCookies(['role']);

    useEffect(() => {
        if (creatorFilter === '') {
            setFilteredRequests(requests);
        } else {
            const filteredData = requests.filter(request => request.creator.includes(creatorFilter));
            setFilteredRequests(filteredData);
        }
    }, [requests, creatorFilterValue]);

    // useEffect(() => {
    //     dispatch(fetchRequests())
    // }, []);
    useEffect(() => {
        dispatch(fetchRequests(recordStatus, formationDateStart, formationDateEnd));
        const fetchInterval = setInterval(() => {
            dispatch(fetchRequests(recordStatus, formationDateStart, formationDateEnd));
        }, 5000); // Обновлять данные каждые 5 секунд

        return () => clearInterval(fetchInterval); // Очищать интервал при размонтировании компонента
    }, [recordStatusValue, formationDateStartValue, formationDateEndValue, dispatch]);

    if (!jwtToken) {
        return <Link to="/login">
            <button className="btn btn-danger mt-3">Требуется авторизоваться</button>
        </Link>
    }

    const handleFilters = () => {
        dispatch(progressSlice.actions.setRecordStatusValue(recordStatus))
        dispatch(progressSlice.actions.setFormationDateStartValue(formationDateStart))
        dispatch(progressSlice.actions.setFormationDateEndValue(formationDateEnd))
        dispatch(progressSlice.actions.setCreatorFilterValue(creatorFilter))
    }

    const handleConfirm = (uuid: string) => {
        dispatch(moderatorConfirmRequest(uuid ?? '', 2))
            // .then(() => {
            //     window.location.reload(); // Устанавливаем значение в false после завершения операции
            // });
    };

    const handleCancel = (uuid: string) => {
        dispatch(moderatorConfirmRequest(uuid ?? '', 3))
            // .then(() => {
            //     window.location.reload(); // Устанавливаем значение в false после завершения операции
            // });
    };

    return (
        <>
            <Breadcrumbs paths={[{name: 'Заказы', path: '/request'}]}/>

            <div className="filter-container p-2 mb-2 d-flex">
                <div className="">
                <label htmlFor="recordStatus" className="me-1">Номер статуса заказа:</label>
                <input type="text" id="recordStatus" className="me-2 col-1" value={recordStatus}
                       onChange={e => setRecordStatus(e.target.value)}/>

                <label htmlFor="formationDateStart" className="me-1">Начальная дата формирования:</label>
                <input type="date" id="formationDateStart" className="me-2" value={formationDateStart}
                       onChange={e => setFormationDateStart(e.target.value)}/>

                <label htmlFor="formationDateEnd" className="me-1">Конечная дата формирования:</label>
                <input type="date" id="formationDateEnd" className="me-2" value={formationDateEnd}
                       onChange={e => setFormationDateEnd(e.target.value)}/>


                { role === '2' && (
                    <div className="mt-2">
                <label htmlFor="creator" className="me-1">Создатель:</label>
                <input
                    type="text"
                    id="creator"
                    value={creatorFilter}
                    className="col-1"
                    onChange={(e) => setCreatorFilter(e.target.value)}
                />
                    </div>
                )}
                </div>

                <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    className="btn-primary btn-dark col-1"
                    onClick={handleFilters}
                >
                    Применить
                </Button>

            </div>

            <div className="custom-table-container">
                <Table striped bordered hover className="custom-table">
                    <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Статус заказа</th>
                        <th>Дата создания</th>
                        <th>Дата формирования</th>
                        <th>Дата завершения</th>
                        <th>Спецификация работы</th>
                        <th>Статус оплаты</th>
                        <th>Создатель</th>
                        <th>Модератор</th>
                        {cookies.role && cookies.role === 2 && (
                        <th>Действия</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRequests.map((request, index) => (
                        <tr key={`${request.uuid}-${index}`}>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>{request.uuid}</td>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>
                                {
                                    request.record_status === 1 ? '1) В работе' :
                                        request.record_status === 2 ? '2) Завершена' :
                                            request.record_status === 3 ? '3) Отклонена' :
                                                'Статус неизвестен'
                                }
                            </td>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>{request.creation_date}</td>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>{request.formation_date}</td>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>{request.completion_date}</td>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>{request.work_specification}</td>
                            <td>
                                {
                                    request.payment_status === '0' ? '1) Отклонена' :
                                        request.payment_status === '1' ? '2) Успешна' :
                                            request.payment_status === '2' ? '3) Не обработана' :
                                                'Статус неизвестен'
                                }
                            </td>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>{request.creator}</td>
                            <td onClick={() => navigate(`/requests/${request.uuid}`)}>{request.moderator}</td>
                            {cookies.role && cookies.role === 2 && (
                            <td className="col-1">
                                {cookies.role && cookies.role === 2 && request?.record_status === 1 && (
                                    <>
                                        <button
                                            className="btn btn-success mb-2"
                                            onClick={() => handleConfirm(request.uuid)}
                                        >
                                            Подтвердить
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleCancel(request.uuid)}
                                        >
                                            Отменить
                                        </button>
                                    </>
                                )}
                            </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default CustomerRequestsTable;
