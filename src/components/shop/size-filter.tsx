import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { VariationFilter } from '../../framework/basic-rest/types';


interface Props {
    size: VariationFilter[] | undefined
}

export const SizeFilter = ({ size }: Props) => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { pathname, query , locale } = router;

    const selectedCategories = query?.size

        ? (query.size as string).split(",")
        : [];
    const [formState, setFormState] = React.useState<string[]>(
        selectedCategories
    );

    React.useEffect(() => {
        setFormState(selectedCategories);
    }, [query?.size]);


    function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
        const { value } = e.currentTarget;
        let currentFormState = formState.includes(value)
            ? formState.filter((i) => i !== value)
            : [...formState, value];
        const { size, ...restQuery } = query;
        router.push(
            {
                pathname,
                query: {
                    ...restQuery,
                    ...(!!currentFormState.length
                        ? { size: currentFormState }
                        : {}),
                },
            },
            undefined,
            { scroll: false }
        );
    }
    return (
        <div className="block border-b border-gray-300 pb-7 mb-7">
            <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
                {t("text-size")}
            </h3>
            <div className="mt-2 flex flex-col space-y-4">
                {size?.map((item: any) => (
                    <CheckBox
                        key={item.id}
                        label={item.value[locale as keyof typeof item.value]}
                        name={item.value[locale as keyof typeof item.value].toLowerCase()}
                        checked={formState.includes(item.slug)}
                        value={item.slug}
                        onChange={handleItemClick}
                    />
                ))}
            </div>
        </div>
    );
};
