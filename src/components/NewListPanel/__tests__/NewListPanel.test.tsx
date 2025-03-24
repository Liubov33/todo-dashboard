import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NewListPanel from './../NewListPanel';

describe('NewListPanel', () => {
  const defaultProps = {
    onAddList: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls onAddList with trimmed non-empty lines on blur', () => {
    const { getByPlaceholderText } = render(<NewListPanel {...defaultProps} />);

    const textarea = getByPlaceholderText('Create a new list...');
    // Input text with extra spaces and blank lines
    fireEvent.change(textarea, {
      target: { value: '  Line1 \n\n Line2   ' },
    });

    // Simulate blur to trigger handleSubmit
    fireEvent.blur(textarea);

    expect(defaultProps.onAddList).toHaveBeenCalledTimes(1);
    expect(defaultProps.onAddList).toHaveBeenCalledWith(['Line1', 'Line2']);

    // Check that textarea is reset after submission
    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });

  test('does not call onAddList if text has no valid lines', () => {
    const { getByPlaceholderText } = render(<NewListPanel {...defaultProps} />);

    const textarea = getByPlaceholderText('Create a new list...');
    // Input text that only contains spaces and blank lines
    fireEvent.change(textarea, {
      target: { value: '   \n    ' },
    });

    // Simulate blur to trigger handleSubmit
    fireEvent.blur(textarea);

    // onAddList should not be called since there are no valid lines
    expect(defaultProps.onAddList).not.toHaveBeenCalled();

    // Check that textarea is still reset
    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });
});
