import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import { selectFilms } from "../../redux/selectors/FilmSelector";
// import paginationFactory from "react-bootstrap-table2-paginator";
import { getListFilmAction } from "../../redux/actions/FilmActions";
import '../../css/film.css'

//api
import ticketApi from "../../api/TicketApi";
import FilmApi from "../../api/FilmApi";
import scheduleApi from "../../api/ScheduleApi";

import * as Icon from 'react-feather';

import daysOfWeek from "../../utils/DaysOfWeek";
import Storage from "../../Storage/Storage";

// import { Search } from "react-bootstrap-table2-toolkit";
const FilmPage = (props) => {
  const getListFilm = props.getListFilmAction;

  useEffect(() =>{
    const getAllFilm = async() =>{
      try {
        const result = await FilmApi.getAllFilm();
        const films = result.content;
        getListFilm(films);
      } catch (error) {
        throw error;
      }
    }
    getAllFilm(); 
  },[getListFilm]);

  const data = props.films;
  const [isOpenModal, setOpenModal] = useState(false);
  const [filmname, setFilmname] = useState("");
  const [filmID, setFilmID] = useState(-1);
  const [scheduleMap, setScheduleMap] = useState([]);
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState();
  const [scheduleId, setscheduleId] = useState();
  const [isOpenModal1, setOpenModal1] = useState(false);
  const [isOpenModal2, setOpenModal2] = useState(false);
  const checkToken = Storage.getToken();

  const handleCreatTicket = async () => {
    try {
      const ticketObj = {
        quantity: quantity,
        filmScheduleId: scheduleId
      }
      await ticketApi.createTicket(
        ticketObj
      );
      setOpenModal(false);
      setOpenModal1(true);
    } catch (error) {
      throw error;
    }
  }
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  }
  
  if(scheduleMap.length>0){
  return(
  <Container fluid className="p-0">
    {/* <h1 className="h3 mb-3">Film Page</h1> */}
    <div className="h3 mb-5"></div>
    <Row>
      <Col> 
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">

            </CardTitle>

          </CardHeader>
          <CardBody>
              <div className="category-products cgv-movies">
              <ul className="products-grid products-grid--max-4-col first last odd">
              {data.map((film)=>(
                    <li className="film-lists item last">
                        <div className="product-images">
                            <a
                              href={`/films/${film.filmId}`}
                              title={film.name}
                              className="product-image"
                            >
                                <img
                                  className="product-images"
                                  id="product-collection-image-5416"
                                    src={film.poster}
                                    alt={film.name}
                                />
                            </a>
                        </div>
                        <div
                          className="product-info"
                          style={{ maxHeight: "none", height: "auto", minHeight: 36 }}
                        >
                        <h2 className="product-name">
                          <a
                            href={`/films/${film.filmId}`}
                            title={film.name}
                          >
                            {film.name}
                          </a>
                        </h2>

                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Thể loại: </span>
                          <span className="cgv-info-normal">
                            {film.genre}
                          </span>
                        </div>
                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Thời lượng: </span>
                          <span className="cgv-info-normal">{film.duration}</span>
                        </div>

                
                        <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Khởi chiếu: </span>
                          <span className="cgv-info-normal">{film.releaseDate}</span>
                        </div>
                        <div className="cgv-movie-info">
                        <span className="cgv-info-bold">Giá vé: </span>
                        <span className="cgv-info-normal">{film.ticketPrice} VNĐ</span>
                        </div>
                        <div><Button type='button' color="primary" size="lg" onClick={() => {
                            if(checkToken){
                              //reset state
                              setTime('');
                              setscheduleId('');

                              setOpenModal(true);
                              setFilmname(film.name);
                              setFilmID(film.filmId);

                              scheduleApi.getSchedulesByFilmId(film.filmId)
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
                        }}>
                          Mua
                        </Button></div>
                      </div>
                    </li>
              ))}
              </ul>
            </div>
        
          </CardBody>
        </Card>
      </Col>
    </Row>

    <Modal isOpen={isOpenModal1}>
        {/* body */}
        <ModalBody className="m-3">
          <div>
              <h1>Đặt vé thành công</h1>
          </div>
          </ModalBody>

          {/* footer */}
          <ModalFooter>
          <Button color="primary" onClick={() => setOpenModal1(false)}>
              Close
          </Button>

          </ModalFooter>
      </Modal>

      <Modal isOpen={isOpenModal2}>
        {/* body */}
        <ModalBody className="m-3">
          <div>
              <h1>Bạn cần đăng nhập để đặt vé</h1>
          </div>
          </ModalBody>

          {/* footer */}
          <ModalFooter>
            <Button color="primary" onClick={() => {props.history.push("/sign-in")}}>
              Login
            </Button>

            <Button color="primary" onClick={() => setOpenModal2(false)}>
                Close
            </Button>
          </ModalFooter>
      </Modal>

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

      </ModalHeader>

      {/* body */}
      <ModalBody className="m-3">
        <p className="mb-0"  style={{fontSize:"20px"}}>
          Tên Phim: <span style={{fontStyle:"italic"}}>{filmname}</span>
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
    </Modal>

  </Container>
)
}else{
  return(
    <Container fluid className="p-0">
      {/* <h1 className="h3 mb-3">Film Page</h1> */}
      <div className="h3 mb-5"></div>
      <Row>
        <Col> 
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">

              </CardTitle>

            </CardHeader>
            <CardBody>
                <div className="category-products cgv-movies">
                <ul className="products-grid products-grid--max-4-col first last odd">
                {data.map((film)=>(
                      <li className="film-lists item last">
                          <div className="product-images">
                              <a
                                href={`/films/${film.filmId}`}
                                title={film.name}
                                className="product-image"
                              >
                                  <img
                                    className="product-images"
                                    id="product-collection-image-5416"
                                      src={film.poster}
                                      alt={film.name}
                                  />
                              </a>
                          </div>
                          <div
                            className="product-info"
                            style={{ maxHeight: "none", height: "auto", minHeight: 36 }}
                          >
                          <h2 className="product-name">
                            <a
                              href={`/films/${film.filmId}`}
                              title={film.name}
                            >
                              {film.name}
                            </a>
                          </h2>

                          <div className="cgv-movie-info">
                            <span className="cgv-info-bold">Thể loại: </span>
                            <span className="cgv-info-normal">
                              {film.genre}
                            </span>
                          </div>
                          <div className="cgv-movie-info">
                            <span className="cgv-info-bold">Thời lượng: </span>
                            <span className="cgv-info-normal">{film.duration}</span>
                          </div>


                          <div className="cgv-movie-info">
                            <span className="cgv-info-bold">Khởi chiếu: </span>
                            <span className="cgv-info-normal">{film.releaseDate}</span>
                          </div>
                          <div className="cgv-movie-info">
                          <span className="cgv-info-bold">Giá vé: </span>
                          <span className="cgv-info-normal">{film.ticketPrice} VNĐ</span>
                          </div>
                          <div><Button type='button' color="primary" size="lg" onClick={() => {
                            //reset state
                            setTime('');
                            setscheduleId('');

                            setOpenModal(true);
                            setFilmname(film.name);
                            setFilmID(film.filmId);

                            scheduleApi.getSchedulesByFilmId(film.filmId)
                              .then((res) => {
                                console.log(res);
                                setScheduleMap(res);
                                Object.assign(scheduleMap, res);
                              })
                              .catch((error) => {
                                console.log(error);
                              })
                          }}>
                            Mua
                          </Button></div>
                        </div>
                      </li>

                ))}
                </ul>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={isOpenModal}>

        {/* body */}
        <ModalBody className="m-3">
          <div>
              <h1>Phim chưa có lịch chiếu</h1>
          </div>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          <Button color="primary" onClick={() => setOpenModal(false)}>
            Close
          </Button>

        </ModalFooter>
      </Modal>

    </Container>
  )
}

};
const mapGlobalStateToProps = state => {
  return {
    films: selectFilms(state),
    // page: selectPage(state),
    // size: selectSize(state),
    // totalSize: selectTotalSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};
export default connect(mapGlobalStateToProps,{getListFilmAction})(FilmPage);
