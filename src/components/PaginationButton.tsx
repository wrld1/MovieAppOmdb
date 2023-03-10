import { FC } from "react";

interface PaginationButtonProps {
  buttonText: string;
  onClickHandler: () => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  buttonText,
  onClickHandler,
}) => {
  return (
    <button
      className="rounded-lg bg-white text-black w-36 py-2 font-bold mx-2"
      onClick={onClickHandler}
    >
      {buttonText}
    </button>
  );
};

export default PaginationButton;
