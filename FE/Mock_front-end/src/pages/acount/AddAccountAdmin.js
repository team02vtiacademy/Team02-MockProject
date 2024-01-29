import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  FormFeedback,
} from "reactstrap";
import { FastField, Form, Formik, Field, ErrorMessage } from "formik";

import { TextInput } from "../../custom_/Text";
import * as Yup from 'yup';
import userApi from '../../api/UserApi'

import { toastr } from "react-redux-toastr";

function AddAccountAdmin(props) {
  
  const label_width = 4;
  const input_width = {
    firstName: 6,
    lastName: 6,
    username: 6,
    password: 6,
    confirmPassword: 6,
    email: 6,
    role: 3
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

  let validationSchemaObject = Yup.object().shape({
    firstName: Yup.string()
        .required("Required")
        .max(50, '50 characters max'),
    lastName: Yup.string()
        .required("Required")
        .max(50, '50 characters max'),
    username: Yup.string()
        .required('Required')
        .min(6, 'Must be between 6 and 50 characters')
        .max(50, 'Must be between 6 and 50 characters')
        .test('checkUniqueUserName', 'This user name is already registered.', async username => {
          // call api
          const isExists =//await userApi.existsByUsername(username);
            false;
            return !isExists;
        }),
    password: Yup.string()
        .required('Required')
        .min(6, 'Must be between 6 and 50 characters')
        .max(50, 'Must be between 6 and 50 characters')
        ,
    confirmPassword: Yup.string()
        .required('Required')
        .when("password", {
            is: value => (value && value.length > 0 ? true : false),
            then: () => Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Confirm Password do not match"
            )
        }),
    email: Yup.string()
        .required('Required')
        .email('Invalid email address')
        .test('checkExistsEmail', 'This email is already registered.', async email => {
            // call api
            const isExists = //await userApi.existsByEmail(email);
            false;
            return !isExists;
        }),
    role: Yup.string()
        .required("Please select role!")
        .matches("Manager|Admin|User")
    
      });

  return (
    <Modal isOpen={props.isOpenModalCreate}>
        <Formik
            initialValues={
                {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    role: 'Admin'
                }
            }
            validationSchema={
                validationSchemaObject
            }

            onSubmit={
              async values => {
                
                //console.log(values);
                try {
                  await userApi.createAccountFromAdmin(values);
                  // show notification
                  console.log(values);
                  showSuccessNotification(
                    "Create Addcount",
                    "Create Account Successfully!"
                  );
                  // close modal
                  props.setOpenModalCreate(false);
                  // Refresh table
                  props.refreshForm();
                } catch (error) {
                  console.log(error);
                  props.setOpenModalCreate(false);
                  // redirect page error server
                  props.history.push("/500");
                }
              }
            }

          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* header */}
              <ModalHeader>Create Account</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">
                  <FormGroup>
                    <FastField
                      label_width={label_width}
                      input_width={input_width.firstName}
                      label="First Name"
                      type="text"
                      
                      name="firstName"
                      placeholder="Enter first name"
                      component={TextInput}
                      
                    />
                    <ErrorMessage name="firstName" />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label_width={label_width}
                      input_width={input_width.lastName}
                      label="Last Name"
                      type="text"
                      
                      name="lastName"
                      placeholder="Enter last name"
                      component={TextInput}
                    />
                    <ErrorMessage name="lastName" />
                  </FormGroup>
                  
                  <FormGroup>
                    <FastField
                      label_width={label_width}
                      input_width={input_width.username}
                      label="Username"
                      type="text"
                      
                      name="username"
                      placeholder="Enter username"
                      component={TextInput}
                    />
                    <ErrorMessage name="username" />
                  </FormGroup>
                  
                  
                  <FormGroup>
                    <FastField
                      label_width={label_width}
                      input_width={input_width.email}
                      label="Email"
                      type="email"
                      
                      name="email"
                      placeholder="Enter email"
                      component={TextInput}
                    />
                    <ErrorMessage name="email" />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label_width={label_width}
                      input_width={input_width.password}
                      label="Password"
                      type="password"
                      
                      name="password"
                      placeholder="Enter password"
                      component={TextInput}
                    />
                    <ErrorMessage name="password" />
                    
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label_width={label_width}
                      input_width={input_width.confirmPassword}
                      label="Confirm Password"
                      type="password"
                      
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      component={TextInput}
                    />
                    <ErrorMessage name="confirmPassword" />
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col lg={label_width}>
                        <Label label-for="role" >Select role: </Label>
                      </Col>
                      <Col>
                        <Field as="select" name="role" placeholder="Select role" >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="User">User</option>
                      </Field>
                      </Col>
                    </Row>
                    
                    <ErrorMessage name="role" />
                  </FormGroup>

                  
              </ModalBody>

              {/* footer */}
              <ModalFooter>
                <Button type="submit" color="primary" disabled={isSubmitting} >
                  Save
                </Button>{" "}

                <Button color="primary" onClick={() => props.setOpenModalCreate(false)}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik >
      </Modal>
  )

}



export default AddAccountAdmin;