import {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import './ModerateDevsTable.css';
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {fetchRequests} from "../../../store/network/ActionCreatorRequests.ts";
import Cookies from "js-cookie";

const ModerateDevsTable = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const jwtToken = Cookies.get('jwtToken')
    const {requests} = useAppSelector(state => state.requestSlice)

    const [recordStatus, setRecordStatus] = useState('');
    const [formationDateStart, setFormationDateStart] = useState('');
    const [formationDateEnd, setFormationDateEnd] = useState('');

    const [filteredRequests, setFilteredRequests] = useState(requests);
    const [creatorFilter, setCreatorFilter] = useState('');
    useEffect(() => {
        if (creatorFilter === '') {
            setFilteredRequests(requests);
        } else {
            const filteredData = requests.filter(request => request.creator.includes(creatorFilter));
            setFilteredRequests(filteredData);
        }
    }, [requests, creatorFilter]);

    // useEffect(() => {
    //     dispatch(fetchRequests())
    // }, []);
    useEffect(() => {
        dispatch(fetchRequests(recordStatus, formationDateStart, formationDateEnd));
    }, [recordStatus, formationDateStart, formationDateEnd, dispatch]);

    if (!jwtToken) {
        return <Link to="/login">
            <button className="btn btn-danger mt-3">Требуется авторизоваться</button>
        </Link>
    }

    return (
        <>
            <Breadcrumbs paths={[{name: 'Заказы', path: '/request'}]}/>

            <div className="filter-container p-2 mb-2">
                <label htmlFor="recordStatus" className="me-1">Record Status:</label>
                <input type="text" id="recordStatus" className="me-2" value={recordStatus}
                       onChange={e => setRecordStatus(e.target.value)}/>

                <label htmlFor="formationDateStart" className="me-1">Formation Date Start:</label>
                <input type="date" id="formationDateStart" className="me-2" value={formationDateStart}
                       onChange={e => setFormationDateStart(e.target.value)}/>

                <label htmlFor="formationDateEnd" className="me-1">Formation Date End:</label>
                <input type="date" id="formationDateEnd" className="me-2" value={formationDateEnd}
                       onChange={e => setFormationDateEnd(e.target.value)}/>

                <label htmlFor="creator" className="me-1">Creator:</label>
                <input
                    type="text"
                    id="creator"
                    value={creatorFilter}
                    onChange={(e) => setCreatorFilter(e.target.value)}
                />
            </div>

            <div className="custom-table-container">
                <Table striped bordered hover className="custom-table">
                    <thead>
                    <tr>
                    <th>UUID</th>
                        <th>Record Status</th>
                        <th>Creation Date</th>
                        <th>Formation Date</th>
                        <th>Completion Date</th>
                        <th>Work Specification</th>
                        <th>Creator ID</th>
                        <th>Moderator ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRequests.map((request, index) => (
                        <tr key={`${request.uuid}-${index}`} onClick={() => navigate(`/requests/${request.uuid}`)}>
                            <td>{request.uuid}</td>
                            <td>{request.record_status}</td>
                            <td>{request.creation_date}</td>
                            <td>{request.formation_date}</td>
                            <td>{request.completion_date}</td>
                            <td>{request.work_specification}</td>
                            <td>{request.creator}</td>
                            <td>{request.moderator}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ModerateDevsTable;
