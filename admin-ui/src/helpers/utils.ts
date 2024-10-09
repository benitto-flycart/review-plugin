
export const runUploader = (event: any, cb: any) => {
    let frame: any;
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
        library: {
            type: ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'] // Restrict to png, jpg, gif, svg (icon)
        }
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



export const getArrayForShimmering = () => {
    return [0, 1, 2, 3, 4, 5];
}


export const isString = (data: any): string => {
    if (typeof data === "string") {
        return data.trim();
    } else {
        return JSON.stringify(data);
    }
}

export const isValidJSON = (jsonString: any): boolean => {
    try {
        JSON.parse(isString(jsonString));
        return true;
    } catch (error) {
        return false;
    }
}
export const getReviewWidth = (totalReviews: number, currentReview: number): string => {
    if (totalReviews === 0) {
        return "0%";
    }
    const calculatedWidth = Math.round((currentReview / totalReviews) * 100);
    return `${calculatedWidth}%`;
};

export const getJSONData = (json: any, start: string = "{", end: string = "}") => {
    if (isValidJSON(json)) {
        return JSON.parse(isString(json));
    } else {
        let startIndex = json.indexOf(start);
        let endIndex = json.lastIndexOf(end) + end.length;
        let resSubString = json.substring(startIndex, endIndex);
        if (isValidJSON(resSubString)) {
            return JSON.parse(isString(resSubString));
        }
        return {};
    }
}

// onchange handle fields
export const handleFields = (State: any, value: any, fields: any) => {
    fields = fields.split(".");
    let data = { ...State };
    let currentState = data;

    fields.forEach((field: any, index: number) => {
        if (index === fields.length - 1) {
            currentState[field] = value === null ? "" : value;
        } else {
            if (currentState[field]) {
                currentState = currentState[field];
            } else {
                console.log(`Field "${field}" not found in State.`)
            }
        }
    });

    return data;
};

export const toSnakeCase = (inputString: String) => {
    return inputString.toLocaleLowerCase().replace(/[^a-z0-9]/g, '_');
}

export const getDateFormat = (date: any) => {
    let newDate = new Date(date);
    if (newDate.toString() === "Invalid Date") return "-";
    return newDate.toISOString().substring(0, 10)
}

export const getEditableStatus = (localIsPro: boolean, programIsPro: boolean) => {
    return localIsPro == false && programIsPro;
}

export const getFormattedDateWithTime = (date: string) => date.slice(0, 16).replace("T", " ");


