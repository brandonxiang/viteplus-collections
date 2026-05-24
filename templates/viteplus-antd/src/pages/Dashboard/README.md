# Dashboard Page

This dashboard page demonstrates various chart types using AntV G2 charting library with Ant Design components.

## Features

### 📊 Statistics Cards

- **Total Revenue**: Displays revenue with trend indicator
- **Total Users**: Shows user count with growth percentage
- **Total Orders**: Order statistics with change indicator
- **Conversion Rate**: Current conversion rate metric

### 📈 Charts

#### 1. Line Chart - Revenue & Cost Trend

- Multi-line chart showing revenue vs cost over 12 months
- Interactive tooltips
- Custom color scheme
- Legend for easy identification

#### 2. Pie Chart - Device Distribution

- Donut chart showing device type distribution
- Percentage labels outside the chart
- Interactive hover effects
- Right-aligned legend

#### 3. Bar Chart - Sales by Category

- Category-wise sales comparison
- Color-coded bars
- Top labels showing exact values
- Six product categories

#### 4. Area Chart - Product Performance

- Stacked area chart for quarterly product performance
- Three product lines
- Smooth area fills with opacity
- Quarterly comparison

## Technology Stack

- **@antv/g2**: Professional visualization library (v5.4.1)
- **Ant Design**: UI component library
- **React**: Frontend framework
- **TypeScript**: Type safety

## Chart Configuration Examples

### Line Chart

```typescript
chart.options({
  type: 'line',
  data: [...],
  encode: {
    x: 'month',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'fold', fields: ['revenue', 'cost'], key: 'type', value: 'value' }],
});
```

### Pie Chart (Donut)

```typescript
chart.options({
  type: 'interval',
  coordinate: { type: 'theta', outerRadius: 0.8, innerRadius: 0.5 },
  encode: {
    y: 'value',
    color: 'type',
  },
});
```

### Bar Chart

```typescript
chart.options({
  type: 'interval',
  data: [...],
  encode: {
    x: 'category',
    y: 'sales',
    color: 'category',
  },
});
```

### Area Chart (Stacked)

```typescript
chart.options({
  type: 'area',
  data: [...],
  encode: {
    x: 'quarter',
    y: 'value',
    color: 'category',
  },
  transform: [{ type: 'stackY' }],
});
```

## Responsive Design

The dashboard is fully responsive:

- **Desktop**: 4-column layout for stats, 2-column for charts
- **Tablet**: 2-column layout for stats
- **Mobile**: Single column layout with optimized padding

## Dark Mode Support

The dashboard includes CSS media queries for automatic dark mode support based on system preferences.

## Customization

You can easily customize:

- Chart colors via `scale.color.range`
- Chart dimensions via container style
- Data by replacing the mock data arrays
- Legends and axes via configuration options

## API Integration

To connect with real APIs, replace the static data arrays with:

```typescript
useEffect(() => {
  fetch('/api/dashboard/revenue')
    .then((res) => res.json())
    .then((data) => {
      // Update chart with real data
      chart.changeData(data);
    });
}, []);
```

## Performance Notes

- Each chart is destroyed on component unmount to prevent memory leaks
- Charts use `autoFit: true` for automatic resizing
- Efficient re-rendering with proper useEffect dependencies
