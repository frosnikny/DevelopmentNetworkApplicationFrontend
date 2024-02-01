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
    // const [draft, setDraft] = useState<string | null>(null)

    useEffect(() => {
        fetchData()
    }, [searchValue, basketID]);

    // const [isSearching, setIsSearching] = useState(true);
    const fetchData = () => {
        dispatch(fetchDevs(searchValue))
    }



    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(progressSlice.actions.setSearch(searchText))
    }

    const didTapBasket = () => {
        navigate(`../requests/${basketID}`)
    }

    return (
        <>
            <Breadcrumbs paths={[{name: 'Виды разработки', path: '/'}]}/>

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
                        className="shadow btn-dark"
                    >
                        Поиск
                    </Button>
                </Form>
            </Navbar>
            {devs.length == 0 && <h1>Услуг нет</h1>}
            <div className="many-cards">
                <List items={devs} renderItem={(dev: IDevelopmentService) =>
                    <DevelopmentItem dev={dev} key={dev.uuid}/>
                }
                />
            </div>
            <div className="fixed-bottom ms-4 mb-4">
                <Button
                    variant="primary"
                    onClick={didTapBasket}
                    disabled={!basketID}
                    className="btn-dark"
                >
                    Проверить заказ
                </Button>
            </div>
        </>
    );
};

export default DevelopmentList;