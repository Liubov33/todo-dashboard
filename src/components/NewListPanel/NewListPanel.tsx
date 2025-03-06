import React, { useState } from 'react';
import './styles.scss';

interface NewListPanelProps {
  onAddList: (lines: string[]) => void;
}

const NewListPanel: React.FC<NewListPanelProps> = ({ onAddList }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (lines.length > 0) {
      onAddList(lines);
    }
    setText('');
  };

  return (
    <div className="new-list-panel">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleSubmit}
        placeholder="Create a new list..."
        rows={3}
      />
    </div>
  );
};

export default NewListPanel;
