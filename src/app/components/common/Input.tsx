import { ChangeEventHandler } from "react";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type: string;
  placeholder: string;
  title: string;
  required: boolean;
  helperText?: string;
  textarea?: boolean;
  readonly?: boolean;
  onBlur?: () => void;
  error?: boolean;
};

const Input = ({
  textarea,
  type,
  value,
  onBlur,
  required,
  title,
  placeholder,
  helperText,
  readonly,
  onChange,
  error,
}: Props) => {
  const getTextType = () => {
    if (textarea) {
      return (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readonly}
          className="textarea textarea-bordered textarea-lg w-full bg-black bg-opacity-[0.07] placeholder-white placeholder-opacity-[0.3] h-full text-xs"
        ></textarea>
      );
    }

    return (
      <input
        type={type}
        value={value}
        readOnly={readonly}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="input input-bordered h-10 text-base bg-black bg-opacity-[0.07] placeholder-white placeholder-opacity-[0.3] backdrop-container"
      />
    );
  };

  return (
    <div className="flex flex-col w-full">
      <p
        className={`${title.length > 40 ? "text-tiny" : "text-xs"} text-white`}
      >
        {title}
        {required && <sup>*</sup>}
      </p>
      {getTextType()}
      {helperText && (
        <p className={`text-tiny ${error && "text-red"}`}>{helperText}</p>
      )}
    </div>
  );
};

export default Input;
