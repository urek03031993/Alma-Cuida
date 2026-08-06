import type { serviceCRUD, userCRUD } from "$lib/server/types/interfaces";

export interface ServiceFormProps {
    data: serviceCRUD;
    resetForm: () => void;
    errors: {
        name?: string[] | undefined;
        description?: string[] | undefined;
        active?: string[] | undefined;
        image?: string[] | undefined;
    } | undefined;
}


interface ModalityFormData {
    id?: number;
    name: string;
    description: string;
    serviceId?: number;
    basePrice: number;
    active: boolean;
}

export interface ModalityFormProps {
    services: {
        id: number;
        name: string;
        description: string | null;
        active: boolean;
        createdAt: Date | null;
        updatedAt: Date | null;
        imageUuid: number | null;
    }[];
    data: ModalityFormData;
    resetForm: () => void;
}

export interface UserFormProps {
    data: userCRUD;
    resetForm: () => void;
    errors: {
        name?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
    } | undefined;
}
