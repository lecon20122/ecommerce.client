import { ProductDescription } from '@framework/types';
import React from 'react'
import { Collapse } from "@components/common/accordion";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@components/ui/button';
import CreateProductDescriptionForm from './add-new-product-description-form';
import UpdateProductDescriptionForm from './update-product-description-form';
import { useDeleteProductDescriptionMutation } from '@framework/product/delete-product-description';

interface Props {
    description: ProductDescription[] | undefined,
    variant?: "gray" | "transparent";
}



export default function ProductDescriptionCollapse({ description, variant }: Props) {
    const {
        locale
    } = useRouter();

    const [expanded, setExpanded] = useState<number>(0);
    const [openAddDescriptionDialog, setOpenAddDescriptionDialog] = useState(false);
    const [openUpdateDescriptionDialog, setOpenUpdateDescriptionDialog] = useState(false);
    const [currentDescription, setCurrentDescription] = useState<ProductDescription>();
    const { mutate: destroy } = useDeleteProductDescriptionMutation()

    const handleOnClickAddDescriptionDialog = () => {
        setOpenAddDescriptionDialog(!openAddDescriptionDialog);
    }

    const handleOnClickUpdateDescriptionDialog = (item: ProductDescription) => {
        setCurrentDescription(item)
        setOpenUpdateDescriptionDialog(!openUpdateDescriptionDialog);
    }

    return (
        <div className='flex-col space-y-2'>
            <Button onClick={handleOnClickAddDescriptionDialog} variant='slim'>Add new</Button>
            <CreateProductDescriptionForm openAddDialog={openAddDescriptionDialog}
                handleAddDialog={handleOnClickAddDescriptionDialog} />
            <UpdateProductDescriptionForm currentDescription={currentDescription}
                openAddDialog={openUpdateDescriptionDialog} handleAddDialog={handleOnClickUpdateDescriptionDialog} />
            <Collapse
                i={1}
                titleKey={"label-description"}
                key={'description'}
                title={'Description'}
                translatorNS="forms"
                content={
                    <ul>
                        {description?.map((item) => (
                            <li key={item.id} className={'flex justify-between'}>
                                <div>
                                    <span className="font-semibold text-heading inline-block pe-2">
                                        {item.attribute.attribute[locale as keyof typeof item.attribute.attribute]} :
                                    </span>
                                    <>{item.value[locale as keyof typeof item.value]}</>
                                </div>
                                <div className='flex space-x-1'>
                                    {/* <span className='cursor-pointer' onClick={(e) => handleOnClickUpdateDescriptionDialog(item)}>Update</span> */}
                                    <span onClick={(e) => destroy({ product_description_id: item.id })} className='cursor-pointer'>Delete</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                }
                expanded={expanded}
                setExpanded={setExpanded}
                variant={variant}
            />

        </div>
    );
}
