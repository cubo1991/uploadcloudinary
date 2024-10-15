"use client"
import { useState } from 'react';

function HomePage() {
  const [file, setFile] = useState(null);

  return (  
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault();

        // Verificar si se ha seleccionado un archivo
        if (!file) {
          console.log('No file selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          // Verificar si la respuesta tiene cuerpo
          if (!response.ok) {
            console.log('Error en la respuesta del servidor');
            return;
          }

          // Asegurarse de que haya contenido para convertir a JSON
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log(data);
          } else {
            console.log("La respuesta no es JSON");
          }

        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }}>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default HomePage;
