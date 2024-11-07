import { FileActionButtonProps } from '../../../domain/models/ui/FileButtonType';

const FileActionButton: React.FC<FileActionButtonProps> = ({
  onClick,
  text,
  bgColor,
  hoverColor,
}) => (
  <button
    onClick={onClick}
    className={`rounded-lg px-4 py-2 text-white ${bgColor} hover:${hoverColor} transition duration-200 mt-5`}
  >
    {text}
  </button>
);

export default FileActionButton;
