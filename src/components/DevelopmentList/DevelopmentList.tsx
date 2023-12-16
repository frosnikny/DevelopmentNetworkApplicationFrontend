import List from "../List/List.tsx";
import {IDevelopmentService} from "../../models/models.ts";
import DevelopmentItem from "../DevelopmentItem/DevelopmentItem.tsx";
import {Button} from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from "react";
import {getDevs} from "../../requests/GetDevs.ts";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.tsx";

const DevelopmentList = () => {
    const [searchText, setSearchText] = useState('')
    const [devs, setDevs] = useState<IDevelopmentService[]>([])

    useEffect(() => {
        fetchData()

    }, []);

    const fetchData = () => {
        getDevs(searchText)
            .then(data => {
                setDevs(data.development_services || [])
            })
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData()
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