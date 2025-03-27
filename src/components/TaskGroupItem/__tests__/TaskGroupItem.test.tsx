import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import TaskGroupItem from './../TaskGroupItem';

describe('TaskGroupItem', () => {
  const defaultProps = {
    group: [
      {
        id: 'task-1',
        content: 'Task 1',
        completed: false,
        groupId: 'group-1',
        groupColor: '#E1BEE7',
      },
      {
        id: 'task-2',
        content: 'Task 2',
        completed: true,
        groupId: 'group-1',
        groupColor: '#B2DFDB',
      },
    ],
    onToggle: jest.fn(),
    onDeleteTask: jest.fn(),
    onDeleteGroup: jest.fn(),
    onUpdateContent: jest.fn(),
    onChangeBackground: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all tasks in the group and applies the group background color', () => {
    const { container, getByText } = render(
      <TaskGroupItem {...defaultProps} />,
    );

    defaultProps.group.forEach((task) => {
      expect(getByText(task.content)).toBeInTheDocument();
    });

    expect(container.firstChild).toHaveStyle(
      `background-color: ${defaultProps.group[0].groupColor}`,
    );
  });

  test('shows group footer (palette and delete icons) on hover', async () => {
    const { container } = render(<TaskGroupItem {...defaultProps} />);

    expect(container.querySelector('.palette-icon')).toBeNull();
    expect(container.querySelector('.delete-icon')).toBeNull();

    fireEvent.mouseEnter(container.firstChild as Element);

    await waitFor(() => {
      expect(container.querySelector('.palette-icon')).toBeInTheDocument();
      expect(container.querySelector('.delete-icon')).toBeInTheDocument();
    });
  });

  test('toggles ColorPicker when palette icon is clicked and calls onChangeBackground when a color is selected', async () => {
    const { container, getByText } = render(
      <TaskGroupItem {...defaultProps} />,
    );

    fireEvent.mouseEnter(container.firstChild as Element);

    await waitFor(() => {
      expect(container.querySelector('.palette-icon')).toBeInTheDocument();
    });

    const paletteIcon = container.querySelector('.palette-icon') as HTMLElement;
    fireEvent.click(paletteIcon);

    const colorPicker = container.querySelector('.color-picker-wrapper');
    await waitFor(() => {
      expect(colorPicker).toBeInTheDocument();
    });

    const colorOption = colorPicker!.firstChild as HTMLElement;
    fireEvent.click(colorOption);

    expect(defaultProps.onChangeBackground).toHaveBeenCalledWith(
      defaultProps.group[0].groupId,
      '#F9F9F9',
    );

    await waitFor(() => {
      expect(container.querySelector('.color-picker-wrapper')).toBeNull();
    });
  });

  test('calls onDeleteGroup when delete icon is clicked', async () => {
    const { container, getByText } = render(
      <TaskGroupItem {...defaultProps} />,
    );

    fireEvent.mouseEnter(container.firstChild as Element);

    await waitFor(() => {
      expect(container.querySelector('.delete-icon')).toBeInTheDocument();
    });

    const deleteIcon = container.querySelector('.delete-icon') as HTMLElement;
    fireEvent.click(deleteIcon);

    expect(defaultProps.onDeleteGroup).toHaveBeenCalledWith(
      defaultProps.group[0].groupId,
    );

    fireEvent.mouseOut(container.firstChild as Element);
    expect(container.querySelector('.delete-icon')).toBeNull();
  });
});
