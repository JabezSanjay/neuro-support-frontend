import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import axios from '../../axiosConfig';
import { toast } from 'react-toastify';

const MentorTicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const readTickets = async () => {
    setLoading(true);
    await axios.get('/mentor/read/ticket').then((res) => {
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
  const [status] = useState([
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ]);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [state, setState] = useState('');

  const [selectedTicket, setSelectedTicket] = useState(null);

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
          icon='pi pi-pencil'
          className='p-button-rounded p-button-outlined'
          aria-label='Submit'
          onClick={() => {
            setSelectedTicket(rowData);

            setModal(true);
          }}
        />
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
      <Dialog
        header='Change Status'
        visible={modal}
        style={{ width: '30vw' }}
        onHide={() => {
          setModal(false);
          setSelectedTicket(null);
        }}
      >
        <Dropdown
          value={state}
          optionValue='value'
          className='w-full'
          options={status}
          onChange={async (e) => {
            setState(e.target.value);
            await axios.post('/mentor/change/status/ticket', {
              status: e.target.value,
              createdFor: selectedTicket.createdFor,
            });
            setModal(false);
          }}
          optionLabel='label'
          placeholder='Select a role'
        />
      </Dialog>
    </div>
  );
};

export default MentorTicketTable;
