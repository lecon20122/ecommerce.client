import { ProductDescription } from '@framework/types';
import React from 'react'
import { Collapse } from "@components/common/accordion";
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
    description: ProductDescription[] | undefined,
    variant?: "gray" | "transparent";
}



export default function ProductDescriptionCollapse({ description , variant }: Props) {
    const {
        locale
    } = useRouter();

    const [expanded, setExpanded] = useState<number>(0);
    return (
        <>
            <Collapse
                i={1}
                titleKey={"label-description"}
                key={'description'}
                title={'Description'}
                translatorNS="forms"
                content={
                    <ul>
                        {description?.map((item) => (
                            <li key={item.id}>
                                <span  className="font-semibold text-heading inline-block pe-2">
                                    {item.attribute.attribute[locale as keyof typeof item.attribute.attribute]} :
                                </span>
                                <>{item.value[locale as keyof typeof item.value]}</>
                            </li>
                        ))}
                    </ul>
                }
                expanded={expanded}
                setExpanded={setExpanded}
                variant={variant}
            />

        </>
    );
}
