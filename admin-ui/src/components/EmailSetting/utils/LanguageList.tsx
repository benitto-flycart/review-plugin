import React from "react";

const LanguageList = (props: any) => {

    const {setCurrentLocale, currentLocale, availableLanguages} = props;

    return (
        <div className={"frt-flex frt-flex-row frt-flex-wrap frt-bg-gray-50 frt-max-w-max"}>
            {availableLanguages.length > 1 && (
                availableLanguages.map((item: any, index: number) => {
                    return (<span
                        key={index}
                        className={`frt-p-2 frt-cursor-pointer ${item.value == currentLocale ? 'frt-bg-gray-300 frt-rounded' : 'hover:frt-bg-gray-200'}`}
                        onClick={() => {
                            setCurrentLocale(item.value)
                        }}
                    >{item.label}</span>)
                })
            )}
        </div>
    )
}

export default LanguageList;