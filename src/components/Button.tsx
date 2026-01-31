import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', href, className = '', onClick }) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-8 md:px-10 py-4 md:py-5 font-semibold text-base md:text-lg tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3d5a4f]';
  const variants: Record<'primary' | 'secondary', string> = {
    primary:
      'bg-gradient-to-r from-[#2d4a3e] to-[#5a8068] text-white shadow-lg hover:shadow-xl hover:scale-[1.03]',
    secondary:
      'bg-white text-[#2d4a3e] border border-gray-300 hover:border-[#3d5a4f] shadow-sm hover:shadow-md',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;