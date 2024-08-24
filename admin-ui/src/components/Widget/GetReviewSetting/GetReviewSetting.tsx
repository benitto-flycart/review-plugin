import React, {useState} from "react";
import {Input} from "../../ui/input";
import {Card} from "../../ui/card";
import {useLocalState} from "../../zustand/localState";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ClipLoader} from "react-spinners";
import {Button} from "../../ui/button";
import ProductWidget from "../ProductReviewWidget/ProductWidget";
import ProductWidgetContextAPI from "../ProductReviewWidget/ProductReviewContextAPI";
import {Label} from "../../ui/label";

const GetReviewSetting = () => {

    const [updating, setUpdating] = useState<boolean>(false)
    const [uiConfig, setUiConfig] = useState<boolean>(false)

    const {localState} = useLocalState();

    const defaultValues: any = {
        language: localState.current_locale,
        subject: "Order #{order_number}, how did it go?",
        body: "Order #{order_number}, how did it go?",
        button_text: 'Write a Review',
    };

    const available_languages = localState.available_languages;

    const schema = yup.object().shape({
        language: yup.string().required("Language is required"),
        subject: yup.string().required("Subject is required"),
        body: yup.string().required("Body is required"),
        button_text: yup.string().required("Button Text is required"),
    });

    const form = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const values = form.watch();

    return (
        <div className="frt-flex frt-flex-col frt-gap-y-4">
            <div className={"frt-flex frt-justify-between frt-items-center"}>
                <h3 className={"frt-text-2xl"}>Product Reviews widget</h3>
                <Button type={"button"} className="frt-w-36" onClick={() => {
                    setUiConfig(true)
                }}>
                    <span>Customize UI</span>
                </Button>
            </div>
            <Card className={"frt-m-4 frt-p-4"}>
                <h4 className="frt-font-bold frt-text-base">Content</h4>
                <div>
                    <div className="frt-flex frt-flex-col frt-gap-y-4">
                        <div
                            className="frt-grid frt-gap-3">
                            <Label>Review</Label>
                            <Input type={"text"}
                                   placeholder={"Review(s)"}></Input>
                        </div>

                        <div
                            className="frt-grid frt-gap-3">
                            <Label>Write a Review Button Title</Label>
                            <Input type={"text"}
                                   placeholder={"Write a Review"}></Input>
                        </div>

                        <div
                            className="frt-grid frt-gap-3">
                            <Label>No Reviews Title</Label>

                            <Input type={"text"}
                                   placeholder={"Be the first to"}></Input>
                        </div>

                        <div
                            className="frt-grid frt-gap-3">
                            <Label>Show More Reviews Title</Label>
                            <Input type={"text"}
                                   placeholder={"Show More Reviews Title"}></Input>
                        </div>

                        <div
                            className="frt-grid frt-gap-3">
                            <Label>Link To Product Page Button Title</Label>
                            <Input type={"text"}
                                   placeholder={"View Product"}></Input>
                        </div>

                        <Button type={"submit"} className="frt-w-36">
                            {updating ? (<span className="frt-mx-2">
                                            <ClipLoader color="white" size={"20px"}/></span>) : null}
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </div>
            </Card>

            {
                uiConfig ? (<ProductWidgetContextAPI>
                    <ProductWidget show={uiConfig} toggle={setUiConfig}/>
                </ProductWidgetContextAPI>) : null
            }

        </div>
    )
}

export default GetReviewSetting;