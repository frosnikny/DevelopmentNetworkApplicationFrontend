import { IDevelopmentService } from "../models/models.ts";
import { mockDevs } from "./MockData.ts";

export async function getDevByUUID(uuid: string): Promise<IDevelopmentService> {
    const apiUrl = `/api/devs/${uuid}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return MockByUUID(uuid) || Promise.reject('Development service not found');
    }
}

function MockByUUID(uuid: string): IDevelopmentService | undefined {
    return mockDevs.find(dev => dev.uuid === uuid);
}
