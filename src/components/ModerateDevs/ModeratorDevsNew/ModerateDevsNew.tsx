import {ChangeEvent, FC, useState} from "react";
import {defaultImage, IDevelopmentService} from "../../../models/models.ts";
import '../ModerateDevsChange/ModerateDevsChange.css'
import Breadcrumbs from "../../Helpers/Breadcrumbs/Breadcrumbs.tsx";
import {useAppDispatch} from "../../../hooks/redux.ts";
import {createDev} from "../../../store/network/ActionCreatorDevs.ts";

const ModerateDevsNew: FC = () => {
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string>("");
    const [technology, setTechnology] = useState<string>("");
    const [detailedPrice, setDetailedPrice] = useState<number | undefined>(undefined);
    const [image, setImage] = useState<File | undefined>(undefined);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0];
        // You can now do whatever you want with the file
        setImage(file);
    };




    // useEffect(() => {
    //     if (dev_id) {
    //         dispatch(getDevByUUID(dev_id))
    //     }
    // }, [dev_id]);

    const handleSave = () => {
        const updatedDev: IDevelopmentService = {
            RecordStatus: 0,
            Technology: technology || "",
            uuid: "",
            Title: title || "",
            Price: price || 0,
            Description: description || "",
            DetailedPrice: detailedPrice || 0,
            ServiceRequest: null
        };
        dispatch(createDev(updatedDev, image));
        // console.log(updatedDev)
    };

    return (
        <>
            <Breadcrumbs paths={[
                {name: 'Управление видами разработки', path: '/moderate-devs'},
                {name: `Добавление вида разработки`, path: `new`}
            ]}/>

            <div className="card-details">
                <div className="card-details__image">
                    <img src={defaultImage} alt="Фотография услуги"/>
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

                    <button className='btn btn-success' onClick={handleSave}>Добавить</button>
                    {/*<button>Сохранить</button>*/}
                </div>
            </div>
        </>
    );
};

export default ModerateDevsNew;