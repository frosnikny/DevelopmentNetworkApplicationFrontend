import {FC, useEffect} from "react";
import {defaultImage, defaultTitle} from "../../../models/models.ts";
import {useParams} from "react-router-dom";
import './DevelopmentDetail.css'
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {getDevByUUID} from "../../../store/network/ActionCreatorDevs.ts";

const DevelopmentDetail: FC = () => {
    const dispatch = useAppDispatch()
    const {dev_id} = useParams()
    const {dev} = useAppSelector(state => state.devsReducer)

    useEffect(() => {
        if (!dev_id) {
            return
        }
        dispatch(getDevByUUID(dev_id))
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
                        <p><b>Детальная стоимость:</b></p>
                        <pre>{dev?.DetailedPrice}</pre>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DevelopmentDetail;