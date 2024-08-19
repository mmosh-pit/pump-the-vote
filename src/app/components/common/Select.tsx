import { ChangeEventHandler } from "react";

type Options = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: Options[];
};

const Select = ({ value, options, onChange }: Props) => (
  <select
    className="select h-[2.5vmax] select-bordered bg-black bg-opacity-[0.07]"
    value={value}
    onChange={onChange}
  >
    {options.map((option) => (
      <option className="bg-black" value={option.value} key={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
