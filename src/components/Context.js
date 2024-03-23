import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

let API = "http://www.vallabhpith.com/getfolder.php";

const initialState = {
    isLoading: true,
    names: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchApiData = async (url) => {

        dispatch({ type: "SET_LOADING" });
        try {
            await fetch(url, {
                mode: 'no-cors',
                method: 'GET'
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            // const data = await res.json();
            // console.log(data);
            // dispatch({
            //     type: "GET Stories",
            //     payload: {
            //         names: data.names,
            //     }
            // });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApiData(`${API}`);
    }, []);

    return (
        <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
    )
};

//custom hook
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
