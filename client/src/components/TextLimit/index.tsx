interface TextLimitProps {
  text: string;
  limit: number;
}

const TextLimit = ({ text, limit }: TextLimitProps) => {
  if (text.length <= limit) {
    return <span>{text}</span>;
  } else {
    const truncatedText = text.slice(0, limit) + "...";
    return <span title={text}>{truncatedText}</span>;
  }
};

export default TextLimit;
