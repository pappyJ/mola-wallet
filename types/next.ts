import type { AppProps } from "next/app";
import type { NextPage } from "next";
import React from "react";

export type NextPageX = NextPage & {
  Layout?: ({
    children,
    ...layoutProps
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => JSX.Element;
  LayoutProps?: { [key: string]: any };
};
export type AppPropsX = AppProps & {
  Component: NextPageX;
};
