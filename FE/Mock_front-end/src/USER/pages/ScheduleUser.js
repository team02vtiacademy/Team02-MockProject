import React, { useEffect, useState } from "react";

import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import daysOfWeek from "../../utils/DaysOfWeek";
import "../css/film_schedule.scss";
//films
import FilmList from "../component/FilmList";
import scheduleApi from "../../api/ScheduleApi";
import filmeApi from "../../api/FilmApi";

const ScheduleUser = (props) => {

    const [films, setFilms] = useState([]);
    const [choosenDay, setChoosenDay] = useState(new Date());
    const [indexActive, setIndexActive] = useState(0);
    const [isActive, setActive] = useState([true]);
    
    const now = new Date();
    var schedule = []
    schedule.push(now);
    for (let i = 1; i < 7; ++i) {
        let temp = new Date();
        temp.setDate(temp.getDate() + i);
        schedule.push(temp);
        isActive.push(false);
    }
    
    useEffect(() => {
        //console.log("mounted");
        let filmIds = [];
        
        scheduleApi.getByDate(choosenDay)
        .then((result) => {
            result.content.forEach(element => {
                filmIds.push(element.film.filmId);
            });

            //console.log(filmIds);
            
            const getFilms = async () => {
                if (filmIds.length > 0) {
                    setFilms([]);
                    filmIds.forEach((id) => {
                        filmeApi.getFilmById(id)
                        .then((result) => {
                            
                            setFilms((old) => [...old, result]);
                        })
                        .catch((error) => {
                            throw error;
                        })
        
                    })
                } else setFilms([]);
                
            }
            getFilms();
            
        })
        .catch((error) => {
            throw error;
        })

        
    }, [choosenDay]);

    const handleClick = (e) => {
        console.log(e);
    }

    return (
        <div className="schedule-page-container">
        
            <Col lg={9} >
                <div className="schedule-page-container">
                    <ul horizontal  className="schedule-page-list">
                            {schedule.map((value, index) => {
                                return (
                                    <>
                                        <li  key={index} className={"schedule-page-list-item"+ (isActive[index] ? " active-schedule": "")} 
                                            onClick={() => {
                                            setChoosenDay(value);
                                            let newActive = [...isActive];

                                            newActive[indexActive] = false;
                                            newActive[index] = true;
                                            setIndexActive(index);
                                            setActive(newActive);
                                        }}>
                                                < a  >
                                                    <h4 >
                                                    {
                                                        (() => {
                                                            let d = new Date(value);
                                                            let day = d.getDay();
                                                            let date = `${d.getMonth() + 1}/${d.getDate()}`;
                                                            return `${daysOfWeek[day]} - ${date}`;
                                                        })()
                                                    }
                                                        
                                                    </h4>
                                                </a>
                                            
                                        </li>   
                                    </>
                                )    
                            })}
                    </ul>

                </div>

                
            </Col>

            <Col lg={10}>
                <FilmList films = {films} />
            </Col>

        </div>
    )
}

export default ScheduleUser;