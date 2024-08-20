// @ts-ignore
import React, {FC, useState} from "react";
import {HashRouter} from "react-router-dom";
import {BarLoader, ClipLoader} from "react-spinners";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import AppHeader from "./components/shared/AppHeader";
import Router from "./components/Router";
import "./main.css";
import {fetchLocalData} from "./helpers/methods";
import {toastrError} from "./helpers/ToastrHelper";
import {useLocalState} from "./components/zustand/localState";

const App: FC = (props) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const {setLocalState} = useLocalState();

    // @ts-ignore
    const windowLocation = window.location;
    const isActivePath = (path: string) => {
        return windowLocation.hash.includes(path);
    };

    const getLocalData = async () => {
        try {
            const response = await fetchLocalData()
                .then((response) => {
                    setLocalState(response.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            toastrError("Server Error Occurred");
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getLocalData();
    }, []);

    // @ts-ignore
    return (
        <div>
            {loading ? (
                <div className={"frt-grid frt-justify-center frt-items-center frt-h-[100vh]"}>
                    <ClipLoader
                        color="black"
                        size={"20px"}
                    />
                </div>
            ) : (
                <React.Suspense fallback={<ClipLoader/>}>
                    <HashRouter>
                        <ToastContainer/>
                        <div className={"flycart-review-admin-ui"}>
                            <AppHeader/>
                            <NavBar/>
                        </div>
                        <Router/>
                    </HashRouter>
                </React.Suspense>
            )}
        </div>
    );
};

export default App;


// Desktop: 1920×1080, 1366×768, 1280×1024, 1024×768
// Mobile: 375×667, 414×736, 360×800, 390×844
// Tablet: 768×1024, 1024×768, 601×962