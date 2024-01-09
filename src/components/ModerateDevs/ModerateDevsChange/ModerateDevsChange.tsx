import {ChangeEvent, FC, useEffect, useState} from "react";
import {defaultImage, defaultTitle, IDevelopmentService} from "../../../models/models.ts";
import {useParams} from "react-router-dom";
import './ModerateDevsChange.css'
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {deleteDev, getDevByUUID, updateDev} from "../../../store/network/ActionCreatorDevs.ts";

const ModerateDevsChange: FC = () => {
    const dispatch = useAppDispatch()
    const {dev_id} = useParams()
    const {dev} = useAppSelector(state => state.devsReducer)

    const [title, setTitle] = useState(dev?.Title);
    const [price, setPrice] = useState(dev?.Price);
    const [description, setDescription] = useState(dev?.Description);
    const [technology, setTechnology] = useState(dev?.Description);
    const [detailedPrice, setDetailedPrice] = useState(dev?.DetailedPrice);
    const [image, setImage] = useState<File | undefined>(undefined);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0];
        // You can now do whatever you want with the file
        setImage(file);
    };

    useEffect(() => {
        if (!dev_id) {
            return
        }
        dispatch(getDevByUUID(dev_id))
    }, []);

    useEffect(() => {
        if (dev) {
            setTitle(dev.Title);
            setPrice(dev.Price);
            setDescription(dev.Description);
            setDetailedPrice(dev.DetailedPrice);
            setTechnology(dev.Technology)
        }
    }, [dev]);




    // useEffect(() => {
    //     if (dev_id) {
    //         dispatch(getDevByUUID(dev_id))
    //     }
    // }, [dev_id]);

    const handleSave = () => {
        const updatedDev: IDevelopmentService = {
            RecordStatus: dev?.RecordStatus || 2,
            Technology: technology || "",
            uuid: dev?.uuid || "",
            Title: title || "",
            Price: price || 0,
            Description: description || "",
            DetailedPrice: detailedPrice || 0 };
        dispatch(updateDev(updatedDev, image));
        // console.log(updatedDev)
    };

    const handleDelete = () => {
        dispatch(deleteDev(dev?.uuid || ""));
        // console.log(updatedDev)
    };

    return (
        <>
            <Breadcrumbs paths={[
                {name: 'Управление видами разработки', path: '/moderate-devs'},
                {name: `${dev?.Title || defaultTitle}`, path: `${dev_id}`}
            ]}/>

            <div className="card-details">
                <div className="card-details__image">
                    <img src={dev?.image_url ?? defaultImage} alt="Фотография услуги"/>
                </div>
                <div className="card-details__info">
                    <h2 className="card-details__title mb-3">
                        <p><b>Название:</b></p>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </h2>
                    <p className="card-details__price">
                        <p><b>Начальная цена:</b></p>
                        <input type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/>
                    </p>
                    <div className="card-details__description">
                        <p><b>Описание:</b></p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="card-details__price mb-4">
                        <p><b>За день работы:</b></p>
                        <input type="text" value={detailedPrice}
                               onChange={(e) => setDetailedPrice(parseInt(e.target.value))}/>
                    </div>
                    <h2 className="card-details__description mb-3">
                        <p><b>Технологии:</b></p>
                        <input type="text" value={technology} onChange={(e) => setTechnology(e.target.value)}/>
                    </h2>
                    <div className="card-details__description">
                        <p><b>Изображение:</b></p>
                        <div className="card-details__top">
                            <input type="file" onChange={handleImageChange}/>
                        </div>
                    </div>

                    <button className='btn btn-success mb-3' onClick={handleSave}>Сохранить</button>
                    <button className='btn btn-danger' onClick={handleDelete}>Удалить</button>
                    {/*<button>Сохранить</button>*/}
                </div>
            </div>
        </>
    );
};

export default ModerateDevsChange;