import React, {useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import {useLocalState} from "../../zustand/localState";
import {Button} from "../../ui/button";
import SnippetWidgetContextAPI from "./SnippetWidgetContextAPI";
import SnippetWidgetDialog from "./SnippetWidgetDialog";

const SnippetWidget = () => {
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
            {uiConfig ? (<SnippetWidgetContextAPI>
                <SnippetWidgetDialog show={uiConfig} toggle={setUiConfig}/>
            </SnippetWidgetContextAPI>) : null}
        </div>
    );
};

export default SnippetWidget;