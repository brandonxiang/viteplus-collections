import { useLoaderData, Form, useNavigation } from 'react-router';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoLoaderData {
  todos: TodoItem[];
}

function Todo() {
  const { todos } = useLoaderData() as TodoLoaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div>
      <h1>待办</h1>

      <Form method="post" style={{ marginBottom: '20px' }}>
        <input type="hidden" name="action" value="add" />
        <input
          type="text"
          name="text"
          placeholder="Add a new todo..."
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </Form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            {todo.completed && <span> ✓</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
