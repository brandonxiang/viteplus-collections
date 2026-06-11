import { useEffect, useRef } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import './index.scss';

const Dashboard = () => {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const areaChartRef = useRef<HTMLDivElement>(null);
  const loadChart = () => import('@antv/g2').then((module) => module.Chart);

  // Initialize Line Chart
  useEffect(() => {
    let chart: any;
    let isDisposed = false;
    const setupChart = async () => {
      if (!lineChartRef.current) return;
      const Chart = await loadChart();
      if (!lineChartRef.current || isDisposed) return;

      chart = new Chart({
        container: lineChartRef.current,
        autoFit: true,
      });

      const rawData = [
        { month: 'Jan', revenue: 3500, cost: 2800 },
        { month: 'Feb', revenue: 4200, cost: 3100 },
        { month: 'Mar', revenue: 3800, cost: 2900 },
        { month: 'Apr', revenue: 5100, cost: 3400 },
        { month: 'May', revenue: 4800, cost: 3300 },
        { month: 'Jun', revenue: 6200, cost: 3900 },
        { month: 'Jul', revenue: 7100, cost: 4200 },
        { month: 'Aug', revenue: 6800, cost: 4100 },
        { month: 'Sep', revenue: 7500, cost: 4500 },
        { month: 'Oct', revenue: 8200, cost: 4800 },
        { month: 'Nov', revenue: 9100, cost: 5200 },
        { month: 'Dec', revenue: 9800, cost: 5500 },
      ];
      const lineData = rawData.flatMap((d) => [
        { month: d.month, type: 'revenue', value: d.revenue },
        { month: d.month, type: 'cost', value: d.cost },
      ]);

      chart.options({
        type: 'line',
        data: lineData,
        encode: {
          x: 'month',
          y: 'value',
          color: 'type',
        },
        scale: {
          color: {
            range: ['#5B8FF9', '#F4664A'],
          },
        },
        axis: {
          x: { title: 'Month' },
          y: { title: 'Amount ($)' },
        },
        legend: {
          color: {
            title: false,
            position: 'top',
          },
        },
      });

      await chart.render();
    };
    void setupChart();
    return () => {
      isDisposed = true;
      chart?.destroy();
    };
  }, []);

  // Initialize Bar Chart
  useEffect(() => {
    let chart: any;
    let isDisposed = false;
    const setupChart = async () => {
      if (!barChartRef.current) return;
      const Chart = await loadChart();
      if (!barChartRef.current || isDisposed) return;

      chart = new Chart({
        container: barChartRef.current,
        autoFit: true,
      });

      chart.options({
        type: 'interval',
        data: [
          { category: 'Electronics', sales: 8500 },
          { category: 'Clothing', sales: 6200 },
          { category: 'Books', sales: 4300 },
          { category: 'Home', sales: 5800 },
          { category: 'Sports', sales: 3900 },
          { category: 'Toys', sales: 3200 },
        ],
        encode: {
          x: 'category',
          y: 'sales',
          color: 'category',
        },
        scale: {
          color: {
            range: ['#5B8FF9', '#61DDAA', '#F6BD16', '#F4664A', '#9270CA', '#FF99C3'],
          },
        },
        axis: {
          x: { title: 'Category' },
          y: { title: 'Sales ($)' },
        },
        legend: false,
        label: {
          text: 'sales',
          position: 'top',
          style: {
            fill: '#000',
          },
        },
      });

      await chart.render();
    };
    void setupChart();
    return () => {
      isDisposed = true;
      chart?.destroy();
    };
  }, []);

  // Initialize Pie Chart
  useEffect(() => {
    let chart: any;
    let isDisposed = false;
    const setupChart = async () => {
      if (!pieChartRef.current) return;
      const Chart = await loadChart();
      if (!pieChartRef.current || isDisposed) return;

      chart = new Chart({
        container: pieChartRef.current,
        autoFit: true,
      });

      chart.options({
        type: 'interval',
        data: [
          { type: 'Desktop', value: 45 },
          { type: 'Mobile', value: 35 },
          { type: 'Tablet', value: 15 },
          { type: 'Other', value: 5 },
        ],
        coordinate: { type: 'theta', outerRadius: 0.8, innerRadius: 0.5 },
        encode: {
          y: 'value',
          color: 'type',
        },
        scale: {
          color: {
            range: ['#5B8FF9', '#61DDAA', '#F6BD16', '#F4664A'],
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
          },
          label: {
            text: (d: { type: string; value: number }) => `${d.type}\n${d.value}%`,
            position: 'outside',
            style: {
              textAlign: 'center',
            },
          },
        },
        tooltip: {
          title: 'type',
          items: [
            {
              channel: 'y',
              valueFormatter: (d: number) => `${d}%`,
            },
          ],
        },
      });

      await chart.render();
    };
    void setupChart();
    return () => {
      isDisposed = true;
      chart?.destroy();
    };
  }, []);

  // Initialize Area Chart
  useEffect(() => {
    let chart: any;
    let isDisposed = false;
    const setupChart = async () => {
      if (!areaChartRef.current) return;
      const Chart = await loadChart();
      if (!areaChartRef.current || isDisposed) return;

      chart = new Chart({
        container: areaChartRef.current,
        autoFit: true,
      });

      chart.options({
        type: 'area',
        data: [
          { quarter: 'Q1', category: 'Product A', value: 502 },
          { quarter: 'Q1', category: 'Product B', value: 635 },
          { quarter: 'Q1', category: 'Product C', value: 809 },
          { quarter: 'Q2', category: 'Product A', value: 947 },
          { quarter: 'Q2', category: 'Product B', value: 1402 },
          { quarter: 'Q2', category: 'Product C', value: 1634 },
          { quarter: 'Q3', category: 'Product A', value: 1268 },
          { quarter: 'Q3', category: 'Product B', value: 1506 },
          { quarter: 'Q3', category: 'Product C', value: 1106 },
          { quarter: 'Q4', category: 'Product A', value: 1767 },
          { quarter: 'Q4', category: 'Product B', value: 1221 },
          { quarter: 'Q4', category: 'Product C', value: 1333 },
        ],
        encode: {
          x: 'quarter',
          y: 'value',
          color: 'category',
        },
        transform: [{ type: 'stackY' }],
        scale: {
          color: {
            range: ['#5B8FF9', '#61DDAA', '#F6BD16'],
          },
        },
        axis: {
          x: { title: 'Quarter' },
          y: { title: 'Sales Volume' },
        },
        legend: {
          color: {
            title: false,
            position: 'top',
          },
        },
        style: {
          fillOpacity: 0.6,
        },
      });

      await chart.render();
    };
    void setupChart();
    return () => {
      isDisposed = true;
      chart?.destroy();
    };
  }, []);

  return (
    <main className="dashboard-page">
      {/* Statistics Cards */}
      <section aria-label="Statistics overview">
        <Row gutter={[16, 16]} className="stats-row">
          <Col xs={24} sm={12} lg={6}>
            <Card variant="borderless" className="stat-card" aria-label="Total Revenue: $98,500">
              <Statistic
                title="Total Revenue"
                value={98500}
                precision={2}
                prefix={<DollarOutlined aria-hidden="true" />}
                suffix={<ArrowUpOutlined style={{ color: '#3f8600' }} aria-hidden="true" />}
                styles={{ content: { color: '#3f8600' } }}
              />
              <div className="stat-footer">
                <span>+12.5% from last month</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card variant="borderless" className="stat-card" aria-label="Total Users: 12,458">
              <Statistic
                title="Total Users"
                value={12458}
                prefix={<UserOutlined aria-hidden="true" />}
                suffix={<ArrowUpOutlined style={{ color: '#3f8600' }} aria-hidden="true" />}
                styles={{ content: { color: '#3f8600' } }}
              />
              <div className="stat-footer">
                <span>+8.3% from last month</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card variant="borderless" className="stat-card" aria-label="Total Orders: 3,256">
              <Statistic
                title="Total Orders"
                value={3256}
                prefix={<ShoppingCartOutlined aria-hidden="true" />}
                suffix={<ArrowDownOutlined style={{ color: '#cf1322' }} aria-hidden="true" />}
                styles={{ content: { color: '#cf1322' } }}
              />
              <div className="stat-footer">
                <span>-2.1% from last month</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card variant="borderless" className="stat-card" aria-label="Conversion Rate: 3.24%">
              <Statistic
                title="Conversion Rate"
                value={3.24}
                precision={2}
                prefix={<LineChartOutlined aria-hidden="true" />}
                suffix="%"
                styles={{ content: { color: '#1890ff' } }}
              />
              <div className="stat-footer">
                <span>+0.5% from last month</span>
              </div>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Charts Section */}
      <section aria-label="Charts">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card variant="borderless" title="Revenue & Cost Trend" className="chart-card">
              <div
                ref={lineChartRef}
                role="img"
                aria-label="Line chart showing revenue and cost trends over 12 months"
                style={{ height: '350px' }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card variant="borderless" title="Device Distribution" className="chart-card">
              <div
                ref={pieChartRef}
                role="img"
                aria-label="Pie chart showing device distribution: Desktop 45%, Mobile 35%, Tablet 15%, Other 5%"
                style={{ height: '350px' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card variant="borderless" title="Sales by Category" className="chart-card">
              <div
                ref={barChartRef}
                role="img"
                aria-label="Bar chart showing sales by category"
                style={{ height: '350px' }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card variant="borderless" title="Product Performance" className="chart-card">
              <div
                ref={areaChartRef}
                role="img"
                aria-label="Area chart showing product performance by quarter"
                style={{ height: '350px' }}
              />
            </Card>
          </Col>
        </Row>
      </section>
    </main>
  );
};

export default Dashboard;
