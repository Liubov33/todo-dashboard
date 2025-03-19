import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskItem from './../TaskItem';

describe('TaskItem', () => {
  const defaultProps = {
    id: 'test-id',
    content: 'Test Task Content',
    completed: false,
    onToggle: jest.fn(),
    onUpdateContent: jest.fn(),
    onDeleteTask: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task content and checkbox', () => {
    render(<TaskItem {...defaultProps} />);

    expect(screen.getByText(defaultProps.content)).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(defaultProps.onToggle).toHaveBeenCalledWith(defaultProps.id);
  });

  test('switches to editing mode on text click and calls onUpdateContent on blur', () => {
    render(<TaskItem {...defaultProps} />);

    // Click on the text to switch to editing mode
    const textDiv = screen.getByText(defaultProps.content);
    fireEvent.click(textDiv);

    // The editable div should be rendered
    const editableDiv = screen.getByText(defaultProps.content);
    expect(editableDiv).toHaveAttribute('contenteditable', 'true');

    // Simulate blur event on the editable div
    fireEvent.blur(editableDiv);
    expect(defaultProps.onUpdateContent).toHaveBeenCalledWith(
      defaultProps.id,
      defaultProps.content,
    );
  });

  test('shows delete icon on hover and calls onDeleteTask on icon click', async () => {
    const { container } = render(<TaskItem {...defaultProps} />);

    // Initially, the delete icon should not be in the document
    expect(container.querySelector('svg.delete-icon')).toBeNull();

    // Hover over the wrapper to show the delete icon
    const wrapper = container.querySelector('.task-item-wrapper');
    if (wrapper) {
      userEvent.hover(wrapper);
    }

    // The delete icon should appear
    await waitFor(() => {
      const deleteIcon = screen.getByTestId('delete-icon');
      expect(deleteIcon).toBeInTheDocument();
    });

    // Click the delete icon
    const deleteIcon = container.querySelector('svg.delete-icon');
    if (deleteIcon) {
      await userEvent.click(deleteIcon);
    }
    expect(defaultProps.onDeleteTask).toHaveBeenCalledWith(defaultProps.id);
  });

  test('saves edited content when Enter is pressed without Shift', () => {
    render(<TaskItem {...defaultProps} />);

    // Switch to editing mode
    const textDiv = screen.getByText(defaultProps.content);
    fireEvent.click(textDiv);

    // The editable div should be rendered
    const editableDiv = screen.getByText(defaultProps.content);

    // Simulate keydown event with Enter key (without Shift)
    fireEvent.keyDown(editableDiv, {
      key: 'Enter',
      code: 'Enter',
      shiftKey: false,
    });
    expect(defaultProps.onUpdateContent).toHaveBeenCalledWith(
      defaultProps.id,
      defaultProps.content,
    );
  });
});
