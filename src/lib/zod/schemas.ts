import { z } from 'zod';


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];


export const imageFileSchemaZod = z
    .instanceof(File, { message: "Debe ser un archivo" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `El tamaño máximo es ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: `Tipo no soportado. Usa: ${ACCEPTED_IMAGE_TYPES.join(", ")}`,
});



export const serviceBaseSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    description: z.string().max(500, 'Máximo 500 caracteres'),    
    active: z.boolean().default(true)
});

export const serviceFormSchema = serviceBaseSchema.extend({
    image: imageFileSchemaZod,
});

export const serviceApiSchema = serviceBaseSchema.extend({
    imageUuid: z.coerce.number().int().positive(),   
});

export const serviceUpdateSchema = serviceBaseSchema.partial().extend({
    image: imageFileSchemaZod.optional(),
    id: z.coerce.number().int().positive('ID inválido')
});

export const serviceApiUpdateSchema = serviceBaseSchema.extend({
    id: z.coerce.number().int().positive('ID inválido'),
    imageUuid: z.coerce.number().int().positive()
});



export const imageApiSchema = z.object({
    uuid: z.string().min(1, 'El uuid es obligatorio').max(250, 'Máximo 250 caracteres'),
    name: z.string().min(1, 'El nombre es obligatorio').max(250, 'Máximo 250 caracteres'),
    url: z.string().min(1, 'La url es obligatoria').max(250, 'Máximo 250 caracteres'),
    alt: z.string().min(1, 'La descripcion corta es obligatoria').max(250, 'Máximo 250 caracteres'),
});



export const modalitySchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    description: z.string().max(500, 'Máximo 500 caracteres').optional().nullable(),
    serviceId: z.coerce.number().int().positive(),
    basePrice: z.coerce.number().min(0).default(0),
    active: z.boolean().default(true),
});

export const modalitUpdateSchema = modalitySchema.partial().extend({
    id: z.coerce.number().int().positive('ID inválido')
});



export const clientSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    lastName: z.string().min(1, 'El apellido es obligatorio').max(100, 'Máximo 100 caracteres'),
    email: z.email(),
    phone: z.string().max(20, 'Máximo 20 caracteres'),
    address: z.string().max(500, 'Máximo 500 caracteres'),
    IdDocument: z.string().max(20, 'Máximo 20 caracteres'),
    birthDate: z.date().min(new Date("1900-01-01"), { error: "Too old!" }),
    description: z.string().max(500, 'Máximo 500 caracteres').optional().nullable(),
    active: z.boolean().default(true),
});

export const clientUpdateSchema = clientSchema.partial().extend({
    id: z.coerce.number().int().positive('ID inválido')
});



export const workStatusSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    description: z.string().max(500, 'Máximo 500 caracteres').optional().nullable(),    
});

export const workStatusUpdateSchema = workStatusSchema.partial().extend({
    id: z.coerce.number().int().positive('ID inválido')
});



export const professionalSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    lastName: z.string().min(1, 'El apellido es obligatorio').max(100, 'Máximo 100 caracteres'),
    email: z.email(),
    phone: z.string().max(20, 'Máximo 20 caracteres'),
    address: z.string().max(500, 'Máximo 500 caracteres'),
    IdDocument: z.string().max(20, 'Máximo 20 caracteres'),
    driverLicense: z.string().max(20, 'Máximo 20 caracteres'),
    experience: z.int(),
    certifications: z.string().max(500, 'Máximo 500 caracteres'),
    status: z.coerce.number().int().positive(),
    description: z.string().max(500, 'Máximo 500 caracteres').optional().nullable(),
});

export const profesionalsUpdateSchema = professionalSchema.partial().extend({
    id: z.coerce.number().int().positive('ID inválido')
});



const serviceOrderStatusEnum = z.enum(["pending", "confirmed", "in_progress", "completed", "cancelled"]);

export const serviceOrderSchema = z.object({
    clientId: z.coerce.number().positive(),
    serviceId: z.coerce.number().positive(),
    profesionalId: z.coerce.number().positive(),
    startDate: z.date().min(new Date("1900-01-01"), { error: "Too old!" }),
    endDate: z.date().min(new Date("1900-01-01"), { error: "Too old!" }),
    initAddress: z.string().max(250, 'Máximo 250 caracteres'),
    endAddress: z.string().max(250, 'Máximo 250 caracteres'),
    status: serviceOrderStatusEnum.default("pending"),
    priceTotal: z.coerce.number().positive().default(0),
    observations: z.string().max(500, 'Máximo 500 caracteres'),
});

export const serviceOrderUpdateSchema = serviceOrderSchema.partial().extend({
    id: z.coerce.number().int().positive('ID inválido')
});



export const userSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
    email: z.email(),
    password: z.string().min(1, 'La contraseña corta es obligatoria').max(250, 'Máximo 250 caracteres'),
});






