import * as React from 'react';

interface Props {
    projectId: string;
    userId?: string;
}
declare const Widget: ({ userId, projectId }: Props) => JSX.Element;

declare type FeedbackBase = {
    userId?: string | null;
    projectId: string;
    lang?: string;
    metadata?: Record<string, string | null | undefined | number>;
    domain?: string;
};

interface ConnectButtonProps extends React.ComponentProps<"button">, FeedbackBase {
    theme?: string;
}
declare const ConnectButton: ({ children, onClick, ...props }: ConnectButtonProps) => JSX.Element;

export { ConnectButton, Widget };
