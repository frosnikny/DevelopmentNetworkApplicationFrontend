import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import './ModerateDevsTable.css';
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import {fetchDevs} from "../../../store/network/ActionCreatorDevs.ts";
import {progressSlice} from "../../../store/reducers/ProgressState.ts";
import {defaultImage} from "../../../models/models.ts";

const ModerateDevsTable = () => {
    // const jwtToken = Cookies.get('jwtToken')
    const role_cookie = Cookies.get('role')

    if (role_cookie !== '2') {
        return <Link to="/login">
            <button className="btn btn-danger mt-3">Доступно только модераторам</button>
        </Link>
    }

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {searchValue} = useAppSelector(state => state.progressReducer)
    const {devs} = useAppSelector(state => state.devsReducer)
    const [searchText, setSearchText] = useState(searchValue)

    useEffect(() => {
        fetchData()
    }, [searchValue]);

    const fetchData = () => {
        dispatch(fetchDevs(searchValue))
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchText)
        dispatch(progressSlice.actions.setSearch(searchText))
    }

    return (
        <>
            <Breadcrumbs paths={[{name: 'Управление видами разработки', path: '/moderate-devs'}]}/>

            <Navbar>
                <Form className="d-flex flex-row flex-grow-1 gap-2" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Поиск"
                        className="form-control-sm flex-grow-1 shadow shadow-sm"
                        data-bs-theme="dark"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        type="submit"
                        className="btn-primary"
                    >
                        Поиск
                    </Button>
                    <Link
                        to="new"
                        className="btn btn-dark"
                    >
                        Добавить
                    </Link>
                </Form>
            </Navbar>

            <div className="custom-table-container">
                <Table striped bordered hover className="custom-table">
                    <thead>
                    <tr>
                        <th className="text-center">Изображение</th>
                        <th className="text-center">Название</th>
                        <th className="text-center">Цена</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {devs.map((dev, index) => (
                        <tr className="" key={`${dev.uuid}-${index}`} onClick={() => navigate(`/moderate-devs/${dev.uuid}`)}>
                            <td className="col-2">
                                <img className="img-fluid" src={dev.image_url ?? defaultImage} alt={dev.Title}></img>
                            </td>
                            <td className="text-center">{dev.Title}</td>
                            <td className="text-center">{dev.Price} ₽</td>
                            <td className="col-1"><button className="btn btn-dark">Редактировать</button></td>
                            {/*<td>{request.completion_date}</td>*/}
                            {/*<td>{request.work_specification}</td>*/}
                            {/*<td>{request.creator}</td>*/}
                            {/*<td>{request.moderator}</td>*/}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ModerateDevsTable;
