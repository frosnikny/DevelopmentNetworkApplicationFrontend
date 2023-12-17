import {FC, useEffect, useState} from "react";
import {defaultImage, defaultTitle, IDevelopmentService} from "../../models/models.ts";
import {useParams} from "react-router-dom";
import './DevelopmentDetail.css'
import {getDevByUUID} from "../../requests/GetDevByUUID.ts";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.tsx";

const DevelopmentDetail: FC = () => {
    const {dev_id} = useParams()
    const [dev, setDev] = useState<IDevelopmentService | null>(null);

    useEffect(() => {
        if (!dev_id) {
            return
        }
        getDevByUUID(dev_id)
            .then(response => {
                setDev(response)
            })
    }, []);

    return (
        <>
            <Breadcrumbs paths={[
                {name: 'Главная', path: '/'},
                {name: `${dev?.Title || defaultTitle}`, path: `${dev_id}`}
            ]}/>

            <div className="card-details">
                <div className="card-details__image">
                    <img src={dev?.image_url ?? defaultImage} alt="Фотография услуги"/>
                </div>
                <div className="card-details__info">
                    <div className="card-details__top">
                        <h2 className="card-details__title">{dev?.Title}</h2>
                        <p className="card-details__price">от {dev?.Price}</p>
                    </div>
                    <hr/>
                    <p className="card-details__description">{dev?.Description}</p>
                    <div className="card-details__cost">
                        <p><b>Цена за один день работы:</b> {dev?.DetailedPrice}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DevelopmentDetail;