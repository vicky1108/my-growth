interface LoginButtonProps {
  onClick: () => void;
  className: string;
}

export const LoginButton = ({ onClick, className }: LoginButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      Login
    </button>
  );
};


