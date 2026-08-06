import type{ InferSelectModel } from "drizzle-orm"
import type { service, modalitie, client, image, user } from "../db/schema"


export type selectService = InferSelectModel<typeof service>
export type selectImage = InferSelectModel<typeof image>
export type selectModality = InferSelectModel<typeof modalitie>
export type selectClient = InferSelectModel<typeof client>
export type selectUser = InferSelectModel<typeof user>


export interface loadService {
    id: number;
    name: string;
    description: string;
    imageUuid: number;
    main: boolean;
    active: boolean;
    image: {
        id: number;
        name: string;
        url: string;
        uuid: string;
        alt: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }
    createdAt: Date;
    updatedAt: Date;
}


export interface loadFullService {
    id: number;
    name: string;
    description: string;
    imageUuid: number;
    main: boolean;
    active: boolean;
    image: {
        id: number;
        name: string;
        url: string;
        uuid: string;
        alt: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }
    modalities: selectModality[];
    createdAt: Date;
    updatedAt: Date;
}


export interface serviceCRUD {
    id?: number;
    name?: string;
    description?: string;
    imageUuid?: number;
    main?: boolean;
    active?: boolean;
    image?: {
        id: number;
        name: string;
        url: string;
        uuid: string;
        alt: string;
    }
}

export interface loadServices {
    success: boolean;
    data: loadService[];
}


export interface userCRUD {
    id?: string,
    name?: string,
    email?: string,
}

export interface loadUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface loadUsers {
    success: boolean;
    data: loadUser[];
}