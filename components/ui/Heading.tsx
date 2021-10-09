import cn from "classnames";
import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
}

const Heading: FC<Props> = ({
  as: element = "h1",
  children,
  className,
  ...props
}) => {
  const Component = (props: HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(element, props, children);

  const rootClassName = cn(
    {
      "text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl mb-2":
        element === "h1",
      "text-2xl tracking-tight font-bold sm:text-3xl md:text-4xl mb-2":
        element === "h2",
      "text-lg font-semibold sm:text-xl md:text-2xl mb-1": element === "h3",
      "text-md font-semibold sm:text-lg md:text-xl mb-1": element === "h4",
    },
    className
  );

  return (
    <Component className={rootClassName} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
