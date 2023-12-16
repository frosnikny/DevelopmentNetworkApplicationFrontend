import {IDevelopmentService} from "../models/models.ts";
import {mockDevs} from "./MockData.ts";

export interface IDevelopmentServiceResponse {
    development_services: IDevelopmentService[]
}

export async function getDevs(filter?: string): Promise<IDevelopmentServiceResponse> {
    const apiUrl = `/api/devs?name=${filter ?? ""}`;

    return fetch(apiUrl)
        .then(response => {
            if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
                // throw new Error('Network response was not ok');
                console.log('Bad server response or GitHub')
                return {development_services: filterMock(filter)}
            }

            return response.json() as Promise<IDevelopmentServiceResponse>
        })
        .catch(_ => {
            return {development_services: filterMock(filter)}
        })
}

export function filterMock(searchValue?: string): IDevelopmentService[] {
    if (searchValue) {
        return mockDevs.filter(dev =>
            dev.Title?.toLowerCase().includes((searchValue ?? '').toLowerCase())
            || `${dev.Price ?? ''}`.includes((searchValue ?? '').toLowerCase())
        );
    }
    return mockDevs
}
