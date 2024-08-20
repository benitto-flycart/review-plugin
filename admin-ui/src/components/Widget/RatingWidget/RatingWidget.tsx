import React, {useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import {useLocalState} from "../../zustand/localState";
import {Button} from "../../ui/button";
import RatingWidgetContextAPI from "./RatingWidgetContextAPI";
import RatingWidgetDialog from "./RatingWidgetDialog";

const RatingWidget = () => {
    const [uiConfig, setUiConfig] = useState<boolean>(false)

    const {localState} = useLocalState();

    return (
        <div className="frt-w-3/4 frt-mx-auto frt-my-4">
            <div className={"frt-flex frt-justify-end"}>
                <Button type={"button"} className="frt-w-36" onClick={() => {
                    setUiConfig(true)
                }}>
                    <span>Config Widget</span>
                </Button>
            </div>
            {uiConfig ? (<RatingWidgetContextAPI>
                <RatingWidgetDialog show={uiConfig} toggle={setUiConfig}/>
            </RatingWidgetContextAPI>) : null}
        </div>
    );

};

export default RatingWidget;