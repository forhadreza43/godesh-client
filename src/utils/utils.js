import axios from "axios";

export const getImageUrl = async(imageData) => {
    const imageFormData = new FormData();
  imageFormData.append("image", imageData);

  const {data} = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFormData
  );

  return data.data.url;
}

export const saveUserInfo = async(userInfo) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/users`,
      userInfo,
    );
    return res;
}

