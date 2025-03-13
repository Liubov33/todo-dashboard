import React from 'react';
import { ReactComponent as CheckmarkIcon } from './../../icons/checkmark.svg';
import './styles.scss';

interface ColorPickerProps {
  selectedColor?: string;
  onSelectColor: (color: string) => void;
}

const defaultColors = [
  '#F9F9F9',
  '#F8BBD0',
  '#E1BEE7',
  '#C5CAE9',
  '#BBDEFB',
  '#B2DFDB',
  '#FFE0B2',
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="color-picker-wrapper">
      {defaultColors.map((color) => (
        <div
          key={color}
          className={`${selectedColor === color ? 'color selected' : 'color'}`}
          onClick={() => onSelectColor(color)}
          style={{ backgroundColor: color }}
        >
          {selectedColor === color && <CheckmarkIcon className="checkmark" />}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
