import { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Space,
  Modal,
  message,
  Popconfirm,
  Select,
  DatePicker,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';

const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  id: string;
  name: string;
  age: number;
  address: string;
  status: string;
  createdAt: string;
}

const TableList = () => {
  const [searchForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '1',
      id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      status: 'active',
      createdAt: '2024-01-01',
    },
    {
      key: '2',
      id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      status: 'active',
      createdAt: '2024-01-02',
    },
    {
      key: '3',
      id: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      status: 'inactive',
      createdAt: '2024-01-03',
    },
  ]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 3,
  });

  // Handle search
  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Search values:', values);
      message.success('Search completed');
      setLoading(false);
    }, 500);
  };

  // Handle reset search form
  const handleReset = () => {
    searchForm.resetFields();
    setPagination({ ...pagination, current: 1 });
  };

  // Handle add new record
  const handleAdd = () => {
    setModalType('add');
    setCurrentRecord(null);
    modalForm.resetFields();
    setModalVisible(true);
  };

  // Handle edit record
  const handleEdit = (record: DataType) => {
    setModalType('edit');
    setCurrentRecord(record);
    modalForm.setFieldsValue(record);
    setModalVisible(true);
  };

  // Handle delete record
  const handleDelete = (record: DataType) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newData = dataSource.filter((item) => item.key !== record.key);
      setDataSource(newData);
      setPagination({ ...pagination, total: pagination.total - 1 });
      message.success('Deleted successfully');
      setLoading(false);
    }, 500);
  };

  // Handle modal submit
  const handleModalOk = async () => {
    try {
      const values = await modalForm.validateFields();
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        if (modalType === 'add') {
          const newRecord: DataType = {
            key: String(Date.now()),
            id: String(Date.now()),
            ...values,
            createdAt: new Date().toISOString().split('T')[0],
          };
          setDataSource([...dataSource, newRecord]);
          setPagination({ ...pagination, total: pagination.total + 1 });
          message.success('Added successfully');
        } else {
          const newData = dataSource.map((item) =>
            item.key === currentRecord?.key ? { ...item, ...values } : item,
          );
          setDataSource(newData);
          message.success('Updated successfully');
        }
        setModalVisible(false);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle table change (pagination, filters, sorter)
  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
  };

  // Table columns configuration
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#999' }}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </span>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-list-page">
      {/* Search Form */}
      <Card className="search-card" bordered={false}>
        <Form form={searchForm} layout="inline" className="search-form">
          <Form.Item name="name" label="Name">
            <Input placeholder="Please enter name" allowClear />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select placeholder="Please select status" allowClear style={{ width: 150 }}>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="dateRange" label="Date Range">
            <RangePicker />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                loading={loading}
              >
                Search
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* Table Card */}
      <Card
        className="table-card"
        bordered={false}
        title="Data List"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add New
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={modalType === 'add' ? 'Add New Record' : 'Edit Record'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
        width={600}
      >
        <Form form={modalForm} layout="vertical" initialValues={{ status: 'active' }}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter age' }]}
          >
            <Input type="number" placeholder="Please enter age" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input.TextArea rows={3} placeholder="Please enter address" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Please select status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableList;
