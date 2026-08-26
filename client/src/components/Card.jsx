import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  glow = false,
  gradientBorder = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl bg-dark-800/80 border border-slate-800/80 p-6 
        backdrop-blur-md transition-all duration-300
        ${hover ? 'hover:border-slate-700 hover:bg-dark-800 hover:-translate-y-1 hover:shadow-xl' : ''}
        ${glow ? 'shadow-glow border-brand-500/30' : ''}
        ${gradientBorder ? 'before:absolute before:-inset-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-brand-500 before:to-sky-500 before:-z-10 before:opacity-30' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
