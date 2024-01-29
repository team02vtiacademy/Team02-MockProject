import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-nextgen";
import paginationFactory from "react-bootstrap-table-nextgen-paginator";
import ToolkitProvider from 'react-bootstrap-table-nextgen-toolkit';

import { connect } from "react-redux";
import { selectSchedules,selectPage,selectSize,selectTotalSize,selectSelectedRows } from "../../redux/selectors/ScheduleSelector";
import {getListScheduleAction} from "../../redux/actions/ScheduleActions";
import { updateSelectedRowsAction } from "../../redux/actions/ScheduleActions";
import ScheduleApi from "../../api/ScheduleApi";
// import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
import { toastr } from "react-redux-toastr";
import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup';

import { TextInput } from "../../custom_/Text";

// import { ReactstrapInput } from "reactstrap-formik";
// import * as Yup from 'yup';


//import filterFactory, { customFilter } from 'react-bootstrap-table-nextgen-filter';
// import { FastField, Form, Formik } from "formik";
// import { ReactstrapInput } from "reactstrap-formik";
// import * as Yup from 'yup';
// import { toastr } from "react-redux-toastr";

// import AddAccount from '../acount/AddAccountAdmin';

const Schedule = (props) =>{
  const getListSchedule = props.getListScheduleAction;
  const size = props.size;


  useEffect(() =>{
    const getAllSchedule = async() =>{
      const result = await ScheduleApi.getAllSchedules(1, size);
      const schedules = result.content;
      const totalSize = result.totalElements;
      getListSchedule(schedules,1,totalSize);
    }
    getAllSchedule();
  },[getListSchedule,size]);

//create edit button component
const actionFormatter = (cell, row, rowIndex) => {
  return (
    <Icon.Edit2 size={16} className="align-middle mr-2" />
  );
};

const tableColumns = [
  {
    dataField: "seatNumber",
    text: "Seat number",
    sort: true
  },
  {
    dataField: "timeSlot",
    text: "Time slot",
    sort: true
  },
 
  {
    dataField: "action",
    text: "Action",
    formatter: actionFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px' };
    },
    align: () => {
      return 'center';
    },
  }
];


  const handleTableChange = async (type, { page ,sizePerPage,sortField, sortOrder }) => {
    //sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'scheduleId'
      sortOrder = 'desc';
    }
  
    // // filter
    // const filter = filters && filters.totalMember && filters.totalMember.filterVal ? filters.totalMember.filterVal : null;
    // const minTotalMember = filter && filter.minTotalMember ? filter.minTotalMember : null;
    // const maxTotalMember = filter && filter.maxTotalMember ? filter.maxTotalMember : null;
  
    //get data from api
    const result = await ScheduleApi.getAllSchedules(page, size,sortField,sortOrder);
    const schedules = result.content;
    const totalSize = result.totalElements;
    //update group data to store
    getListSchedule(schedules, page, totalSize);
  }
  
    // filter component visibility
    // const [isVisiableFilter, setVisiableFilter] = useState(false);

    // const handleChangeFilter = (minTotalMember, maxTotalMember) => {
    //   onTotalMemberFilter({
    //     minTotalMember,
    //     maxTotalMember
    //   });
    // }


  // create
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  

  // refresh form
  const refreshForm = () => {

    window.location.reload();

    // refresh selected rows
    props.updateSelectedRowsAction([]);

    //refresh table 
    handleTableChange(null,
      {
        page: 1,
        sortField: null,
        sortOrder: null,
        // searchText: null,
        filters: null
      }
    );
  }

    const showSuccessNotification = (title, message) => {
      const options = {
        timeOut: 3000,
        showCloseButton: false,
        progressBar: false,
        position: "top-right"
      };
      // show notification
      toastr.success(title, message, options);
    }
    const showErrorNotification = (title, message) => {
      const options = {
        timeOut: 3000,
        showCloseButton: false,
        progressBar: false,
        position: "top-right"
      };
  
      // show notification
      toastr.error(title, message, options);
    }

     //handle select row
  const handleOnSelect = (row, isSelect) => {

    let selected = props.selectedRows;
 
    if (isSelect) {
      selected = [...props.selectedRows, row.scheduleId]
    } else {
      selected = props.selectedRows.filter(x => x !== row.scheduleId)
    }
    console.log(selected);
    props.updateSelectedRowsAction(selected);
  }

  //handle select all rows
  const handleOnSelectAll = (isSelect, rows) => {

    let selected = props.selectedRows;

    const scheduleIds = rows.map(r => r.scheduleId);
    if (isSelect) {
      selected = scheduleIds
    } else {
      selected = []
    }
    console.log(selected);

    props.updateSelectedRowsAction(selected);
  }
    const handleDeleteConfirm  = async () => {
    
      try {
        await ScheduleApi.deleteByscheduleIds(props.selectedRows);
        setOpenModalDelete(false);
        showSuccessNotification(
          "Delete Schedule",
          "Đã xóa thành công!");
        refreshForm();
      } catch (error) {
        console.log(error);
        // redirect page error server
        props.history.push("/500");
      }
    }
    const handleDeleteCancel =() =>{
      setOpenModalDelete(false);
    };

   return (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Schedule Management</h1>

    <Row>
      <Col>
        <Card>
          
          <CardBody>
          <ToolkitProvider
          keyField="scheduleId"
          data={props.schedules}
          columns={tableColumns}
          // search
        >
          {
            toolkitprops => (
            <React.Fragment>
               {/* Filter */}
               {
              //   isVisiableFilter &&
              //   <Row>
              //     <Col lg="12">
              //       <CustomFilter handleChangeFilter={handleChangeFilter} />
              //     </Col>
              //   </Row>
              }
              {/* Search */}
              <Row style={{ alignItems: "center" }}>
                <Col lg="3">
                  
                </Col>
                <Col lg="9"> 
                  <div className="float-right pull-right">
                    <Icon.RefreshCcw type="button" className="align-middle mr-3" size={24} onClick={refreshForm}/>
                    <Icon.PlusCircle type="button" className="align-middle mr-3" />
                    <Icon.Trash2 type="button" className="align-middle mr-3" onClick={() =>{ if (props.selectedRows.length !== 0) {setOpenModalDelete(true)}else{showErrorNotification(
                      "Delete Schedule",
                      "Bạn hãy chọn schedule cần xóa!!!"
                    );}}}/>
                  </div>
                </Col>
              </Row>
              <BootstrapTable
              {...toolkitprops.baseProps}
              striped
              hover
              remote
              bootstrap4
              bordered={true}
              pagination={paginationFactory({
                page: props.page,
                sizePerPage: props.size,
                totalSize: props.totalSize,

                nextPageText:'Next',
                prePageText:'Prev',

                // withFirstAndLast: false,
                alwaysShowAllBtns: true,
                hideSizePerPage:true
              })}
              selectRow={{
                mode: 'checkbox',
                clickToSelect: true,
                selected: props.selectedRows,
                onSelect: handleOnSelect,
                onSelectAll: handleOnSelectAll
              }}
              onTableChange={handleTableChange}
            />
            </React.Fragment>
            )
          }
        </ToolkitProvider>
          </CardBody>
        </Card>
      </Col>

    </Row> 


    <Modal isOpen={isOpenModalDelete}>
     
        
          {/* header */}
          <ModalHeader>Delete Group</ModalHeader>

          {/* body */}
          <ModalBody className="m-3">

            
                <h2>Bạn có chắc chắn muốn xóa không ?</h2>
              

          </ModalBody>

          {/* footer */}
          <ModalFooter>
            <Button  color="primary" onClick={handleDeleteConfirm}>
              Xóa
            </Button>{" "}

            <Button color="primary" onClick={handleDeleteCancel}>
              Hủy
            </Button>
          </ModalFooter>
  </Modal>


  </Container>
)};
const mapGlobalStateToProps = state => {
  return {
    schedules: selectSchedules(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state),
  };
};
export default connect(mapGlobalStateToProps,{getListScheduleAction,updateSelectedRowsAction})(Schedule);
 