import React from "react";
import {Dialog, DialogContent, DialogTitle,} from "../ui/dialog";
import "@/src/styles/widgets/widget.css";
import {LoadingSpinner} from "../ui/loader";
import Frame from "react-frame-component";

interface PreviewEmailDialogProps {
    show:boolean,
    toggle:(open:boolean) => void,
    loadingPreview:boolean,
    previewContent:React.ReactNode,
    title:string
}
const PreviewEmailDialog = <T extends PreviewEmailDialogProps>({
                               show,
                               toggle,
                               loadingPreview,
                               previewContent,
                               title,
                           }: T) => {

    return (
        <Dialog open={show} onOpenChange={toggle}>
            <DialogContent className={"frt-rounded-md frt-min-h-[600px] "}
                           onInteractOutside={(e: any) => {
                               e.preventDefault();
                           }}
            > {
                loadingPreview ? <LoadingSpinner/>: <>
                <DialogTitle><span>{title}</span></DialogTitle>
                  <Frame className='frt-h-full frt-min-h-[600px] frt-w-full'>
                        <div dangerouslySetInnerHTML={{__html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple HTML Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            text-align: center;
        }

        p {
            color: #666;
            line-height: 1.6;
            text-align: justify;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div>
     <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div> <div class="container">
        <h1>Welcome to My Simple Page</h1>
        <p>This is a simple HTML page with some basic CSS for styling. The layout is centered, and the text is aligned for readability. Feel free to customize it as needed!</p>
    </div>

</body>
</html>`}}></div>
                                </Frame>
                </>
                }
            </DialogContent>
        </Dialog>
    );
};

export default PreviewEmailDialog;

