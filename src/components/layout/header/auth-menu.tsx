import Link from "@components/ui/link";
interface Props {
	children : React.ReactNode
	href: string;
	className?: string;
	btnProps: React.ButtonHTMLAttributes<any>;
	isAuthorized: boolean;
}

const AuthMenu: React.FC<Props> = ({
	isAuthorized,
	href,
	className,
	btnProps,
	children,
}) => {
	return isAuthorized ? (
		<Link href={href} className={className}>
			{children}
		</Link>
	) : (
		<button {...btnProps} className={className} />
	);
};

export default AuthMenu;
