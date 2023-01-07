

export function removeEmptyFields(data: any) {
    Object.keys(data).forEach(key => {
        if (data[key] === '') {
            delete data[key];
        }
    });
    return data
}