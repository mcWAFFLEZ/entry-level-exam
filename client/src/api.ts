import axios from 'axios';
import { APIRootPath } from '@fed-exam/config';

export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

export type APIData = {
    results?: Ticket[]
    next?: {
        page?: number,
        limit?: number
    }
    previous?: {
        page?: number,
        limit?: number
    }
    pageUpperBound: number,
}

export type ApiClient = {
    getTickets: () => Promise<Ticket[]>;
    search: (value: string, page: number) => Promise<APIData>;
}

export const createApiClient = (): ApiClient => {

    return {
        getTickets: () => {
            return axios.get(APIRootPath).then((res) => res.data);
        },
        search: (value, page) => {
            return axios.get(APIRootPath, { params: { search: value, page: page } }).then((res) => res.data);
        }
    }

}