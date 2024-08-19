import Markdown from "markdown-to-jsx";

type Props = {
  message: string;
  type: string;
};

const MessageBanner = ({ message, type }: Props) => {
  const getBackgroundColor = () => {
    if (type === "warn") {
      return "warn-container";
    }

    if (type === "info") {
      return "info-container";
    }

    if (type === "error") {
      return "error-container";
    }

    return "success-container";
  };

  if (!message) return <></>;

  return (
    <div
      className={`w-full flex justify-center items-center ${getBackgroundColor()} py-4`}
    >
      <Markdown>{message}</Markdown>
    </div>
  );
};

export default MessageBanner;
