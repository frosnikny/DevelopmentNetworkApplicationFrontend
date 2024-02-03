import {FC} from 'react';
import {defaultImage, defaultTitle, IDevelopmentService} from "../../../models/models.ts";
import './DevelopmentItem.css'
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {addDevIntoRequest, fetchDevs} from "../../../store/network/ActionCreatorDevs.ts";
import Cookies from "js-cookie";


interface DevelopmentItemProps {
    dev: IDevelopmentService
}

const DevelopmentItem: FC<DevelopmentItemProps> = ({dev}) => {
    const dispatch = useAppDispatch()
    const {searchValue} = useAppSelector(state => state.progressReducer)
    const role = Cookies.get('role')
    // const [basketID] = useAppSelector(state => state.devsReducer)
    const didTapAddIntoRequest = () => {
        dispatch(addDevIntoRequest(dev.uuid)).then(()=>{fetchData()})
    }

    const fetchData = () => {
        dispatch(fetchDevs(searchValue))
        // .then(() => {
        //     setDraft(basketID)
        // })
    }

    return (
        <div className="card">
            <div className="card__top">
                <Link to={'/devs/' + dev.uuid} className="card__image">
                    <img
                        src={dev.image_url ?? defaultImage}
                        alt="Фотография услуги"
                    />
                </Link>
            </div>
            <div className="card__bottom">
                <div className="card__prices">
                    <div className="card__price card__price--discount">От {dev.Price}</div>
                </div>
                <Link to={'/devs/' + dev.uuid} className="card__title">
                    {dev.Title || defaultTitle}
                </Link>
                <div className="card__buttons">
                    <Link className="link-card__add my-reset" to={'/devs/' + dev.uuid}>
                        <button className="card__add">Подробнее</button>
                    </Link>
                    { (role == "1" || role == "2") && (
                    <button className="card__add" onClick={didTapAddIntoRequest}>Добавить в заказ</button>
                    )}
                </div>
            </div>
        </div>
    );

};

export default DevelopmentItem;