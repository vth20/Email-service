declare namespace Types {
  import { Component } from "react";
  import { FieldValues, UseFormRegister } from "react-hook-form";
  export type FormInputProps<T extends FieldValues> = {
    label: string;
    type?: string;
    name: keyof T;
    // deno-lint-ignore no-explicit-any
    rules?: Record<string, any>;
    placeholder?: string;
    defaultValue?: string;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    register: UseFormRegister<T>;
  } & React.InputHTMLAttributes<HTMLInputElement>;
  export interface IRoute {
    key: number;
    path: string;
    component: Component;
    layout?: Component;
    isProtected?: boolean;
    isAdmin?: boolean;
  }
}
