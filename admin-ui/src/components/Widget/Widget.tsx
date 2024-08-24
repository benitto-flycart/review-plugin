import React, {useState} from 'react';
import '@/src/styles/dashboard/dashboard.css';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {NavLink} from "react-router-dom";
import ProductWidget from "./ProductReviewWidget/ProductWidget";
import ProductWidgetContextAPI from "./ProductReviewWidget/ProductReviewContextAPI";
import PopupWidgetContextAPI from "./PopupWidget/PopupWidgetContextAPI";
import PopupWidgetDialog from "./PopupWidget/PopupWidgetDialog";
import FloatingProductWidgetDialog from "./FloatingProductWidget/FloatingProductWidgetDialog";
import FloatingProductWidgetContextAPI from "./FloatingProductWidget/FloatingProductWidgetContextAPI";
import SnippetWidgetDialog from "./SnippetWidget/SnippetWidgetDialog";
import SnippetWidgetContextAPI from "./SnippetWidget/SnippetWidgetContextAPI";
import RatingWidgetDialog from "./RatingWidget/RatingWidgetDialog";
import RatingWidgetContextAPI from "./RatingWidget/RatingWidgetContextAPI";
import ReviewFormWidgetContextAPI from "./ReviewFormWidget/ReviewFormWidgetContextAPI";
import ReviewFormWidgetDialog from "./ReviewFormWidget/ReviewFormDialogWidgetDialog";

const Widget = () => {
    const [activeDialog, setActiveDialog] = useState<string>('product_widget')

    const reset = () => {
        setActiveDialog('')
    };

    return (<div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
        <div>
            <h3>Available Widgets</h3>
        </div>
        <div className="frt-grid frt-grid-cols-3 frt-gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Product Reviews Widget</CardTitle>
                    <CardDescription>Customize your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from
                        multiple layouts</p>
                </CardContent>
                <CardFooter className="frt-flex frt-justify-end">
                    <Button onClick={() => {
                        setActiveDialog('product_widget')
                    }}>
                        Customize
                    </Button>

                    {activeDialog == 'product_widget' ? (<ProductWidgetContextAPI>
                        <ProductWidget toggle={reset}/>
                    </ProductWidgetContextAPI>) : null}

                </CardFooter>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Popup Widget</CardTitle>
                    <CardDescription>Customize your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from
                        multiple layouts</p>
                </CardContent>
                <CardFooter className="frt-flex frt-justify-end">
                    <Button onClick={() => {
                        setActiveDialog('popup_widget')
                    }}>
                        Customize
                    </Button>

                    {activeDialog == 'popup_widget' ? (<PopupWidgetContextAPI>
                        <PopupWidgetDialog show={true} toggle={reset}/>
                    </PopupWidgetContextAPI>) : null}
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Reviews Sidebar Widget</CardTitle>
                    <CardDescription>Customize your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from
                        multiple layouts</p>
                </CardContent>
                <CardFooter className="frt-flex frt-justify-end">
                    <NavLink
                        to={"/widgets/review-sidebar-widget"}>
                        <Button>Configure</Button>
                    </NavLink>
                </CardFooter>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Floating Product Reviews Widget 2</CardTitle>
                    <CardDescription>Customize your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from
                        multiple layouts</p>
                </CardContent>
                <CardFooter className="frt-flex frt-justify-end">
                    <CardFooter className="frt-flex frt-justify-end">
                        <Button onClick={() => {
                            setActiveDialog('floating_product_widget')
                        }}>
                            Customize
                        </Button>

                        {activeDialog == 'floating_product_widget' ? (<FloatingProductWidgetContextAPI>
                            <FloatingProductWidgetDialog show={true} toggle={reset}/>
                        </FloatingProductWidgetContextAPI>) : null}
                    </CardFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Snippet Widget </CardTitle>
                    <CardDescription>Customize your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from
                        multiple layouts</p>
                </CardContent>
                <CardFooter className="frt-flex frt-justify-end">
                    <CardFooter className="frt-flex frt-justify-end">
                        <Button onClick={() => {
                            setActiveDialog('snippets_widget')
                        }}>
                            Customize
                        </Button>

                        {activeDialog == 'snippets_widget' ? (<SnippetWidgetContextAPI>
                            <SnippetWidgetDialog show={true} toggle={reset}/>
                        </SnippetWidgetContextAPI>) : null}
                    </CardFooter>
                </CardFooter>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Rating Review Widget </CardTitle>
                    <CardDescription>Customize your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from
                        multiple layouts</p>
                </CardContent>
                <CardFooter className="frt-flex frt-justify-end">
                    <CardFooter className="frt-flex frt-justify-end">
                        <Button onClick={() => {
                            setActiveDialog('rating_widget')
                        }}>
                            Customize
                        </Button>

                        {activeDialog == 'rating_widget' ? (<RatingWidgetContextAPI>
                            <RatingWidgetDialog show={true} toggle={reset}/>
                        </RatingWidgetContextAPI>) : null}
                    </CardFooter>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Review Form Widget</CardTitle>
                    <CardDescription>Customize your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Convert visitors into buyers with an eye-catching gallery showcasing your reviews. Choose from
                        multiple layouts</p>
                </CardContent>
                <CardFooter className="frt-flex frt-justify-end">
                    <CardFooter className="frt-flex frt-justify-end">
                        <Button onClick={() => {
                            setActiveDialog('review_form')
                        }}>
                            Customize
                        </Button>

                        {activeDialog == 'review_form' ? (<ReviewFormWidgetContextAPI>
                            <ReviewFormWidgetDialog show={true} toggle={reset}/>
                        </ReviewFormWidgetContextAPI>) : null}
                    </CardFooter>
                </CardFooter>
            </Card>
        </div>
    </div>)
};

export default Widget;