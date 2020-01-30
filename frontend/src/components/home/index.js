import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { fetchPagesAction } from '../../actions/page-actions';
import './index.scss';
const Home = (props) => {
  const { PageReducer: { pages } } = props;
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    // init fetch all pages from odoo
    props.fetchPagesAction(() => {
      setLoading(false);
    });

  } ,[]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }
  ];

  return (
    <div id="homepage">
      <h2>Welcome to odoo-react integration - feature/LRG-432 Branch ....</h2>
      <p>List of pages fetched from odoo instance</p>
      <Spin tip="Loading..." spinning={loading}>
        <Table bordered dataSource={pages} columns={columns} />
      </Spin>
    </div>
  );
};

const mapStateToProps = ({ PageReducer }) => ({ PageReducer });
export default connect(mapStateToProps, {fetchPagesAction})(Home);