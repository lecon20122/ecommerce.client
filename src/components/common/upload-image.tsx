import { UploadFile, } from 'antd'
import { UploadChangeParam, UploadListType } from 'antd/es/upload/interface'
import { useState } from 'react';
import { Upload } from 'antd';
import Button from '@components/ui/button';

interface Props {
    param?: any
    multiple: boolean
    buttonLabel?: string
    listType?: UploadListType;
    className?: string | undefined;
    btnClassName?: string | undefined;
    mutate: any;
    loading: boolean
}

export default function UploadImage({ multiple, mutate, param, btnClassName, buttonLabel, className, listType, loading }: Props) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleUpload = () => {
        const formData = new FormData();

        fileList.map((file) => {
            formData.append('images[]', file.originFileObj as any);
        });

        mutate({ images: formData, ...param })
    };

    const onRemove = (file: any) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    }

    const onChangeHandler = (file: UploadChangeParam) => {
        setFileList(file.fileList);
    }

    return (
        <div className={className}>
            <Upload
                onChange={(e) => onChangeHandler(e)}
                listType={listType}
                onRemove={onRemove}
                multiple={multiple}
            >
                {fileList.length < 6 && <span>Upload from Device</span>}
            </Upload>
            {fileList.length !== 0 &&
                <Button
                    type="submit"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={loading}
                    className={btnClassName}
                >
                    {loading ? 'Uploading' : 'Start Upload'}
                </Button>}
        </div>
    )
}
