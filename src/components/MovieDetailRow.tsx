import { FC } from "react";

interface MovieDetailRowProps {
  label: string;
  value: string | number;
  className?: string;
}

const MovieDetailRow: FC<MovieDetailRowProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <p>
      <span className="font-bold">{label}: </span>
      <span className={`text-gray-300 ${className}`}>{value}</span>
    </p>
  );
};

export default MovieDetailRow;
