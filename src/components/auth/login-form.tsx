import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { ImGoogle2 } from "react-icons/im";
import { useTranslation } from "next-i18next";
import { signIn } from "next-auth/react";
import { useState } from 'react';



const LoginForm: React.FC = () => {
	const { t } = useTranslation();
	const { closeModal } = useUI();
	const [isLoading, setIsLoading] = useState<boolean>(false)

	

	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("common:login-helper")}
				</p>
			</div>
			{/* <Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
				onClick={handelSocialLogin}
			>
				<ImFacebook2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-facebook")}
			</Button> */}
			{/* <Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
				onClick={() => googleLogin()}
			>
				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-google")}
			</Button> */}
			<Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
				onClick={() => signIn("google")}
			>
				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-google")}
			</Button>
		</div>
	);
};

export default LoginForm;
