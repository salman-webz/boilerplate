import { useState, useEffect } from "react";
import httpService from "../services/httpService";

const useImage = (pkgId, path) => {
  const [imgSrc, setImgSrc] = useState("");
  const [isImgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    let isLoaded = false;
    setImgLoaded(false);
    const getImage = async () => {
      try {
        const response = await httpService.get(path, {
          params: {
            pkg_id: pkgId
          },
          headers: {
            Authorization: "Bearer "+localStorage.token
          }
        });
        if (!isLoaded) {
          const src = `data:image/png;base64,${response.data.img_bytes}`;
          setImgSrc(src);
          setImgLoaded(true);
        }
      } catch (error) {
        if(error.response && error.response.status === 401){
          localStorage.setItem("automsg",true);
          window.location.pathname = '/logout';
        }
        if (!isLoaded) {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.img_bytes
          ) {
            const noImageSrc = `data:image/png;base64,${error.response.data.img_bytes}`;
            setImgSrc(noImageSrc);
          }
          setImgLoaded(true);
        }
      }
    };
    if (pkgId) {
      getImage();
    }
    return () => {
      isLoaded = true;
    };
  }, [pkgId, path]);

  return [imgSrc, !isImgLoaded];
};
export default useImage;
