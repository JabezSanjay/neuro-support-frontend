import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';

// import "../TasksTable/TasksTable.css";
// import api from "../../../axiosConfig";

const MentorTicketTable = ({ tickets }) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [loading, setLoading] = useState(false);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className='flex justify-between items-center mt-3 flex-wrap'>
        <h5 className='m-0 mb-6'>Tickets</h5>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder='Search User'
          />
        </span>
      </div>
    );
  };

  const ActionTemplate = (rowData) => {
    return (
      <div>
        {rowData?.course?.map((item) => {
          console.log('item', item);
          return (
            <ul key={item}>
              <li>{item}</li>
            </ul>
          );
        })}
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className='datatable-doc-demo mt-10'>
      <div className='card'>
        <DataTable
          value={tickets}
          paginator
          className='p-datatable-customers'
          header={header}
          rows={10}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          rowsPerPageOptions={[10, 25, 50]}
          dataKey='_id'
          rowHover
          loading={loading}
          filters={filters}
          filterDisplay='menu'
          responsiveLayout='scroll'
          globalFilterFields={['name', 'email', 'role']}
          emptyMessage='No users found'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
        >
          <Column
            field='name'
            header='Name'
            sortable
            style={{ minWidth: '14rem' }}
          />
          <Column
            field='email'
            header='Email'
            sortable
            style={{ minWidth: '14rem' }}
          />
          <Column
            field='role'
            header='Role'
            sortable
            style={{ minWidth: '14rem' }}
          />
          <Column
            header='Courses'
            sortable
            style={{ minWidth: '14rem' }}
            body={ActionTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default MentorTicketTable;
