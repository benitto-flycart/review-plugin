// @ts-ignore
import React, {FC, useState} from "react";
import {HashRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppHeader from "./components/shared/AppHeader";
import Router from "./components/Router";
import "./main.css";
import {fetchLocalData} from "./components/api/methods";
import {toastrError} from "./helpers/ToastrHelper";
import {useLocalState} from "./components/zustand/localState";
import {Toaster} from "./components/ui/sonner";
import {LoadingSpinner} from "./components/ui/loader";

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
        <React.Fragment>
            {loading ? (
                <div className={"frt-grid frt-justify-center frt-items-center frt-h-[100vh]"}>
                    <LoadingSpinner/>
                </div>
            ) : (
                <React.Suspense fallback={<LoadingSpinner/>}>
                    <HashRouter>
                        <Toaster richColors expand={true}/>
                        <div className={"flycart-review-admin-ui"}>
                            <AppHeader/>
                            <NavBar/>
                        </div>
                        <Router/>
                    </HashRouter>
                </React.Suspense>
            )}
        </React.Fragment>
    );
};

export default App;


// Desktop: 1920×1080, 1366×768, 1280×1024, 1024×768
// Mobile: 375×667, 414×736, 360×800, 390×844
// Tablet: 768×1024, 1024×768, 601×962