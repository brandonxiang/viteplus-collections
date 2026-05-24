import { useLoaderData } from 'react-router';

interface HomeLoaderData {
  message: string;
}

function Home() {
  const { message } = useLoaderData() as HomeLoaderData;

  return (
    <div>
      <h1>首页</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;
