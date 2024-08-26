import React, {useEffect, useState} from "react";
import {useLocalState} from "@/src/components/zustand/localState";
import {Button} from "@/src/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader,} from "@/src/components/ui/card";
import "@/src/main.css";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import {useForm} from "react-hook-form";
import {Input} from "../../ui/input";
import {LoadingSpinner} from "../../ui/loader";

const ManualReviewRequestForm = () => {
    const [loading, setLoading] = useState(true);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const {localState, setLocalState} = useLocalState();
    const [errors, setErrors] = useState<any>();

    useEffect(() => {
        setLoading(true);
    }, []);

    const form = useForm();

    return (
        <Card>
            <CardHeader>
                <h3>Send manual review requests</h3>
                <h5>Collect reviews from people who have tried your products</h5>
            </CardHeader>
            <CardContent className="frt-my-4 frt-grid !frt-p-2">
                <Form {...form} >
                    <FormField
                        control={form.control}
                        name="email_address"
                        render={({field}) => (
                            <FormItem className="frt-m-2 frt-my-2">
                                <div
                                    className="frt-grid frt-grid-cols-[30%_70%]">
                                    <FormLabel className="frt-w-full">Email Address</FormLabel>
                                    <div className="frt-w-full">
                                        <FormControl>
                                            <Input type="email" placeholder="Enter Email"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logo"
                        render={({field}) => (
                            <FormItem className="frt-m-2 frt-my-2">
                                <div
                                    className="frt-grid frt-grid-cols-[30%_70%]">
                                    <FormLabel className="frt-w-full">Logo</FormLabel>
                                    <div className="frt-w-full">
                                        <div
                                            className="frt-border frt-border-dashed  frt-p-4 frt-grid frt-justify-center frt-items-center">
                                            <span
                                                className="frt-bg-amber-500 frt-p-2 frt-w-max frt-rounded frt-cursor-pointer"
                                                onClick={() => {
                                                    console.log('open product select model with latest 10 products');
                                                    alert('select upto 5 products in model popup');
                                                }}>Select Products</span>
                                        </div>
                                        <FormMessage/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email_subject"
                        render={({field}) => (
                            <FormItem className="frt-m-2 frt-my-2">
                                <div
                                    className="frt-grid frt-grid-cols-[30%_70%]">
                                    <FormLabel className="frt-w-full">Email Subject</FormLabel>
                                    <div className="frt-w-full">
                                        <FormControl>
                                            <Input type="text" placeholder="Please let us know what you think!"
                                                   value="Please let us know what you think!"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                </Form>
            </CardContent>
            <CardFooter className="frt-flex frt-justify-between !frt-py-4 !frt-px-6">
                <div>
                </div>
                <Button>
                    {saveChangesLoading && (
                        <span className="frt-mx-2"><LoadingSpinner/></span>
                    )}
                    <span>Send Email</span>
                </Button>
                <span>By sending this email, I confirm that the recipients have given consent</span>
            </CardFooter>
        </Card>
    );
};

export default ManualReviewRequestForm;
