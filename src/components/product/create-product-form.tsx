import Button from '@components/ui/button';
import { useStoreCategoriesQuery } from '@framework/category/get-categories-for-store-dashboard';
import { Form, Input, InputNumber, Select } from 'antd'
import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
import { ROUTES } from '../../utils/routes';


export default function CreateProduct() {

    const [isLoading, setIsLoading] = useState(false)
    const [initialState, setInitialState] = useState<any>({})
    const router = useRouter()

    useLayoutEffect(() => {
        if (sessionStorage.getItem('create-product-form')) {
            setInitialState(JSON.parse(sessionStorage.getItem('create-product-form') as string))
        }
        setIsLoading(true)
    }, [])

    const { data: categories } = useStoreCategoriesQuery()
    const { locale } = useRouter()

    const onFinish = (values: any) => {
        sessionStorage.setItem('create-product-form', JSON.stringify(values))
        router.push(ROUTES.DASHBOARD_CREATE_VARIANTS)
    };

    if (isLoading) {
        return (
            <>
                <Form
                    size='large'
                    wrapperCol={{ span: 12 }} onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        initialValue={initialState.en}
                        name="en"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='Title in English' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="ar"
                        initialValue={initialState.ar}
                    >
                        <Input placeholder='Title in Arabic' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="price"
                        initialValue={initialState.price}
                    >
                        <InputNumber className='w-full' placeholder='Price' />
                    </Form.Item>
                    <Form.Item name="category_ids" initialValue={initialState.category_ids} rules={[{ required: true }]}>
                        <Select
                            mode="multiple"
                            placeholder="Select a category"
                            allowClear
                        >
                            {categories?.map((category) => (
                                <Select.Option
                                    key={category.id}
                                    value={category.id}>{category.title[locale as keyof typeof category.title]}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </>

        )
    } else {
        return (
            <div>
                <h1>loading</h1>
            </div>
        )
    }
}
