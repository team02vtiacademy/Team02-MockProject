import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import * as Icon from 'react-feather';

import { FastField, Form, Formik, FormikConsumer, ErrorMessage } from "formik";

import * as Yup from 'yup';

import { toastr } from "react-redux-toastr";


import {TextArea, TextInput} from "../../custom_/Text"
import  '../../css/general.scss';
import UploadImageModal from "./UploadImageModal";


import { FilmScheduleList } from "./FilmScheduleList";
import { AddFilmScheduleModal } from "./AddFilmScheduleModal";

import api from "../../api/FilmApi";
import { useHistory } from "react-router-dom";


function AddFilmPage(props) {

    const label_width = 3;
    const input_width = {
        name: 9,
        description: 12,
        directors: 9,
        actors: 9,
        genre: 9,
        duration: 5,
        ticket_price: 5,
        release_date: 5
    }

    const [isOpenUploadModal, setOpenUploadModal] = useState(false);

    const [isOpenAddScheduleModal, setOpenAddScheduleModal] = useState(false);

    
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
    const openAddScheduleModal = (e) => {
        setOpenAddScheduleModal(true);
    }
    const closeAddScheduleModal = (e) => {
        setOpenAddScheduleModal(false);
    }

    const handleCancel = () =>{
        props.history.push("/admin/films");
    }

    let validatationObject = Yup.object().shape({
        name: Yup.string()
            .required("Required")
            .max(50, '50 characters max'),
        directors: Yup.string()
            .required("Required")
            .max(50, '50 characters max'),
        actors: Yup.string()
            .required("Required")
            .max(200, '50 characters max'),
        genre: Yup.string()
            .required("Required")
            .max(100, '100 characters max'),
        duration: Yup.string()
            .required("Required"),
        description: Yup.string()
            .required("Required")
            .max(500, '50 characters max'),
        releaseDate: Yup.date()
            .required("Required"),
            
        ticketPrice: Yup.number()
            .required("Required")
            .integer()
            .positive()

    });

    return (
    <>
        <Formik
            initialValues={
                {
                    filmId: '',
                    name: "",
                    description: "",
                    directors: "",
                    actors: "",
                    genre: "",
                    duration: "",
                    releaseDate: "",
                    poster: '',
                    ticketPrice: '',
                    filmSchedules: [],
                    user: {}
                }
            }
            validationSchema={
                validatationObject
            }

            onSubmit={
              async values => {
                console.log(values);
                try {
                    await api.createFilm(values);
                    // show notification
                    //console.log(values);
                    showSuccessNotification(
                        "Create film",
                        "Create film Successfully!"
                    );
                    
                    props.history.push("/admin/films");
                    window.location.reload();

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
            {({ isSubmitting }) => (
            <Form>
                <Container fluid>
                    <div >
                        <Row >
                            <Col lg={3} >
                                
                                    <Row>
                                        <FormikConsumer>
                                            {({values}) => (
                                                <div className="film-infor-frame">
                                                    <img src={values.poster} 
                                                    alt="Film poster here" className="film-infor-img"
                                                    />

                                                </div>
                                            )}
                                        </FormikConsumer>
                                    </Row>
                                    <br />
                                    <Row className="justify-content-md-center">
                                        <Button color="primary" onClick={() => setOpenUploadModal(true)}>Upload image</Button>
                                    </Row>

                            </Col>
                            <Col lg = {6} >
                                <div className="film-infor-edit-frame">
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.name}
                                            type="text"
                                            label="Film name"
                                            name="name"
                                            placeholder="Enter film name"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="name" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <label htmlFor="description" className="film-infor-label" >Description</label>
                                            </Col>
                                        </Row>
                                        <Row >
                                            
                                            <FastField
                                                input_width={input_width.description}
                                                name="description"
                                                placeholder="Enter description"
                                                component={TextArea}
                                                
                                            />
                                            
                                        </Row>
                                        <ErrorMessage name="description" />
                                    </FormGroup>

                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.directors}
                                            type="text"
                                            label="Directors"
                                            name="directors"
                                            placeholder="Enter directors"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="directors" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.actors}
                                            type="text"
                                            label="Actors"
                                            name="actors"
                                            placeholder="Enter actors"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="actors" />
                                    </FormGroup>

                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.genre}
                                            type="text"
                                            label="Genre"
                                            name="genre"
                                            placeholder="Enter genre"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="genre" />
                                    </FormGroup>

                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.duration}
                                            type="text"
                                            label="Duration"
                                            name="duration"
                                            placeholder="Enter duration"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="duration" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.ticket_price}
                                            type="number"
                                            label="Ticket price"
                                            name="ticketPrice"
                                            placeholder="Ex: 100,000"
                                            component={TextInput}
                                        /> 
                                        <ErrorMessage name="ticketPrice" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <FastField
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.release_date}
                                            type="date"
                                            label="Release date"
                                            name="releaseDate"
                                            component={TextInput}
                                        />
                                        <ErrorMessage name="releaseDate" />
                                    </FormGroup>

                                </div>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <br />
                        <Row >
                            <Col lg="auto">
                                <h3>Film schedule</h3>
                            </Col>
                            <Col lg={{offset: 1}}>
                                <Icon.PlusCircle type="button" onClick={openAddScheduleModal}></Icon.PlusCircle>
                            </Col>
                        </Row>
                        <FormikConsumer>
                            {(formik) => 
                                <FilmScheduleList schedules={formik.values.filmSchedules} setField={formik.setFieldValue}/>   
                            }

                        </FormikConsumer>
                        <FormikConsumer>
                            {(formik) => 
                                <AddFilmScheduleModal close={closeAddScheduleModal} isOpen={isOpenAddScheduleModal} 
                                schedules={formik.values.filmSchedules} setField={formik.setFieldValue}/>
                            }

                        </FormikConsumer>

                        

                        <Row >
                            <Col lg={9}>
                                <div className="film-infor-save-row">
                                <p>
                                    <Button type="submit" color="primary" style={{marginRight: "50px"}} >
                                            Save
                                    </Button>

                                    <Button color="primary" style={{marginRight: "50px"}} onClick={handleCancel}>
                                            Cancel
                                    </Button>
                                </p>
                            </div>
                            </Col>
                        </Row>
                        
                            
                    </div>
                    
                    

                </Container>
                
                <FormikConsumer>
                    {(formik) => (
                        <UploadImageModal isOpenUploadModal={isOpenUploadModal} setOpenUploadModal={setOpenUploadModal} formik={formik}/>
                    )}
                </FormikConsumer>     
            </Form>
            )}

        </Formik >
        
        
        
    </>
  )

}



export default AddFilmPage;