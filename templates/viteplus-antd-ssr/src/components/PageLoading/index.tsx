import { Spin } from 'antd';

export interface PageLoadingProps {
  tip?: string;
}

export const PageLoading = ({ tip }: PageLoadingProps) => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" tip={tip} />
  </div>
);
