import {FC} from 'react';
import {defaultImage, defaultTitle, IDevelopmentService} from "../../models/models.ts";
import './DevelopmentItem.css'
import {Link} from 'react-router-dom';

interface DevelopmentItemProps {
    dev: IDevelopmentService
}

const DevelopmentItem: FC<DevelopmentItemProps> = ({dev}) => {
    return (
        <div className="card">
            <div className="card__top">
                <Link to={'/courses/' + dev.uuid} className="card__image">
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
                <Link to={'/courses/' + dev.uuid} className="card__title">
                    {dev.Title || defaultTitle}
                </Link>
                <div className="card__buttons">
                    <Link className="link-card__add" to={'/courses/' + dev.uuid}>
                        <button className="card__add">Подробнее</button>
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default DevelopmentItem;