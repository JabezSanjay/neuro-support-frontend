import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from '../../axiosConfig';
import { toast } from 'react-toastify';

const StudentTicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const readTickets = async () => {
    setLoading(true);
    await axios.get('/student/read/ticket').then((res) => {
      if (res.data.success) {
        setTickets(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
    setLoading(false);
  };

  const [filters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    readTickets();
  }, [modal]);

  const renderHeader = () => {
    return (
      <div className='flex justify-between items-center mt-3 flex-wrap'>
        <h5 className='m-0 mb-6'>Tickets</h5>
      </div>
    );
  };

  const ActionTemplate = (rowData) => {
    return (
      <div>
        <Button
          className='p-button-outlined'
          aria-label='Submit'
          onClick={async () => {
            setLoading(true);
            await axios
              .post('/student/ask/update', {
                ticket: rowData,
              })
              .then((res) => {
                if (res.data.success) {
                  toast.success(res.data.message);
                } else {
                  toast.error(res.data.message);
                }
              });
            setLoading(false);
          }}
        >
          Ask for update
        </Button>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className='datatable-doc-demo mt-2 p-20'>
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
          emptyMessage='No Tickets found'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
        >
          <Column
            field='content'
            header='Content'
            sortable
            style={{ minWidth: '14rem' }}
          />
          <Column
            field='course'
            header='Course'
            sortable
            style={{ minWidth: '14rem' }}
          />
          <Column
            field='status'
            header='Status'
            sortable
            style={{ minWidth: '14rem' }}
          />
          <Column
            header='Actions'
            sortable
            style={{ minWidth: '14rem' }}
            body={ActionTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default StudentTicketTable;
