let cloudinary = require('cloudinary');
import { fileUpload } from './fileUpload';

cloudinary.config({ 
  cloud_name: 'deymerh', 
  api_key: '325673957736673', 
  api_secret: 'rq6W5XzsZrwNl4g86YY7xTnxoNU',
  secure: true
});

describe('Pruebas en la funcion `fileUpload`', () => {
  jest.setTimeout(9000);
  test('Debe retornar la url de la imagen subida a cloudynary', async (done) => {
    const res = await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuMXJI6FO_B8cPWhXvQvpcOLtfriRoepN8FA&usqp=CAU');
    const blob = await res.blob();
    const icon = new File([blob], 'icon.jpg');
    const secure_url = await fileUpload(icon).then(e =>e.secure_url);
    expect(typeof secure_url).toBe('string') ;
    
    const segmets = secure_url.split('/');
    const idImage = segmets[segmets.length - 1].replace('.jpg', '');
    cloudinary.v2.api.delete_resources(idImage, {}, ()=>{
      done();
    });
  });

  test('Debe retornar null si no le mandamos un imagen a la funcion', async () => {
    const icon = new File([], 'icon.jpg');
    const secure_url = await fileUpload(icon).then(e =>e);
    expect(secure_url).toBe(null) ;
  });
  
});
