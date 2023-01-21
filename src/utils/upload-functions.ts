import { UploadFile } from "antd";


export const onRemove = (file: any, fileList: UploadFile[], setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
}

export function appendImageToFormData(fileList: UploadFile[]) {
    const formData = new FormData();
    fileList.map((file , index) => {
        formData.append(`images[${index}]`, file.originFileObj as any);
    });
    
    return formData
}