interface Props {
    children: React.ReactNode
    className?: string;
    btnProps: React.ButtonHTMLAttributes<any>;
    isAuthorized: boolean;
}

const CustomAuthMenu: React.FC<Props> = ({
    isAuthorized,
    className,
    btnProps,
    children,
}) => {
    return isAuthorized ? (
        <div className={className}>
            {children}
        </div>
    ) : (
        <button {...btnProps} className={className} />
    );
};

export default CustomAuthMenu;
