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
import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

import { connect } from "react-redux";
import { selectUsers,selectPage,selectSize,selectTotalSize,selectSelectedRows } from "../../redux/selectors/UserSelector";
import {getListUserAction} from "../../redux/actions/UserActions";
import { updateSelectedRowsAction } from "../../redux/actions/UserActions";
import UserApi from "../../api/UserApi";

import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
import { toastr } from "react-redux-toastr";
import { FastField, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';

import { TextInput } from "../../custom_/Text";

// import { ReactstrapInput } from "reactstrap-formik";
// import * as Yup from 'yup';


//import filterFactory, { customFilter } from 'react-bootstrap-table-nextgen-filter';
// import { FastField, Form, Formik } from "formik";
// import { ReactstrapInput } from "reactstrap-formik";
// import * as Yup from 'yup';
// import { toastr } from "react-redux-toastr";

import AddAccount from '../acount/AddAccountAdmin';

const User = (props) =>{
  const getListUser = props.getListUserAction;
  const size = props.size;

  const [isOpenModalCreate, setOpenModalCreate] = useState(false);
  const createAccountModel = ({isOpenModalCreate}) => (
    isOpenModalCreate ? <AddAccount refreshForm={refreshForm} setOpenModalCreate={setOpenModalCreate} /> : ''
  );

  useEffect(() =>{
    const getAllUser = async() =>{
      const result = await UserApi.getAllUsers(1, size);
      const users = result.content;
      const totalSize = result.totalElements;
      getListUser(users,1,totalSize);
    }
    getAllUser();
  },[getListUser,size]);

//create edit button component
const actionFormatter = (cell, row, rowIndex) => {
  return (
    <Icon.Edit2 size={16} className="align-middle mr-2" onClick={() => updateUser(row.id)}/>
  );
};

const tableColumns = [
  {
    dataField: "username",
    text: "User name",
    sort: true
  },
  {
    dataField: "email",
    text: "Email",
    sort: true
  },
  {
    dataField: "firstName",
    text: "First name",
    sort: true
  },
  {
    dataField: "lastName",
    text: "Last name",
    sort: true
  },
  {
    dataField: "role",
    text: "Role",
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


  const handleTableChange = async (type, { page ,sizePerPage,sortField, sortOrder, searchText }) => {
    //sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'id'
      sortOrder = 'desc';
    }
  
    // // filter
    // const filter = filters && filters.totalMember && filters.totalMember.filterVal ? filters.totalMember.filterVal : null;
    // const minTotalMember = filter && filter.minTotalMember ? filter.minTotalMember : null;
    // const maxTotalMember = filter && filter.maxTotalMember ? filter.maxTotalMember : null;
  
    //get data from api
    const result = await UserApi.getAllUsers(page, size,sortField,sortOrder, searchText);
    const users = result.content;
    const totalSize = result.totalElements;
    //update group data to store
    getListUser(users, page, totalSize);
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
    // refresh selected rows
    props.updateSelectedRowsAction([]);

    //refresh table 
    handleTableChange(null,
      {
        page: 1,
        sortField: null,
        sortOrder: null,
        searchText: null,
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
       // update user
    const [userUpdateInfo, setUserUpdateInfo] = useState();

        //open update model
      const updateUser = async (userId) => {
        setOpenModalUpdate(true);
        const userInfo = await UserApi.getById(userId);
        setUserUpdateInfo(userInfo);
      }
      //update modal
    const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
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
      selected = [...props.selectedRows, row.id]
    } else {
      selected = props.selectedRows.filter(x => x !== row.id)
    }
    console.log(selected);
    props.updateSelectedRowsAction(selected);
  }

  //handle select all rows
  const handleOnSelectAll = (isSelect, rows) => {

    let selected = props.selectedRows;

    const ids = rows.map(r => r.id);
    if (isSelect) {
      selected = ids
    } else {
      selected = []
    }
    console.log(selected);

    props.updateSelectedRowsAction(selected);
  }
    const handleDeleteConfirm  = async () => {
    
      try {
        await UserApi.deleteByIds(props.selectedRows);
        setOpenModalDelete(false);
        showSuccessNotification(
          "Delete User",
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
    <h1 className="h3 mb-3">Admin Management</h1>

    <Row>
      <Col>
        <Card>
          
          <CardBody>
          <ToolkitProvider
          keyField="id"
          data={props.users}
          columns={tableColumns}
          search
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
                  <CustomSearch {...toolkitprops.searchProps} />
                </Col>
                <Col lg="9"> 
                  <div className="float-right pull-right">
                    <Icon.RefreshCcw type="button" className="align-middle mr-3" size={24} onClick={refreshForm}/>
                    <Icon.PlusCircle type="button" className="align-middle mr-3" onClick={() => setOpenModalCreate(true)}/>
                    <Icon.Trash2 type="button" className="align-middle mr-3" onClick={() =>{ if (props.selectedRows.length !== 0) {setOpenModalDelete(true)}else{showErrorNotification(
                      "Delete User",
                      "Bạn hãy chọn user cần xóa!!!"
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
    
    {isOpenModalCreate}
    <AddAccount refreshForm={refreshForm} setOpenModalCreate={setOpenModalCreate} isOpenModalCreate={isOpenModalCreate}/>

     
    {isOpenModalCreate} 
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

  <Modal isOpen={isOpenModalUpdate}>
        <Formik
          enableReinitialize
          initialValues={
            // {
            //   email: userUpdateInfo && userUpdateInfo.email ? userUpdateInfo.email : '',
            //   firstName: userUpdateInfo && userUpdateInfo.firstName !== undefined && userUpdateInfo.firstName !== null ? userUpdateInfo.firstName : '',
            //   lastName: userUpdateInfo && userUpdateInfo.lastName !== undefined && userUpdateInfo.lastName !== null ? userUpdateInfo.lastName : ''
            // }
            {
              email: '',
              firstName: '',
              lastName: ''
            }
          }
          validationSchema={
            Yup.object().shape({
              email: Yup.string()
                .email('Invalid email address')
                // .min(6, 'Must be between 6 and 50 characters')
                // .max(50, 'Must be between 6 and 50 characters')
                // .required('Required')
                .test('checkUniqueName', 'This name is already registered.', async email => {
                  if (email === userUpdateInfo.email) {
                    return true;
                  }
                  // call api
                  const isExists = await UserApi.existsByEmail(email);
                  return !isExists;
                }),
            })
          }

          onSubmit={
            async values => {
              try {
                await UserApi.update(
                  userUpdateInfo.id,
                  values.email,
                  values.firstName,
                  values.lastName
                );
                // show notification
                showSuccessNotification(
                  "Update User",
                  "Update User Successfully!"
                );
                // close modal
                setOpenModalUpdate(false);
                // Refresh table
                refreshForm();
              } catch (error) {
                console.log(error);
                setOpenModalUpdate(false);
                // redirect page error server
                props.history.push("/500");
              }
            }
          }

          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* header */}
              <ModalHeader>Update User</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">
                <Container>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Email:</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        component={TextInput}
                      />
                      <ErrorMessage name="email"/>
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>First Name:</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        component={TextInput}
                      />
                      <ErrorMessage name="firstName"/>
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Last Name:</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        component={TextInput}
                      />
                      <ErrorMessage name="lastName"/>
                    </Col>
                  </Row>

                </Container>

              </ModalBody>

              {/* footer */}
              <ModalFooter>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Save
                </Button>{" "}

                <Button color="primary" onClick={() => setOpenModalUpdate(false)}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik >
      </Modal>


  </Container>
)};
const mapGlobalStateToProps = state => {
  return {
    users: selectUsers(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state),
  };
};
export default connect(mapGlobalStateToProps,{getListUserAction,updateSelectedRowsAction})(User);
 