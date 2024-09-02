import {useState} from 'react'
import {useLocalState} from "../../zustand/localState";


const useLocale = () => {
    const {localState} = useLocalState();

    const availableLanguages = localState.available_languages;

    const [locale, setLocale] = useState<any>(localState.current_locale);

    return [locale, setLocale, availableLanguages];
}


export default useLocale;