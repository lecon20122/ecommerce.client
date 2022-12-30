import { ProductDescription } from '@framework/types';
import React from 'react'
import { Collapse } from "@components/common/accordion";
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
    description: ProductDescription[] | undefined
}



export default function ProductDescriptionCollapse({ description }: Props) {
    const {
        locale
    } = useRouter();

    const [expanded, setExpanded] = useState<number>(0);
    return (
        <>
            <Collapse
                i={1}
                key={'description'}
                title={'Description'}
                translatorNS="review"
                content={
                    <ul>
                        {description?.map((item) => (
                            <li>
                                <span className="font-semibold text-heading inline-block pe-2">
                                    {item.attribute.attribute[locale as keyof typeof item.attribute.attribute]} :
                                </span>
                                <>{item.value[locale as keyof typeof item.value]}</>
                            </li>
                        ))}
                    </ul>
                }
                expanded={expanded}
                setExpanded={setExpanded}
                variant="transparent"
            />

        </>
    );
}
