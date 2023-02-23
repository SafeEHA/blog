import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    localStorage.removeItem("currentImage")
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dzbq6rpwy",
        uploadPreset: "mic0x4ha",
      },
      function (error, result) {
        console.log(result);
        if ("event" in result && result.event === "success"){
            console.log("Uploaded Image Successfully******************************")
            localStorage.setItem("currentImage", result.info.url)
            alert("Uploaded Image Successfully")
        } 
      }
    );
  }, []);
  return ( <button type="button" style={{background: '#fff' , color: "grey"}} onClick={() => widgetRef.current.open()}>Upload</button> );
};
export default UploadWidget;
