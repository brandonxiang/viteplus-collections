import { Button, Result } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useState } from 'react';

export interface FormDatePickerProps {
  itemName: string;
  form: FormInstance;
  required?: boolean;
  limit?: number;
}

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <Result
        status="info"
        title={`Welcome to admin platform! ${count}`}
        subTitle="Please choose the menu on the left side!"
      />
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </Button>
    </div>
  );
};

export default Home;
