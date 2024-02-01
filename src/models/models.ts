export interface IDevelopmentService {
    uuid: string,
    Title: string,
    Description: string,
    image_url?: string,
    Price: number,
    RecordStatus: number,
    Technology: string,
    DetailedPrice: number
    ServiceRequest: IServiceRequest | null;
}

export interface IDraftCustomerRequest {
    uuid: string,
    development_services_count: number
}

export interface IServiceRequest {
    WorkScope: string,
}

export interface ICustomerRequest {
    uuid: string;
    record_status: number;
    creation_date: string;
    formation_date: string;
    completion_date: string;
    work_specification: string;
    creator: string;
    moderator: string;
    development_services: IDevelopmentService[];
    payment_status: string;
}

export const defaultImage = "https://sun9-60.userapi.com/impg/wmXEZI7Eyl8Um7jk84p8cFiln4U_-2-pYVcShQ/mRm_FMBfKF4.jpg?size=960x960&quality=95&sign=30bb4be01d374326a53193b0ecb0ece4&c_uniq_tag=xh1tLkj9XsxBehP8MsX7A_MkR-BjFIympOlkJsh983s&type=album"
export const defaultTitle = "Название не задано"
