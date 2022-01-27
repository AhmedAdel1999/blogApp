import axios from "axios";
export const imageUpload =async (image) => {
    let img;
        const fd = new FormData();
        fd.append('file',image)
        fd.append("upload_preset","ggimages")
        fd.append("api_key", "372336693865194")
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        let data = await axios.post("https://api.cloudinary.com/v1_1/dibuevfps/image/upload",fd,config)
        img=data.data.url;
    return img;
}