import React from 'react';
import {useLocalState} from "../zustand/localState";
import '@/src/styles/dashboard/dashboard.css';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {NavLink} from "react-router-dom";

const Widget = () => {
    const {localState} = useLocalState();

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
                    <NavLink
                        to={"/widgets/product-review-widget"}>
                        <Button>Configure</Button>
                    </NavLink>
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
                    <NavLink
                        to={"/widgets/popup-widget"}>
                        <Button>Configure</Button>
                    </NavLink>
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
                    <NavLink
                        to={"/widgets/floting-product-widget"}>
                        <Button>Configure</Button>
                    </NavLink>
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
                    <NavLink
                        to={"/widgets/snippets-widget"}>
                        <Button>Configure</Button>
                    </NavLink>
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
                    <NavLink
                        to={"/widgets/rating-widget"}>
                        <Button>Configure</Button>
                    </NavLink>
                </CardFooter>
            </Card>
        </div>
    </div>)
};

export default Widget;