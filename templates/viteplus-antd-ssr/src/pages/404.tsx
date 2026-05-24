import { Result, Button } from 'antd';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      style={{
        background: 'none',
      }}
      subTitle={'Sorry, the page you visited does not exist!'}
      extra={
        <Link to="/">
          <Button type="primary">{'Back Home'}</Button>
        </Link>
      }
    />
  );
}
