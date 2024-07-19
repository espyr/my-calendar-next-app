import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?:string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}
function mergeClasses(...classes:string[]){
    return classes.filter(Boolean).join(' ')
}
const Button = ({children, ...restProps}: ButtonProps) => {
  return (<button className='rounded-md px-5 py-2' {...restProps}>{children}</button>);
}

export default Button;
