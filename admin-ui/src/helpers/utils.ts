let frame: any;
export const runUploader = (event: any, cb: any) => {
    event.preventDefault()

    // If the media frame already exists, reopen it.
    if (frame) {
        frame.open()
        return
    }

    // Create a new media frame
    //@ts-ignore
    frame = wp.media({
        title: 'Select or Upload Media Of Your Chosen Persuasion',
        button: {
            text: 'Use this media',
        },
        multiple: false, // Set to true to allow multiple files to be selected
    })

    frame.on("select", () => {

        let selection = frame.state().get("selection");
        let data;

        selection.each((attachment: any) => {
            data = attachment["attributes"]["url"];
        });

        cb(data)

    });
    // Finally, open the modal on click
    frame.open()
}
