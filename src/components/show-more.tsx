import { useState } from 'react';

interface ShowMoreProps {
  text: string;
  maxLength?: number;
}

const ShowMore = ({ text, maxLength = 250 }: ShowMoreProps) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <span>
      {showMore ? text : `${text.substring(0, maxLength)}...`}
      {text.length > maxLength && (
        <button
          className="ml-2 text-gray-500 font-normal focus:outline-none"
          onClick={toggleShowMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </span>
  );
};

export default ShowMore;
