import { ButtonProps } from '../../../domain/models/ui/ButtonType';

const Button: React.FC<ButtonProps> = ({ label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#C5D3E8] text-gray-800 py-3 rounded hover:bg-[#A6AEBF] transition text-center ${
        isActive ? 'bg-[#A6AEBF]' : ''
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
