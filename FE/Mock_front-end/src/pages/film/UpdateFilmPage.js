import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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

import filmApi from "../../api/FilmApi";
import scheduleApi from "../../api/ScheduleApi";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


function UpdateFilmPage(props) {
    
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
    const [isOpenDelete, setOpenDelete] = useState(false);

    const openAddScheduleModal = (e) => {
        setOpenAddScheduleModal(true);
    }
    const closeAddScheduleModal = (e) => {
        setOpenAddScheduleModal(false);
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
    
    let validatationObject = Yup.object().shape({
        name: Yup.string()
        // .required("Required")
        .max(100, '100 characters max'),
        directors: Yup.string()
            // .required("Required")
            .max(50, '50 characters max'),
        actors: Yup.string()
            // .required("Required")
            .max(200, '200 characters max'),
        genre: Yup.string()
            // .required("Required")
            .max(100, '100 characters max'),
        duration: Yup.string(),
            // .required("Required"),
        description: Yup.string()
            // .required("Required")
            .max(500, '500 characters max'),
            
        ticketPrice: Yup.number()
            // .required("Required")
            .integer()
            .positive()
            
        });
        
        
    let film = {
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
    };

    const [infor, setInfor] = useState(film);

    let location = useLocation();
    let filmId = location.pathname;
    
    filmId = filmId.split("/").slice(-1)[0];

    const getData = async () => {
        try {
            const result = await filmApi.getFilmById(filmId);
            film = {...result};
                        
            const result2 = await scheduleApi.getSchedulesByFilmId(filmId);
            film.filmSchedules = result2;
            film.duration = film.duration.split(' ')[0];
            setInfor(film);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = () => {
        // filmApi.deleteFilm(filmId);
        setOpenDelete(true);
        // props.history.push("/admin/films");
    }

    const handleCancel = () =>{
        props.history.push("/admin/films");
    }

    return (infor.name.length > 1?
    <>
        <Formik
            enableReinitialize={true}
            initialValues={
                infor
            }
            
            validationSchema={
                validatationObject
            }

            onSubmit={
              async values => {
                
                try {
                    await filmApi.updateFilm(values);
                    // show notification
                    //console.log(values);
                    showSuccessNotification(
                        "Update film",
                        "Update film Successfully!"
                    );

                    props.history.push("/admin/films");

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
                    <FormikConsumer >
                        {({values}) => {
                            console.log(values);
                        }}
                    </FormikConsumer>
                    <div >
                        <h1 className="h3 mb-3">Film Detail</h1>
                        <Row >
                            <Col lg={3} >
                                
                                    <Row>
                                        <FormikConsumer>
                                            {({values}) => (
                                                
                                                <div className="film-infor-frame">
                                                    <img src={values.poster} 
                                                    alt="anh" className="film-infor-img"
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
                                            editable={false}
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
                                schedules={formik.values.filmSchedules} 
                                setField={formik.setFieldValue}/>
                            }

                        </FormikConsumer>

                        

                        <Row >
                            <Col lg={9}>
                                <div className="film-infor-save-row">
                                <p>
                                    <Button type="submit" color="primary" style={{marginRight: "50px"}}>
                                        Save
                                    </Button>
                                    
                                    <Button type="button" color="primary" style={{marginRight: "50px"}} onClick={handleDelete}>
                                        Delete
                                    </Button>

                                    <Button type="button" color="primary" style={{marginRight: "50px"}} onClick={handleCancel}>
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

                <FormikConsumer>
                        {(formik) => {
                            return (
                                <>
                                    <Modal isOpen={isOpenDelete}>
                                        <ModalHeader>
                                            <p style={{fontSize:"20px"}}>Bạn thật sự muốn xóa phim: <span style={{fontStyle:"italic"}}>{formik.values.name}</span> ?</p>
                                        </ModalHeader>
                                        <ModalFooter>
                                            <Row lg={2} >
                                                <Col style={{display:"flex", justifyContent: "center"}}>    
                                                    <Button type="button" color="primary" onClick={() => {
                                                        setOpenDelete(false);
                                                        // props.history.goBack();
                                                        filmApi.deleteFilm(formik.values.filmId);
                                                        props.history.push("/admin/films");
                                                    }} >Yes</Button>
                                                </Col>
                                                <Col style={{display:"flex", justifyContent: "center"}}>    
                                                    <Button type="button" color="primary" onClick={() => setOpenDelete(false)} >No</Button>
                                                </Col>
                                            </Row>
                                        </ModalFooter>
                                    </Modal>
                                </>
                            )
                        }}
                </FormikConsumer>   
            </Form>
            )}

        </Formik >
        
        
        
    </>: <div>Loading</div>
  )

}



export default UpdateFilmPage;