import List from "../../Helpers/List/List.tsx";
import {IDevelopmentService} from "../../../models/models.ts";
import DevelopmentItem from "../DevelopmentItem/DevelopmentItem.tsx";
import {Button} from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import {progressSlice} from "../../../store/reducers/ProgressState.ts";
import {fetchDevs} from "../../../store/network/ActionCreatorDevs.ts";
import {useNavigate} from "react-router-dom";

const DevelopmentList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {searchValue} = useAppSelector(state => state.progressReducer)
    const {devs, basketID} = useAppSelector(state => state.devsReducer)
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

    const didTapBasket = () => {
        navigate(`../requests/${basketID}`)
    }

    return (
        <>
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
                        className="shadow"
                    >
                        Поиск
                    </Button>
                </Form>
            </Navbar>
            <Button
                variant="primary"
                onClick={didTapBasket}
                disabled={basketID == null}
                style={{position: 'absolute', right: 40, top: 80}}
            >
                Черновая заявка
            </Button>
            <Breadcrumbs paths={[{name: 'Главная', path: '/'}]}/>
            {devs.length == 0 && <h1>Услуг нет</h1>}
            <div className="many-cards">
                <List items={devs} renderItem={(dev: IDevelopmentService) =>
                    <DevelopmentItem dev={dev} key={dev.uuid}/>
                }
                />
            </div>
        </>
    );
};

export default DevelopmentList;