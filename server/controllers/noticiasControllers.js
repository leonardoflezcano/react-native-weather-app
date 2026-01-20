import fs from 'fs';
const filePath = '../noticia.json'; // Ruta al archivo donde se guardarán los artículos

// POST - Guardar los artículos en un archivo
// export const addNew = async (req, res) => {
//     const articles = req.body; // Obtener el array de artículos del cuerpo de la solicitud

//     // Guardar el array en el archivo JSON, reemplazando el contenido anterior
//     fs.writeFile(filePath, JSON.stringify(articles, null, 2), (err) => {
//         if (err) {
//             console.error('Error al guardar los artículos:', err);
//             return res.status(500).json({ message: 'Error al guardar los artículos.' });
//         }
//         res.status(200).json({ message: 'Artículos guardados exitosamente.' });
//     });
// };

// GET - Obtener los artículos del archivo
export const getNew = async (req, res) => {
    // Leer el archivo JSON con los artículos
    const response = await fetch('http://localhost:5000/api/news');
    res.status(200).json(await response.json())
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error al leer el archivo de artículos:', err);
    //         return res.status(500).json({ message: 'Error al leer los artículos.' });
    //     }
    //     const articles = JSON.parse(data); // Convertir el contenido del archivo a un array de objetos
    //     res.status(200).json(articles); // Devolver el array de artículos
    // });
};

