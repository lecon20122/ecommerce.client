import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";


export const onRemove = (file: any, fileList: UploadFile[], setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
}

export function appendImageToFormData(fileList: UploadFile[]) {
    const formData = new FormData();
    fileList.map((file) => {
        formData.append('images[]', file.originFileObj as any);
    });
    
    return formData
}