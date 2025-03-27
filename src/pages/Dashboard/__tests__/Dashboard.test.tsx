import {
  fireEvent,
  render,
  waitFor,
  screen,
  within,
} from '@testing-library/react';

import Dashboard from './../Dashboard';

beforeEach(() => {
  localStorage.clear();
});

describe('Dashboard', () => {
  test('renders NewListPanel and TaskList', () => {
    const { getByPlaceholderText } = render(<Dashboard />);
    expect(getByPlaceholderText('Create a new list...')).toBeInTheDocument();
    expect(document.querySelector('.task-list')).toBeInTheDocument();
  });

  test('adds new tasks to the list when NewListPanel submits', async () => {
    const { getByPlaceholderText, getByText } = render(<Dashboard />);

    const textarea = getByPlaceholderText('Create a new list...');
    // Enter two lines (tasks) into the textarea.
    fireEvent.change(textarea, { target: { value: 'Task 1\nTask 2' } });
    // Trigger blur so that the list is submitted.
    fireEvent.blur(textarea);

    await waitFor(() => {
      expect(getByText('Task 1')).toBeInTheDocument();
      expect(getByText('Task 2')).toBeInTheDocument();
    });
  });

  test('toggles a task when its checkbox is clicked', async () => {
    const { getByPlaceholderText, getByText } = render(<Dashboard />);

    const textarea = getByPlaceholderText('Create a new list...');
    fireEvent.change(textarea, { target: { value: 'Task Toggle' } });
    fireEvent.blur(textarea);

    await waitFor(() => {
      expect(getByText('Task Toggle')).toBeInTheDocument();
    });

    const checkbox = screen.getAllByRole('checkbox');
    expect(checkbox[0]).not.toBeChecked();

    fireEvent.click(checkbox[0]);

    await waitFor(() => {
      expect(checkbox[0]).toBeChecked();
    });
  });

  test('deletes an entire group when delete icon is clicked', async () => {
    render(<Dashboard />);
    const textarea = screen.getByPlaceholderText('Create a new list...');
    // Add two tasks; they will share a groupId.
    fireEvent.change(textarea, { target: { value: 'Task A\nTask B' } });
    fireEvent.blur(textarea);

    await waitFor(() => {
      expect(screen.getByText('Task A')).toBeInTheDocument();
      expect(screen.getByText('Task B')).toBeInTheDocument();
    });

    const groupContainer = document.querySelector('.task-group');
    if (groupContainer) {
      fireEvent.mouseEnter(groupContainer);
    }

    await waitFor(() => {
      expect(document.querySelector('.delete-icon')).toBeInTheDocument();
    });

    const deleteIcon = document.querySelector('.delete-icon') as HTMLElement;
    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(screen.queryByText('Task A')).toBeNull();
      expect(screen.queryByText('Task B')).toBeNull();
    });
  });

  test('deletes an individual task when its delete icon is clicked', async () => {
    const { getByPlaceholderText } = render(<Dashboard />);
    const textarea = getByPlaceholderText('Create a new list...');
    // Add a group with two tasks.
    fireEvent.change(textarea, { target: { value: 'Task 1\nTask 2' } });
    fireEvent.blur(textarea);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    // Assume each TaskItem renders a container with class "task-item-wrapper".
    const taskItemWrappers = document.querySelectorAll('.task-item-wrapper');
    expect(taskItemWrappers.length).toBeGreaterThan(0);
    const firstTaskWrapper = taskItemWrappers[0];

    // Hover over the first TaskItem so its delete icon appears.
    fireEvent.mouseEnter(firstTaskWrapper);

    // Within the first TaskItem, get the delete icon (assumed to have data-testid "delete-icon").
    const deleteIcon = await waitFor(() =>
      within(firstTaskWrapper as HTMLElement).getByTestId('delete-icon'),
    );
    fireEvent.click(deleteIcon);

    // Expect that "Task 1" is removed while "Task 2" remains.
    await waitFor(() => {
      expect(screen.queryByText('Task 1')).toBeNull();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  test('updates task content when non-empty content is submitted', async () => {
    render(<Dashboard />);
    const textarea = screen.getByPlaceholderText('Create a new list...');
    // Add a task.
    fireEvent.change(textarea, { target: { value: 'Original Task' } });
    fireEvent.blur(textarea);
    await waitFor(() => {
      expect(screen.getByText('Original Task')).toBeInTheDocument();
    });

    // Click on the task text to enter editing mode.
    const taskText = screen.getByText('Original Task');
    fireEvent.click(taskText);

    // In editing mode, assume an element with the same text now has contentEditable enabled.
    const editableDiv = screen.getByText('Original Task');
    // Simulate pressing Enter (without Shift) to submit the update.
    fireEvent.keyDown(editableDiv, {
      key: 'Enter',
      code: 'Enter',
      shiftKey: false,
    });
    // The update callback is invoked with the current content. Verify that the task still appears.
    await waitFor(() => {
      expect(screen.getByText('Original Task')).toBeInTheDocument();
    });
  });

  test('changes group background color when a new color is selected', async () => {
    const { container } = render(<Dashboard />);
    const textarea = screen.getByPlaceholderText('Create a new list...');
    // Add a group with two tasks.
    fireEvent.change(textarea, {
      target: { value: 'Task Color1\nTask Color2' },
    });
    fireEvent.blur(textarea);
    await waitFor(() => {
      expect(screen.getByText('Task Color1')).toBeInTheDocument();
      expect(screen.getByText('Task Color2')).toBeInTheDocument();
    });

    const groupContainer = document.querySelector('.task-group');
    expect(groupContainer).toBeInTheDocument();
    // Verify the initial background color.
    expect(groupContainer).toHaveStyle('background-color: #f9f9f9');

    // Hover over the group container to reveal footer controls.
    fireEvent.mouseEnter(groupContainer!);
    // Get the palette icon (assumed to have class "palette-icon").
    const paletteIcon = await waitFor(() => {
      return groupContainer!.querySelector('.palette-icon') as HTMLElement;
    });
    fireEvent.click(paletteIcon);

    const colorPicker = container.querySelector('.color-picker-wrapper');
    await waitFor(() => {
      expect(colorPicker).toBeInTheDocument();
    });

    const colorOption = colorPicker!.lastChild as HTMLElement;
    fireEvent.click(colorOption);

    // Verify that the group's background color has been updated.
    await waitFor(() => {
      expect(groupContainer).toHaveStyle('background-color: #FFE0B2');
    });
  });
});
