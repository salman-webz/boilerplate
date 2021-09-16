import { useState, useEffect } from "react";
import httpService from "../services/httpService";
import config from '../config';
const { server: { REGEX } } = config;

const useSearch = (input, apiEndpoint, setShowLoader) => {
  const [items, setItems] = useState([]);
  const [term, setTerm] = useState(input);
  const [debouncedTerm, setDebouncedTerm] = useState(input);

  const config = {
    [REGEX.UserSearch]: {
      paramKey: "user_search_term",
      response: "users"
    },
    [REGEX.TagSearch]: {
      paramKey: "tag_search_term",
      response: "tags"
    }
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (term) {
        setDebouncedTerm(term);
      }
    }, 300);

    return () => {
      clearInterval(timeoutID);
    };
  }, [term]);

  useEffect(() => {
    setShowLoader(true);
    const search = async debouncedTerm => {
      try{
        const { data } = await httpService.get(`${apiEndpoint}`, {
          headers: {
            Authorization: "Bearer "+localStorage.token
          },
          params: {
            [config[apiEndpoint].paramKey]: debouncedTerm
          }
        });
        setShowLoader(false);
        setItems(data[config[apiEndpoint].response] || []);
      }
      catch(error){
        if(error.response && error.response.status === 401){
          localStorage.setItem("automsg",true);
          window.location.pathname = '/logout';
        }
      } 
    };
    if (debouncedTerm) {
      search(debouncedTerm);
    }
  }, [debouncedTerm, apiEndpoint]);
  return [items, setTerm];
};

export default useSearch;
