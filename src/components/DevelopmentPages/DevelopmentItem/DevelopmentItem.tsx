import {FC} from 'react';
import {defaultImage, defaultTitle, IDevelopmentService} from "../../../models/models.ts";
import './DevelopmentItem.css'
import {Link} from 'react-router-dom';
import {useAppDispatch} from "../../../hooks/redux.ts";
import {addDevIntoRequest} from "../../../store/network/ActionCreatorDevs.ts";

interface DevelopmentItemProps {
    dev: IDevelopmentService
    setIsSearching: (value: boolean) => void;
}

const DevelopmentItem: FC<DevelopmentItemProps> = ({dev, setIsSearching}) => {
    const dispatch = useAppDispatch()
    const didTapAddIntoRequest = () => {
        dispatch(addDevIntoRequest(dev.uuid))
        .then(() => {
            setIsSearching(false); // Устанавливаем значение в false после завершения операции
        });
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
                    <Link className="link-card__add" to={'/devs/' + dev.uuid}>
                        <button className="card__add">Подробнее</button>
                    </Link>
                    <button className="card__add" onClick={didTapAddIntoRequest}>Добавить в заказ</button>
                </div>
            </div>
        </div>
    );

};

export default DevelopmentItem;