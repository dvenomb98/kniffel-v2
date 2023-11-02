import React, { FC, ReactNode } from 'react';

interface ScoreLayoutProps {
  children: ReactNode;
}

const ScoreLayout: FC<ScoreLayoutProps> = ({ children }) => {
  return <ul className="flex flex-col gap-2">{children}</ul>;
};

export default ScoreLayout;