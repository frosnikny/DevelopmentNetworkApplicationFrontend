import {Link} from 'react-router-dom';
import {FC} from "react";
import './Breadcrumbs.css'

interface BreadcrumbsProps {
    paths: Breadcrumb[]
}

interface Breadcrumb {
    name: string
    path: string
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({paths}) => {

    return (
        <ul className="breadcrumbs">
            {paths.map((path, index) => (
                <li key={index} className="breadcrumb-item" id={'path-name'}>
                    {index === paths.length - 1 ? (
                        path.name
                    ) : (
                        <Link to={path.path}>{path.name}</Link>
                    )}
                    {index !== paths.length - 1 && <span> </span>}
                </li>
            ))}
        </ul>
    );
};

export default Breadcrumbs;
