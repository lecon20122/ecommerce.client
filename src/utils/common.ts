export function getFormData(formData: FormData, object: any) {
    const keys = Object.keys(object);
    keys.forEach(key => {
        if (object[key] instanceof Array) {
            object[key].forEach((item: any, index: number) => {
                formData.append(`${key}[]`, JSON.stringify(item));
            });
        } else {
            formData.append(key, object[key]);
        }
    })
    return formData;
}