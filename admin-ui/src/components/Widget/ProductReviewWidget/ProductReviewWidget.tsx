import React, {useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useLocalState} from "../../zustand/localState";
import GetReviewSetting from "../GetReviewSetting";

const ProductReviewWidget = () => {

    const [updating, setUpdating] = useState<boolean>(false)

    const {localState} = useLocalState();

    const defaultValues: any = {
        is_active: true,
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
        <div className="frt-w-3/4 frt-mx-auto frt-my-4">
            <GetReviewSetting/>
        </div>
    )
};

export default ProductReviewWidget;