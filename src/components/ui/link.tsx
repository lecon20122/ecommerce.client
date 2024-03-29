import NextLink, { LinkProps as NextLinkProps } from "next/link";

const Link: React.FC<NextLinkProps & { className?: string , children : React.ReactNode }> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink legacyBehavior={true} href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
