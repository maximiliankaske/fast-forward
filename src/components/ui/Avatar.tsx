import cn from "classnames";
import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  name: string;
  some: string;
}

const Avatar: FC<Props> = ({ imgSrc, name, some, className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex-shrink-0">
        <span className="sr-only">{name}</span>
        <Image
          className="h-10 w-10 rounded-full bg-gray-200"
          src={imgSrc}
          alt="author picture"
          height={40}
          width={40}
        />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
          {name}
        </p>
        <div className="flex space-x-1 text-sm text-gray-500">
          <span>{some}</span>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
