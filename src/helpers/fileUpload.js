export const fileUpload = async (image)=>{
  const cloudinaryUrl = '	https://api.cloudinary.com/v1_1/deymerh/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'journal-app');
  formData.append('file', image);
  try {
    const res = await fetch(cloudinaryUrl, {
      method:'POST',
      body: formData
    });
    if (res.ok) {
      return await res.json();
    }else{
      return res.json();
    }
  } catch (error) {
    throw new Error('Error!')
  }
};