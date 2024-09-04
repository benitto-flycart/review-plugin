import React, {useEffect, useState} from "react";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent,} from "@/src/components/ui/card";
import "@/src/main.css";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {Switch} from "../../ui/switch";
import {Popover, PopoverContent, PopoverTrigger} from "../../ui/popover";
import {axiosClient} from "../../../helpers/axios";
import {toastrError, toastrSuccess} from "../../../helpers/ToastrHelper";
import {useLocalState} from "../../zustand/localState";
import {LoadingSpinner} from "../../ui/loader";
import {Label} from "../../ui/label";
import SettingsRowWrapper from "../SettingsRowWrapper";
import SettingsColWrapper from "../SettingsColWrapper";
import PopOverColorPicker from "../../custom-hooks/PopOverColorPicker";
import InputFontSize from "../../Widget/utils/InputFontSize";
import {produce} from "immer";
import * as yup from 'yup'
import {showValidationError} from "../../../helpers/html";
import {runUploader} from "../../../helpers/utils";
import ReviewIcon from "../../ReviewIcon";
import {reviewIcons} from "../../../helpers/icons";
import {ClientResponse} from "../../../helpers/response";

const BrandingSetting = () => {
    const [loading, setLoading] = useState(true);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState} = useLocalState();
    const [errors, setErrors] = useState<any>()
    const [settingsState, setSettingsState] = useState<any>({
        corner_radius: 'rounded',
        enable_logo: true,
        logo_url: '',
        rating_icon: 'gem',
        rating_icon_style: 'rounded',
        enable_review_branding: true,
        enable_email_banners: false,
        banner_src: '',
        rating_rgb_color: '#ff224f',
        appearance: 'default',
        appearance_options: {
            email_background_color: '#fffff',
            content_background_color: '#fffff',
            email_text_color: '#fffff',
            button_bg_color: '#fffff',
            button_border_color: '#fffff',
            button_title_color: '#fffff',
            font_type: 'arial',
            font_size: 10,
        },
    });

    const updateSettingFields = (cb: any) => {
        const newState = produce(settingsState, (draft: any) => {
            cb(draft)
        })
        setSettingsState(newState)
    }

    const schema = yup.object().shape({
        enable_logo: yup.boolean().required("Enable logo is required"),
        logo: yup.string().optional(),
        corner_radius: yup.string().required("Corner Radius is required"),
        rating_icon_style: yup.string().required("Rating Icon Style is required"),
        rating_rgb_color: yup.string().required("Rating color is required"),
        enable_review_branding: yup.boolean().required("Enable Review Branding is required"),
        enable_email_banners: yup.boolean().required("Enable email Banners is required"),
        banner_src: yup.string().optional(),
        appearance: yup.string().required("Appearance is required"),
        appearance_options: yup.object().shape({
            email_background_color: yup.string().required('Email Background color is required'),
            content_background_color: yup.string().required("Content Background color is required"),
            email_text_color: yup.string().required("Email text color is required"),
            button_bg_color: yup.string().required("Button Background color is required"),
            button_border_color: yup.string().required("Button Border color is required"),
            button_title_color: yup.string().required("Button title color is required"),
            font_type: yup.string().required("Font type is required"),
            font_size: yup.number()
                .min(5, 'Minimum it should be 5')
                .max(50, 'Maximum it should be 50')
                .required("Font size is required"),
        })
    });


    const getBrandSettings = () => {
        axiosClient.post('', {
            method: 'get_brand_settings',
            _wp_nonce_key: 'flycart_review_nonce',
            _wp_nonce: localState?.nonces?.flycart_review_nonce,
        }).then((response: any) => {
            let data = response.data.data
            let settings = data.settings;
            settings.rating_icon = 'gem';
            console.log(settings)
            setSettingsState(settings)
            toastrSuccess(data.message);
        }).catch((error: any) => {
            toastrError('Server Error Occurred');
        }).finally(() => {
            setLoading(false)
        });
    };

    const saveBrandSettings = () => {
        setSaveChangesLoading(true)
        schema.validate(settingsState, {abortEarly: false}).then(() => {
            axiosClient.post('', {
                method: 'save_brand_settings',
                _wp_nonce_key: 'flycart_review_nonce',
                _wp_nonce: localState?.nonces?.flycart_review_nonce,
                ...settingsState
            }).then((response: any) => {
                let [code, data] = ClientResponse.getResponseData(response)
                console.log(data)
                toastrSuccess(data?.message);
                setErrors({})
            }).catch((error: any) => {
                let [code, errors] = ClientResponse.getResponseError(error)
                if (ClientResponse.isValidationError(code)) {
                    setErrors(errors)
                    toastrError('Validation Error Occurred');
                    return;
                }
                toastrError('Server Error Occurred');
            }).finally(() => {
                setSaveChangesLoading(false)
            });
        }).catch((validationError: any) => {
            setSaveChangesLoading(false)
            toastrError('Validation Failed')
            const validationErrors = {}
            validationError?.inner?.forEach((e: any) => {
                // @ts-ignore
                validationErrors[e.path] = [e.message]
            });
            setErrors(validationErrors)
        })

    };
    console.log(errors)
    useEffect(() => {
        setLoading(true);
        getBrandSettings();
    }, []);

    return (
        <Card>
            <CardContent className=" frt-grid !frt-p-2">
                {loading ? (
                    <div className={"frt-grid frt-justify-center frt-items-center frt-h-[60vh]"}><LoadingSpinner/></div>
                ) : (
                    <div className={"frt-flex frt-flex-col frt-gap-8 frt-p-6"}>
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Enable Logo</Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want to
                                    auto-publish, Any changes will only affect new
                                    reviews</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Switch id="enable-logo"
                                        defaultChecked={settingsState.enable_logo}
                                        onCheckedChange={(value: any) => {
                                            updateSettingFields((draftState: any) => {
                                                draftState.enable_logo = value;
                                            })
                                        }}
                                />
                                {showValidationError(errors, "enable_logo")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        {
                            settingsState.enable_logo ? <SettingsRowWrapper>
                                <SettingsColWrapper>
                                    <Label className="frt-w-full">Logo</Label>
                                    <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want
                                        to
                                        auto-publish, Any changes will only affect new
                                        reviews</Label>
                                </SettingsColWrapper>
                                <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                    <div className="frt-w-full frt-flex frt-gap-3">
                                        {
                                            settingsState.logo_url ? <div className={"frt-w-24 frt-relative"}>
                                                <img src={settingsState.logo_url} alt="logo"/>
                                                <span>
                                                </span>
                                                <i onClick={() => {
                                                    updateSettingFields((draftState: any) => {
                                                        draftState.logo_url = ""
                                                    })
                                                }}
                                                   className={"review review-cross-icon frt-cursor-pointer review review-Heart frt-absolute frt-top-0 frt-right-0"}></i>
                                            </div> : null
                                        }
                                        <div
                                            className="frt-border frt-border-dashed frt-w-full frt-p-4 frt-grid frt-justify-center frt-items-center">
                                            <span
                                                className="frt-bg-amber-500 frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                                                onClick={(e => {
                                                    runUploader(e, (data: any) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.logo_url = data
                                                        })
                                                    })
                                                })}>Upload File</span>
                                        </div>
                                    </div>
                                    {showValidationError(errors, "logo_url")}
                                </SettingsColWrapper>
                            </SettingsRowWrapper> : null
                        }

                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label className="frt-w-full">Corner Radius</Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want to
                                    auto-publish, Any changes will only affect new
                                    reviews</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Select value={settingsState.corner_radius}
                                        onValueChange={(value: string) => {
                                            updateSettingFields((draftState: any) => {
                                                draftState.corner_radius = value;
                                            })
                                        }}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Corner Radius"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="sharp">Sharp</SelectItem>
                                            <SelectItem value="slightly_rounded">Slightly
                                                Rounded</SelectItem>
                                            <SelectItem value="rounded">Rounded</SelectItem>
                                            <SelectItem value="extra_rounded">Extra
                                                Rounded</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {showValidationError(errors, "corner_radius")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>

                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Icon</Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want to
                                    auto-publish, Any changes will only affect new
                                    reviews</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className={"frt-flex frt-items-center frt-gap-4"}>
                                            {settingsState.rating_icon ?
                                                <span className={`frt-text-2xl`}>
                                                <ReviewIcon icon={settingsState.rating_icon}
                                                            color={settingsState.rating_rgb_color}
                                                ></ReviewIcon> </span> : null}
                                            <Button variant="outline">Rating Icon</Button>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className={"frt-grid frt-grid-cols-3 frt-gap-4"}>
                                            {Object.entries(reviewIcons).map(([iconName, iconData]: any, index: number) => {
                                                return (<span key={index}
                                                              className={"frt-cursor-pointer frt-text-2xl"}
                                                              style={{color: settingsState.rating_rgb_color}}
                                                              onClick={() => {
                                                                  updateSettingFields((draftState: any) => {
                                                                      draftState.rating_icon = iconData.filled;
                                                                  })
                                                              }}>
                                                    <ReviewIcon icon={iconData.filled}/></span>);
                                            })}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                {showValidationError(errors, "rating_icon")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>

                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Rating RGB COLOR</Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want to
                                    auto-publish, Any changes will only affect new
                                    reviews</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <PopOverColorPicker color={settingsState.rating_rgb_color}
                                                    onChange={(color: string) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.rating_rgb_color = color;
                                                        })
                                                    }}/>
                                {showValidationError(errors, "rating_rgb_color")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Review Branding</Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want to
                                    auto-publish, Any changes will only affect new
                                    reviews</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Switch id="review-branding"
                                        checked={settingsState.enable_review_branding}
                                        onCheckedChange={(value: any) => {
                                            updateSettingFields((draftState: any) => {
                                                draftState.enable_review_branding = value;
                                            })
                                        }}
                                />
                                {showValidationError(errors, "enable_review_branding")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Enable Email Banners</Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want to
                                    auto-publish, Any changes will only affect new
                                    reviews</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Switch
                                    id="email-banners"
                                    checked={settingsState.enable_email_banners}
                                    onCheckedChange={(value: any) => {
                                        updateSettingFields((draftState: any) => {
                                            draftState.enable_email_banners = value;
                                        })
                                    }}
                                />
                                {showValidationError(errors, "enable_email_banners")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        {
                            settingsState.enable_email_banners ? (
                                <SettingsRowWrapper>
                                    <SettingsColWrapper>
                                        <Label className="frt-w-full">Banner</Label>
                                        <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you
                                            want
                                            to
                                            auto-publish, Any changes will only affect new
                                            reviews</Label>
                                    </SettingsColWrapper>
                                    <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                        <div className="frt-w-full frt-flex frt-gap-3">
                                            {
                                                settingsState.banner_src ? <div className={"frt-w-24 frt-relative"}>
                                                    <img src={settingsState.banner_src} alt="banner"/>
                                                    <i onClick={() => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.banner_src = ""
                                                        })
                                                    }}
                                                       className={"review review-cross-icon frt-cursor-pointer frt-absolute frt-top-0 frt-right-0"}></i>
                                                </div> : null
                                            }
                                            <div
                                                className="frt-border frt-border-dashed frt-w-full frt-p-4 frt-grid frt-justify-center frt-items-center">
                                            <span
                                                className="frt-bg-amber-500 frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                                                onClick={(e: any) => {
                                                    runUploader(e, (data: any) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.banner_src = data
                                                        })
                                                    })
                                                }}>Upload File</span>
                                            </div>
                                        </div>
                                        {showValidationError(errors, "banner_src")}
                                    </SettingsColWrapper>
                                </SettingsRowWrapper>
                            ) : null
                        }

                        <SettingsRowWrapper>
                            <SettingsColWrapper>
                                <Label>Appearance</Label>
                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which reviews you want
                                    to
                                    auto-publish, Any changes will only affect new
                                    reviews</Label>
                            </SettingsColWrapper>
                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                <Select value={settingsState.appearance}
                                        onValueChange={(value: string) => {
                                            updateSettingFields((draftState: any) => {
                                                draftState.appearance = value;
                                            })
                                        }}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Appearance"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {showValidationError(errors, "appearance")}
                            </SettingsColWrapper>
                        </SettingsRowWrapper>
                        {
                            settingsState.appearance == "custom" ? (
                                <>
                                    <h3 className={"frt-font-bold frt-text-lg"}>Custom Appearance Options</h3>
                                    <>
                                        <SettingsRowWrapper>
                                            <SettingsColWrapper>
                                                <Label>Email Background Color</Label>
                                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which
                                                    reviews you want
                                                    to
                                                    auto-publish, Any changes will only affect new
                                                    reviews</Label>
                                            </SettingsColWrapper>
                                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                                <PopOverColorPicker
                                                    color={settingsState.appearance_options.email_background_color}
                                                    onChange={(color: string) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.appearance_options.email_background_color = color;
                                                        })
                                                    }}/>
                                                {showValidationError(errors, "appearance_options.email_background_color")}
                                            </SettingsColWrapper>
                                        </SettingsRowWrapper>
                                        <SettingsRowWrapper>
                                            <SettingsColWrapper>
                                                <Label>Email text color</Label>
                                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which
                                                    reviews you want
                                                    to
                                                    auto-publish, Any changes will only affect new
                                                    reviews</Label>
                                            </SettingsColWrapper>
                                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                                <PopOverColorPicker
                                                    color={settingsState.appearance_options.email_text_color}
                                                    onChange={(color: string) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.appearance_options.email_text_color = color;
                                                        })
                                                    }}/>
                                                {showValidationError(errors, "appearance_options.email_text_color")}
                                            </SettingsColWrapper>
                                        </SettingsRowWrapper>
                                        <SettingsRowWrapper>
                                            <SettingsColWrapper>
                                                <Label>Button Background Color</Label>
                                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which
                                                    reviews you want to auto-publish, Any changes will only affect new
                                                    reviews</Label>
                                            </SettingsColWrapper>
                                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                                <PopOverColorPicker
                                                    color={settingsState.appearance_options.button_bg_color}
                                                    onChange={(color: string) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.appearance_options.button_bg_color = color;
                                                        })
                                                    }}/>
                                                {showValidationError(errors, "appearance_options.button_bg_color")}
                                            </SettingsColWrapper>
                                        </SettingsRowWrapper>
                                        <SettingsRowWrapper>
                                            <SettingsColWrapper>
                                                <Label>Button Border Color</Label>
                                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which
                                                    reviews you want
                                                    to
                                                    auto-publish, Any changes will only affect new
                                                    reviews</Label>
                                            </SettingsColWrapper>
                                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                                <PopOverColorPicker
                                                    color={settingsState.appearance_options.button_border_color}
                                                    onChange={(color: string) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.appearance_options.button_border_color = color;
                                                        })
                                                    }}/>
                                                {showValidationError(errors, "appearance_options.button_border_color")}
                                            </SettingsColWrapper>
                                        </SettingsRowWrapper>
                                        <SettingsRowWrapper>
                                            <SettingsColWrapper>
                                                <Label>Button Title Color</Label>
                                                <Label className={"frt-text-xs frt-text-grayprimary"}>select which
                                                    reviews you want
                                                    to
                                                    auto-publish, Any changes will only affect new
                                                    reviews</Label>
                                            </SettingsColWrapper>
                                            <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                                <PopOverColorPicker
                                                    color={settingsState.appearance_options.button_title_color}
                                                    onChange={(color: string) => {
                                                        updateSettingFields((draftState: any) => {
                                                            draftState.appearance_options.button_title_color = color;
                                                        })
                                                    }}/>
                                                {showValidationError(errors, "appearance_options.button_title_color")}
                                            </SettingsColWrapper>
                                        </SettingsRowWrapper>
                                    </>
                                    <SettingsRowWrapper>
                                        <SettingsColWrapper>
                                            <Label>Font Type</Label>
                                            <Label className={"frt-text-xs frt-text-grayprimary"}>select which
                                                reviews you want
                                                to
                                                auto-publish, Any changes will only affect new
                                                reviews</Label>
                                        </SettingsColWrapper>
                                        <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                            <Select
                                                value={settingsState.appearance_options.font_type}
                                                onValueChange={(value: string) => {
                                                    updateSettingFields((draftState: any) => {
                                                        draftState.appearance_options.font_type = value;
                                                    })
                                                }}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Corner Radius"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem
                                                            value="arial">Arial</SelectItem>
                                                        <SelectItem value="times_new_roman">Times
                                                            New
                                                            Roman</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {showValidationError(errors, "appearance_options.font_type")}
                                        </SettingsColWrapper>
                                    </SettingsRowWrapper>
                                    <SettingsRowWrapper>
                                        <SettingsColWrapper>
                                            <Label>Font Size</Label>
                                            <Label className={"frt-text-xs frt-text-grayprimary"}>select which
                                                reviews you want
                                                to
                                                auto-publish, Any changes will only affect new
                                                reviews</Label>
                                        </SettingsColWrapper>
                                        <SettingsColWrapper customClassName={"!frt-gap-0"}>
                                            <InputFontSize
                                                min={10}
                                                max={50}
                                                step={1}
                                                value={settingsState.appearance_options.font_size}
                                                onChange={(value: any) => {
                                                    updateSettingFields((draftState: any) => {
                                                        draftState.appearance_options.font_size = value;
                                                    })
                                                }}
                                            />
                                            {showValidationError(errors, "appearance_options.font_size")}
                                        </SettingsColWrapper>
                                    </SettingsRowWrapper>
                                </>
                            ) : null
                        }
                        <Button onClick={saveBrandSettings} className={"frt-max-w-max"}>
                            {saveChangesLoading && (
                                <span className="frt-mx-2">
                                        <LoadingSpinner/>
                                    </span>)}
                            <span>Save Changes</span>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
        ;
};

export default BrandingSetting;
