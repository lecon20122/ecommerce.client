import SearchIcon from "@components/icons/search-icon";
import React from "react";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { IoCloseOutline } from "react-icons/io5";
import { useUI } from "@contexts/ui.context";
import { valid } from "overlayscrollbars";
import { values } from "lodash";

type SearchProps = {
	className?: string;
	onSubmit: (e: React.SyntheticEvent) => void;
	onClear: (e: React.SyntheticEvent) => void;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	name: string;
	value: string;
};

const SearchBox = React.forwardRef<HTMLInputElement, SearchProps>(
	({ className, onSubmit, onClear, ...rest }, ref) => {
		const { t } = useTranslation("forms");
		const { closeSearch } = useUI();
		return (
			<form
				className={cn(
					"relative pe-12 md:pe-14 bg-white overflow-hidden rounded-md w-full",
					className
				)}
				noValidate
				role="search"
				onSubmit={onSubmit}
			>
				<label htmlFor="search" className="flex items-center py-0.5">
					<span className="flex items-center justify-center flex-shrink-0 w-12 h-full cursor-pointer md:w-14 focus:outline-none">
						<SearchIcon color="text-heading" className="w-4 h-4" />
					</span>
					<input
						id="search"
						className="w-full h-12 text-sm placeholder-gray-400 outline-none text-heading lg:h-14 lg:text-base"
						placeholder={t("placeholder-search")}
						aria-label="Search"
						autoComplete="off"
						ref={ref}
						{...rest}
					/>
				</label>
				<button
					type="button"
					className="absolute top-0 flex items-center justify-center w-12 h-full text-2xl text-gray-400 transition duration-200 ease-in-out outline-none md:text-3xl end-0 md:w-14 hover:text-heading focus:outline-none"
					onClick={onClear}
				>
					<IoCloseOutline className="w-6 h-6"/>
				</button>
			</form>
		);
	}
);

export default SearchBox;
