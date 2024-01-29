import React from "react";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import * as Icon from 'react-feather';

import {TextInfor} from "../../custom_/Text"
import  '../../css/general.scss';
import { FilmScheduleList } from "./FilmScheduleList";


import api from "../../api/FilmApi";


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


    const film = {
        name: "Miss marvel",
        description: "Carol Danvers bị vướng vào sức mạnh của Kamala Khan và Monica Rambeau, buộc họ phải hợp tác cùng nhau để cứu vũ trụ.",
        directors: "Nia DaCosta",
        actors: "Brie Larson, Iman Vellani, Teyonah Parris, Zawe Ashton",
        genre: "Hành động, phiêu lưu",
        duration: "104 phút",
        release_date: "10/11/2023",
        poster: 'https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f23%2f400x633%2D133942%2D231023%2D43.png',
        schedule: [
            {
                timeSlot: "2023-11-20T20:30",
                seatNumber: 120
            },
            {
                timeSlot: "2023-11-21T20:00",
                seatNumber: 96
            }
        ]
    }

    const schedules = [
        {
            scheduleId: 1,
            timeSlot: "2023-11-20T20:30",
            seatNumber: 120
        },
        {
            scheduleId: 2,
            timeSlot: "2023-11-21T20:00",
            seatNumber: 96
        },
        {
            scheduleId: 3,
            timeSlot: "2023-11-22T20:00",
            seatNumber: 96
        },
        {
            scheduleId: 4,
            timeSlot: "2023-11-23T20:00",
            seatNumber: 96
        }
    ]
    
    return (
    <>
            
                {/* <Container fluid>
                    <div >
                        <Row >
                            <Col lg={3} >
                                
                                    <Row>
                                        <div className="film-infor-frame">
                                            <img src={values.poster} 
                                            alt="anh" className="film-infor-img"
                                            />
                                        </div>
                                    </Row>
                                    <br />
                            </Col>
                            <Col lg = {6} >
                                <div className="film-infor-edit-frame">
                                        <Row>
                                            <h2>
                                                {film.name}
                                            </h2>
                                        </Row>
                                    
                                        <Row >
                                            <textarea className="general-infor">
                                                {film.description}
                                            </textarea>
                                        </Row>

                                        <TextInfor
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.directors}
                                            label="Directors"
                                            value={film.directors}
                                        />

                                        <TextInfor
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.directors}
                                            label="Actors"
                                            value={film.actors}
                                        />

                                        <TextInfor
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.genre}
                                            label="Genre"
                                            value={film.genre}
                                        />

                                        <TextInfor
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.duration}
                                            label="Duration"
                                            value={film.duration}
                                        />


                                        <TextInfor
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.ticket_price}
                                            label="Ticket price"
                                            value={film.ticket_price}
                                        /> 


                                        <TextInfor
                                            classNameLabel="film-infor-label"
                                            label_width={label_width}
                                            input_width={input_width.release_date}
                                            label="Release date"
                                            value={film.release_date}
                                        />


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
                        </Row>

                        <FilmScheduleList schedules={schedules} />   
                                      
                    </div>

                </Container> */}
                
    </>
  )

}



export default FilmInfor;