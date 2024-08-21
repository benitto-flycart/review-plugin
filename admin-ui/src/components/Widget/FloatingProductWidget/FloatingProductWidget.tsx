import React, {useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import {useLocalState} from "../../zustand/localState";
import {Button} from "../../ui/button";
import FloatingProductWidgetContextAPI from "./FloatingProductWidgetContextAPI";
import FloatingProductWidgetDialog from "./FloatingProductWidgetDialog";

const FloatingProductWidget= () => {
    const [uiConfig, setUiConfig] = useState<boolean>(false)

    return (
        <div className="frt-w-3/4 frt-mx-auto frt-my-4">
            <div className={"frt-flex frt-justify-end"}>
                <Button type={"button"} className="frt-w-36" onClick={() => {
                    setUiConfig(true)
                }}>
                    <span>Config Widget</span>
                </Button>
            </div>
            {uiConfig ? (<FloatingProductWidgetContextAPI>
                <FloatingProductWidgetDialog show={uiConfig} toggle={setUiConfig}/>
            </FloatingProductWidgetContextAPI>) : null}
        </div>
    );

};

export default FloatingProductWidget;