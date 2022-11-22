import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { VariationTypeValue } from '../../framework/basic-rest/types';


interface Props {
    size: VariationTypeValue[] | undefined
}

export const SizeFilter = ({ size }: Props) => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { pathname, query , locale } = router;

    const selectedSizes = query?.size

        ? (query.size as string).split(",")
        : [];

    const [formState, setFormState] = React.useState<string[]>(
        selectedSizes
    );

    React.useEffect(() => {
        setFormState(selectedSizes);
    }, [query?.size]);


	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		setFormState(currentFormState);
		const { size, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { size: currentFormState.join(",") }
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
                {size?.map((item : VariationTypeValue) => (
                    <CheckBox
                        key={item.id}
                        name={item.value.en}
                        label={item.value[locale as keyof typeof item.value]}
                        checked={formState.includes(item.slug)}
                        value={item.slug}
                        onChange={handleItemClick}
                    />
                ))}
            </div>
        </div>
    );
};
