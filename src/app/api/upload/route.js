import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({ 
    cloud_name: 'dyouk0puj', 
    api_key: '989629772289124', 
    api_secret: 'AHO_8ChUbZV1n7s1WMMyeIiol7c'
});

export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
        return NextResponse.json({ message: "Error: No se ha seleccionado ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'video' },  // Importante: 'video' también se usa para archivos de audio
            (error, result) => {
                if (error) {
                    console.error('Error al subir:', error);
                    return reject(NextResponse.json({ message: "Error al subir a Cloudinary" }, { status: 500 }));
                }

                console.log('Subida exitosa:', result);
                resolve(NextResponse.json({ message: "Archivo subido con éxito", url: result.secure_url }, { status: 200 }));
            }
        );

        uploadStream.end(buffer);
    });
}
