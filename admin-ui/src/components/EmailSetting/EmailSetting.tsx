import React from "react";
import {useLocalState} from "../zustand/localState";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "../ui/card";
import "../../main.css";
import {NavLink} from "react-router-dom";
import {Button} from "../ui/button";

const EmailSetting = () => {
    const {localState, setLocalState} = useLocalState();

    return (
        <div className="frt-my-4 frt-px-4 frt-flex frt-flex-col frt-gap-3">
            <div>
                <h3>Configure Emails</h3>
            </div>
            <div className="frt-grid frt-grid-cols-3 frt-gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Review Request</CardTitle>
                        <CardDescription>Review Request Settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Encourage your customers to leave a review with an automated email</p>
                    </CardContent>
                    <CardFooter className="frt-flex frt-justify-end">
                        <NavLink
                            to={"/emails/review-request"}>
                            <Button>Configure</Button>
                        </NavLink>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Review Reminder</CardTitle>
                        <CardDescription>Review Reminder Settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Encourage your customers to leave a review with an automated email</p>
                    </CardContent>
                    <CardFooter className="frt-flex frt-justify-end">

                        <NavLink
                            to={"/emails/review-reminder"}>
                            <Button>Configure</Button>
                        </NavLink>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Photo Request</CardTitle>
                        <CardDescription>Review Request Settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Encourage your customers to leave a review with an automated email</p>
                    </CardContent>
                    <CardFooter className="frt-flex frt-justify-end">

                        <NavLink
                            to={"/emails/photo-reminder"}>
                            <Button>Configure</Button>
                        </NavLink>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Discount Reminder</CardTitle>
                        <CardDescription>Discount Reminder Settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Remind your customers to use their next-purchase discount if they haven't used it yet</p>
                    </CardContent>
                    <CardFooter className="frt-flex frt-justify-end">

                        <NavLink
                            to={"/emails/discount-reminder"}>
                            <Button>Configure</Button>
                        </NavLink>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reply to Review</CardTitle>
                        <CardDescription>Reply to Review Settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Inform your customers once you publicly reply to their review</p>
                    </CardContent>
                    <CardFooter className="frt-flex frt-justify-end">

                        <NavLink
                            to={"/emails/reply-to-review"}>
                            <Button>Configure</Button>
                        </NavLink>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
};

export default EmailSetting;
