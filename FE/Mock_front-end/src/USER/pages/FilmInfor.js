import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ListGroup,
  ListGroupItem,
  Modal,

} from "reactstrap";
import * as Icon from 'react-feather';
//CSS
import  '../../css/general.scss';
//Other
import {TextInfor} from "../../custom_/Text"
import { FilmScheduleListUser } from "./FilmScheduleListUser";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
//API
import api from "../../api/FilmApi";
import ticketApi from "../../api/TicketApi";
import scheduleApi from "../../api/ScheduleApi";
import filmApi from "../../api/FilmApi";
import daysOfWeek from "../../utils/DaysOfWeek";
import Storage from "../../Storage/Storage";

function FilmInfor(props) {

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
    const [isOpenModal, setOpenModal] = useState(false);
    const [isOpenModal1, setOpenModal1] = useState(false);
    const [isDisabledButton, setDisabledButton] = useState(false);
    const [scheduleMap, setScheduleMap] = useState([]);
    const [time, setTime] = useState("");
    const [quantity, setQuantity] = useState();
    const [scheduleId, setscheduleId] = useState();
    const [ticketValid, setTicketValid] = useState(false);
    const [isOpenModal2, setOpenModal2] = useState(false);
    const checkToken = Storage.getToken();


    const existsSchedule = () =>{
        if(scheduleMap.length > 0){
            setTicketValid(true);
            setOpenModal(true);
            setOpenModal1(false);
        }else{
            setTicketValid(false);
            setOpenModal(false);
            setOpenModal1(true);
        }
    }

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
            setScheduleMap(result2)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    
    const handleCreatTicket = async () => {
        try {
            if(time==null || quantity==null){
                setDisabledButton(true);
            } else {
                const ticketObj = {
                    quantity: quantity,
                    filmScheduleId: scheduleId
                }
                await ticketApi.createTicket(
                ticketObj
                );
                setOpenModal(false);
            }
        } catch (error) {
            throw error;
        }
    }
    const handleQuantity = (event) => {
        setQuantity(event.target.value);
      }
    
    const rowStyle = {
        display: 'grid',
        placeItems: 'center'
    };

    
    return (
    <>
        <Container fluid>
            <div className="film-infor-form">
                <Row >
                    <div style={rowStyle}>
                        <Row style={rowStyle}>
                            <div className="film-infor-frame">
                                <img src={infor.poster} 
                                alt="anh" className="film-infor-img"
                                />
                            </div>
                            <div className="film-infor-buy-button">
                                <Button type='button' color="primary" size="lg" onClick={() => {
                                    if(checkToken){
                                    //reset state
                                    setTime('');
                                    setscheduleId('');
                                    setOpenModal(true);
                                    existsSchedule();

                                    scheduleApi.getSchedulesByFilmId(infor.filmId)
                                        .then((res) => {
                                        console.log(res);
                                        setScheduleMap(res);
                                        Object.assign(scheduleMap, res);
                                        })
                                        .catch((error) => {
                                        console.log(error);
                                        })
                                    }
                                    else{
                                        setOpenModal2(true);
                                    }
                                    }}>Mua</Button>
                            </div>
                        </Row>
                    </div>
                    <Col lg = {6} >
                        <div className="film-infor-edit-frame">
                                <Row>
                                    <h2 className="film-infor-film-name">
                                        {infor.name}
                                    </h2>
                                </Row>
                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.directors}
                                    label="Description"
                                    value={infor.description}
                                />

                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.directors}
                                    label="Directors"
                                    value={infor.directors}
                                />

                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.directors}
                                    label="Actors"
                                    value={infor.actors}
                                />

                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.genre}
                                    label="Genre"
                                    value={infor.genre}
                                />

                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.duration}
                                    label="Duration"
                                    value={infor.duration}
                                />


                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.ticket_price}
                                    label="Ticket price"
                                    value={infor.ticketPrice}
                                /> 


                                <TextInfor
                                    classNameLabel="film-infor-label"
                                    label_width={label_width}
                                    input_width={input_width.release_date}
                                    label="Release date"
                                    value={infor.releaseDate}
                                />
                                <div className="film-infor-schedules">
                                    <Row >
                                        <Col lg="auto">
                                            <h3>Film schedule</h3>
                                        </Col>
                                    </Row>

                                    <FilmScheduleListUser schedules={infor.filmSchedules} />
                                </div>
                        </div> 
                    </Col>
                </Row>              
                                
            </div>

            <Modal isOpen={isOpenModal2}>
                {/* body */}
                <ModalBody className="m-3">
                <div>
                    <h1>Bạn cần đăng nhập để đặt vé</h1>
                </div>
                </ModalBody>

                {/* footer */}
                <ModalFooter>
                <Button color="primary" onClick={() => {props.history.push("sign-in")}}>
                    Login
                </Button>

                <Button color="primary" onClick={() => setOpenModal2(false)}>
                    Close
                </Button>

                </ModalFooter>
            </Modal>

            {ticketValid === true ? (

            <Modal isOpen={isOpenModal}>
            {/* header */}
            <ModalHeader>
            <p style={{fontSize:"30px"}}>Chọn lịch chiếu</p>
                <ListGroup horizontal style={{ borderBottom: "1px solid", borderColor: "#002843", borderRadius: 0 }}>
                
                {Array.from(scheduleMap).map((value) => {
                    
                    return (
                    <>
                        <ListGroupItem key={value.scheduleId} className="film-infor-schedule-list-item" onClick={() => {
                        setTime(value.timeSlot);
                        setscheduleId(value.scheduleId);
                        }}>
                        <div style={{ display: "grid" }}>
                            <div style={{ fontWeight: "bold", gridRow: 1, gridColumn: 1 }} >
                            {
                                (() => {
                                let d = new Date(value.timeSlot);
                                let day = d.getDay();
                                let date = `${d.getMonth() + 1}/${d.getDate()}`;
                                return `${daysOfWeek[day]} - ${date}`;
                                })()
                            }
                            </div>
                            <div style={{ gridColumn: 1, gridRow: 2 }}>
                            {`No. seat: ${value.seatNumber}`}
                            </div>

                        </div>

                        </ListGroupItem>
                    </>
                    )
                })}

                </ListGroup>
                <p></p>
            </ModalHeader>

            {/* body */}
            <ModalBody className="m-3">
                <p className="mb-0"  style={{fontSize:"20px"}}>
                Tên Phim: <span style={{fontStyle:"italic"}}>{infor.name}</span>
                </p>
                <p className="mb-0"  style={{fontSize:"20px"}}>
                Xuất chiếu: <span style={{fontStyle:"italic"}}>{time}</span>
                </p>
                <label style={{fontSize:"20px"}}>Chọn số vé cần mua:</label>
                <input type="number" style={{height:"30px", width:"60px"}} onChange={handleQuantity} />
            </ModalBody>

            {/* footer */}
            <ModalFooter>
                <Button color="primary" onClick={handleCreatTicket} >
                    Xác nhận
                </Button>{" "}

                <Button color="primary" onClick={() => setOpenModal(false)}>
                    Close
                </Button>

            </ModalFooter>
            </Modal>):(
            <Modal isOpen={isOpenModal1}>
                {/* body */}
                <ModalBody className="m-3">
                <div>
                    <h1>Phim chưa có lịch chiếu</h1>
                </div>
                </ModalBody>

                {/* footer */}
                <ModalFooter>
                <Button color="primary" onClick={() => setOpenModal1(false)}>
                    Close
                </Button>

                </ModalFooter>
            </Modal>
            )}

            <Modal isOpen={isOpenModal2}>
                {/* body */}
                <ModalBody className="m-3">
                <div>
                    <h1>Bạn cần đăng nhập để đặt vé</h1>
                </div>
                </ModalBody>

                {/* footer */}
                <ModalFooter>
                <Button color="primary" onClick={() => {props.history.push("sign-in")}}>
                    Login
                </Button>

                <Button color="primary" onClick={() => setOpenModal2(false)}>
                    Close
                </Button>

                </ModalFooter>
            </Modal>
        </Container>
                
    </>
    )

}



export default FilmInfor;