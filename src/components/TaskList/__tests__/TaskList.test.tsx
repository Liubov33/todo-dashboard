import { render } from '@testing-library/react';

import TaskList from './../TaskList';

describe('TaskList', () => {
  const defaultProps = {
    tasks: [
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
        groupId: 'group-2',
        groupColor: '#B2DFDB',
      },
      {
        id: 'task-3',
        content: 'Task 3',
        completed: true,
        groupId: 'group-2',
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

  test('renders all tasks grouped by group and passes props to TaskGroupItem', () => {
    const { container } = render(<TaskList {...defaultProps} />);

    const groupItems = container.querySelectorAll('.task-group');
    expect(groupItems).toHaveLength(2);
    expect(groupItems[0]).toHaveTextContent('Task 1');
    expect(groupItems[1]).toHaveTextContent('Task 2');
  });

  test('renders nothing when tasks array is empty', () => {
    const props = { ...defaultProps, tasks: [] };
    const { container } = render(<TaskList {...props} />);

    const groupItems = container.querySelectorAll('.task-group');
    expect(groupItems).toHaveLength(0);
  });
});
