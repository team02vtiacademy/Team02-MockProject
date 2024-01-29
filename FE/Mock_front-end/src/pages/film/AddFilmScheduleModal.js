import { ErrorMessage, FastField, Formik } from "formik";
import React from "react";
import { Button, Container, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import * as Yup from 'yup';
import { TextInput } from "../../custom_/Text";

function AddFilmScheduleModal(props) {

    const close = props.close;
    
    const submit = (values ,{setSubmitting}) => {
        //window.event.stopPropagation();
        //setSubmitting(false);
        console.log(values);
        try {
            let d = values.timeSlot;
            let newSchedules = props.schedules;
            let check = false;
            for (let i = 0; i < newSchedules.length; ++i) {
                if (newSchedules[i].timeSlot == d) {
                    newSchedules[i].seatNumber = values.seatNumber;
                    check = true;
                }
            }
            if (!check)
                newSchedules.push({scheduleId: '-1', timeSlot: values.timeSlot, seatNumber: values.seatNumber});
            
            props.setField(newSchedules);
            //props.schedules.push(values);
            props.close();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal isOpen={props.isOpen}>
                
                <Formik 
                        initialValues={{
                            timeSlot: '',
                            seatNumber: ''
                        }}
                        validationSchema={Yup.object().shape({
                            timeSlot: Yup.date()
                                .required("Choose schedule!")
                                .min(new Date(), "Can not choose past day!"),
                            seatNumber: Yup.number()
                                .required("Enter seat number")
                                .min(50, "Min 50 seats")
                                .max(100, "Max 100 seats")
                                .integer("Integer number only")
                                .positive("Positive only")
                        })}
                        onSubmit={
                            submit
                        }

                        validateOnChange={false}
                        validateOnBlur={false}
                        >
                            { props => 
                                
                                <Container>
                                    
                                    <Form onSubmit={props.handleSubmit}>
                                        <ModalHeader>
                                            Create schedule
                                        </ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <FastField 
                                                    label="Choose day" 
                                                    label_width={3}
                                                    input_width={6}
                                                    type="date"
                                                    name="timeSlot"
                                                    component = {TextInput}
                                                    />
                                                    <ErrorMessage name="timeSlot" />
                                            </FormGroup>
                                            <FormGroup>
                                                <FastField
                                                    placeholder="" 
                                                    label="Number of seat" 
                                                    label_width={3}
                                                    input_width={3}
                                                    type="number"
                                                    name="seatNumber"
                                                    component = {TextInput}
                                                    />
                                                    <ErrorMessage name="seatNumber" />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div>
                                                <Button type="button" onClick={close} >Close</Button>
                                
                                                <Button type="submit" style={{marginLeft: "20px"}}>Save</Button>

                                            </div>
                                        </ModalFooter>
                                    </Form>
                                    

                                </Container>
                                
                            }
                    </Formik>
                
                
            </Modal>
        </>
    )
}


export {AddFilmScheduleModal};