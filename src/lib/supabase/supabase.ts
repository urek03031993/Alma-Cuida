import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import { buildImageName, buildSlug } from '$lib/utils/utils';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);


export type supabaseUploadImage = { 
    success: boolean, 
    file_name: string, 
    url: string, 
    short_description: string
}

export async function uploadFileToSupabaseStorage(fileName: string, buffer: ArrayBuffer, contentType: string, storageName: string) {
    const { data, error } = await supabase.storage.from(storageName).upload(fileName, buffer, {contentType: contentType});
    
    return { data, error }
}

export function getPublicUrlSupabase(fileName: string, storageName: string) {
    const { data: urlData } = supabase.storage.from(storageName).getPublicUrl(fileName);

    return urlData;
}



export async function uploadImage(imageFile: File, name: string, description: string): Promise<supabaseUploadImage> {
    const uploadedImage: supabaseUploadImage = { 
        success: false, 
        file_name: '', 
        url: '', 
        short_description: ''
    };

    if(!imageFile) return uploadedImage;    

    const buffer = await imageFile.arrayBuffer();
    const fileName = buildImageName(imageFile.name);

    const { data, error } = await uploadFileToSupabaseStorage(fileName, buffer, imageFile.type, 'AlmaCuida');

    if (error || !data) return uploadedImage;

    return {
        success: true,
        file_name: fileName,
        url: getPublicUrlSupabase(fileName, 'AlmaCuida').publicUrl ?? imageFile.name,
        short_description: buildSlug(name, description)
    };
}


export async function uploadImages(files: File[], name: string, description: string): Promise<supabaseUploadImage[]> {
    const uploadedImages: supabaseUploadImage[] = [];

    if(files.length === 0) return uploadedImages;    

    for (const file of files) {
        const buffer = await file.arrayBuffer();
        const fileName = buildImageName(file.name);

        const { data, error } = await uploadFileToSupabaseStorage(fileName, buffer, file.type, 'AlmaCuida');

        if (error || !data) continue;

        uploadedImages.push({
            success: true,
            file_name: fileName,
            url: getPublicUrlSupabase(fileName, 'AlmaCuida').publicUrl ?? file.name,
            short_description: buildSlug(name, description)
        });
    }

    return uploadedImages;
}

export async function deleteImageFromSupabaseStorage(fileName: string, storageName: string): Promise<boolean> {
    const { data, error } = await supabase.storage.from(storageName).remove([fileName]);

    if (error || !data) {
        console.error('Error deleting image from Supabase Storage:', error);
        return false;
    }

    return true;
}

    

    