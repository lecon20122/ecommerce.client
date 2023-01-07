import React from 'react'
import cn from 'classnames';
import { useTranslation } from 'next-i18next';


interface SelectProps {
    value: any,
    labelKey?: string;
    children: React.ReactNode,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>,
    variant?: 'normal' | 'solid' | 'outline';
    shadow?: boolean;
    inputClassName?: string;
    className?: string;
    name: string;
    disableBorderRadius?: boolean;
    placeholder?: string
}



const CustomSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            value,
            children,
            onChange,
            className,
            labelKey,
            inputClassName,
            name,
            variant = 'normal',
            shadow = false,
            disableBorderRadius = false,
            placeholder
        },
        ref
    ) => {
        const classes = {
            root: 'py-2 px-2 md:px-3 w-full transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out',
            normal: 'bg-gray-100 border-gray-300 focus:shadow focus:bg-white focus:border-primary',
            solid: 'bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12',
            outline: 'border-gray-300 focus:border-primary',
            shadow: 'focus:shadow',
        };

        const rootClassName = cn(
            classes.root,
            {
                [classes.normal]: variant === 'normal',
                [classes.solid]: variant === 'solid',
                [classes.outline]: variant === 'outline',
            },
            {
                [classes.shadow]: shadow,
            },
            inputClassName
        );
        const { t } = useTranslation();
        return (
            <div className={className}>
                {labelKey && (
                    <label htmlFor={name} className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                        {t(labelKey)}
                    </label>
                )}
                <select placeholder={placeholder} ref={ref} onChange={onChange} value={value} className={rootClassName + `${!disableBorderRadius && ' rounded-md'}`}>
                    {children}
                </select>
            </div>
        )
    }
)

export default CustomSelect