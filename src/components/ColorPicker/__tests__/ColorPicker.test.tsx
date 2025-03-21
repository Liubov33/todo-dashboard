import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ColorPicker, { defaultColors } from './../ColorPicker';

describe('ColorPicker', () => {
  const defaultProps = {
    onSelectColor: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all default colors', () => {
    const { container } = render(<ColorPicker {...defaultProps} />);
    const colorDivs = container.querySelectorAll('.color');

    expect(colorDivs.length).toBe(defaultColors.length);
  });

  test('highlights selected color and shows checkmark icon', () => {
    const selectedColor = '#C5CAE9';
    const { container } = render(
      <ColorPicker {...defaultProps} selectedColor={selectedColor} />,
    );
    const selectedDiv = container.querySelector('.selected');

    expect(selectedDiv).toHaveClass('selected');
    expect(selectedDiv?.querySelector('.checkmark')).toBeInTheDocument();
  });

  test('calls onSelectColor when a color is clicked', () => {
    const { container } = render(<ColorPicker {...defaultProps} />);
    const colorDivs = container.querySelectorAll('.color');

    // Simulate clicking on the first color
    fireEvent.click(colorDivs[0]);
    expect(defaultProps.onSelectColor).toHaveBeenCalledWith(defaultColors[0]);
  });
});
