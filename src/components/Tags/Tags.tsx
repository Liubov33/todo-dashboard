import React from "react";
import './styles.scss';

interface TagsProps {
  selectedTags: string[];
  availableTags?: string[];
  onTagChange: (tag: string) => void;
}

const defaultAvailableTags = ['daily', 'weekly', 'monthly'];

const Tags: React.FC<TagsProps> = ({
   selectedTags,
   availableTags = defaultAvailableTags,
   onTagChange,
 }) => {
  return (
    <div className="tags-container">
      {availableTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={isSelected ? 'selected' : ''}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};


export default Tags;
