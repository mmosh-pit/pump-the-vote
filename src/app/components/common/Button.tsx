type Props = {
  title: string;
  action: () => void;
  isPrimary: boolean;
  isLoading: boolean;
  size: "small" | "large";
  disabled?: boolean;
};

const Button = ({
  isLoading,
  action,
  title,
  isPrimary,
  size,
  disabled,
}: Props) => (
  <button
    className={`${isPrimary ? "bg-[#CD068E]" : "bg-[#6536BB]"} ${size === "small" ? "py-2 px-4" : "w-full py-4 px-8"} rounded-md flex items-center justify-center text-center ${disabled && "opacity-70"}`}
    onClick={action}
    disabled={disabled}
  >
    {isLoading ? (
      <span className="loading loading-spinner loading-lg bg-[#BEEF00]"></span>
    ) : (
      <p
        className={`text-white ${size === "small" ? "text-sm" : "text-base"} text-center`}
      >
        {title}
      </p>
    )}
  </button>
);

export default Button;
