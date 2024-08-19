import { ChangeEventHandler } from "react";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

const SimpleInput = ({ value, onChange, placeholder }: Props) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="input input-bordered h-[2vmax] max-w-[100%] text-center text-xs bg-black bg-opacity-[0.07] placeholder-white placeholder-opacity-[0.3] p-0"
  />
);

export default SimpleInput;
