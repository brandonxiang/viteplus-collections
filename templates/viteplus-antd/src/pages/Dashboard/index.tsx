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
import { Chart } from '@antv/g2';
import './index.scss';

const Dashboard = () => {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const areaChartRef = useRef<HTMLDivElement>(null);

  // Initialize Line Chart
  useEffect(() => {
    if (!lineChartRef.current) return;

    const chart = new Chart({
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

    void chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  // Initialize Bar Chart
  useEffect(() => {
    if (!barChartRef.current) return;

    const chart = new Chart({
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
      // @ts-expect-error - label property not in G2 types
      label: {
        text: 'sales',
        position: 'top',
        style: {
          fill: '#000',
        },
      },
    });

    void chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  // Initialize Pie Chart
  useEffect(() => {
    if (!pieChartRef.current) return;

    const chart = new Chart({
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
        // @ts-expect-error - label property not in G2 types
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
            valueFormatter: (d) => `${d}%`,
          },
        ],
      },
    });

    void chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  // Initialize Area Chart
  useEffect(() => {
    if (!areaChartRef.current) return;

    const chart = new Chart({
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

    void chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="dashboard-page">
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="stat-card">
            <Statistic
              title="Total Revenue"
              value={98500}
              precision={2}
              prefix={<DollarOutlined />}
              suffix={<ArrowUpOutlined style={{ color: '#3f8600' }} />}
              styles={{ content: { color: '#3f8600' } }}
            />
            <div className="stat-footer">
              <span>+12.5% from last month</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="stat-card">
            <Statistic
              title="Total Users"
              value={12458}
              prefix={<UserOutlined />}
              suffix={<ArrowUpOutlined style={{ color: '#3f8600' }} />}
              styles={{ content: { color: '#3f8600' } }}
            />
            <div className="stat-footer">
              <span>+8.3% from last month</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="stat-card">
            <Statistic
              title="Total Orders"
              value={3256}
              prefix={<ShoppingCartOutlined />}
              suffix={<ArrowDownOutlined style={{ color: '#cf1322' }} />}
              styles={{ content: { color: '#cf1322' } }}
            />
            <div className="stat-footer">
              <span>-2.1% from last month</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="stat-card">
            <Statistic
              title="Conversion Rate"
              value={3.24}
              precision={2}
              prefix={<LineChartOutlined />}
              suffix="%"
              styles={{ content: { color: '#1890ff' } }}
            />
            <div className="stat-footer">
              <span>+0.5% from last month</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card variant="borderless" title="Revenue & Cost Trend" className="chart-card">
            <div ref={lineChartRef} style={{ height: '350px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card variant="borderless" title="Device Distribution" className="chart-card">
            <div ref={pieChartRef} style={{ height: '350px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card variant="borderless" title="Sales by Category" className="chart-card">
            <div ref={barChartRef} style={{ height: '350px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card variant="borderless" title="Product Performance" className="chart-card">
            <div ref={areaChartRef} style={{ height: '350px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
