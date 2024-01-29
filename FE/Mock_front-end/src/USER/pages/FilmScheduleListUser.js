import React, { useState } from "react";
import daysOfWeek from "../../utils/DaysOfWeek";

import{
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import * as Icon from 'react-feather';

import "../../css/general.scss";


function FilmScheduleListUser(props) {

    //console.log(props);

    // var scheduleMap = new Array();
    // props.schedules.forEach(element => {
    //     let d = new Date(element.timeSlot);
    //     let day = d.toLocaleDateString().substring(0, 5);
    //     let seatNumber = element.seatNumber;
        
    //     let date = `${d.getMonth() + 1}-${d.getDate()}`;
    //     let hour = d.toLocaleTimeString();

    //     if (scheduleMap.get(day) === undefined) {
    //         scheduleMap.set(day, {});
    //     }
    //     let temp = {id: element.scheduleId, hour: hour, seatNumber: seatNumber};
    //     //scheduleMap.set(element, temp)
    //     //Object.assign(scheduleMap.get(day), temp);
    //     scheduleMap.push(temp);
    // });
    
    //console.log(scheduleMap);

    var scheduleMap = props.schedules;

    const handleDelete = (event, key) => {

        //console.log(key);
        let newSchedules = scheduleMap.filter((value, index) => {
            
            return !(value.scheduleId === key);
        })
        //console.log("d:", d, newSchedules, scheduleMap);
        props.setField("filmSchedules", newSchedules);


    }

    const handleChange = (values) => {

    }

    return (
        <> 
        {console.log(scheduleMap)}
            <ListGroup horizontal className={scheduleMap.length >= 5 ? "film-infor-user-schedule-list-five" : ""}>
                
                    {Array.from(scheduleMap).map((value, idx) => {
                        return (
                            <>
                                <ListGroupItem  key={idx} className="film-infor-user-schedule-list-item" >
                                    <div style={{display: "grid"}}>
                                        <div style={{fontWeight: "bold", gridRow: 1, gridColumn: 1}} >
                                            {
                                                (() => {
                                                    let d = new Date(value.timeSlot);
                                                    let day = d.getDay();
                                                    let date = `${d.getMonth() + 1}/${d.getDate()}`;
                                                    return `${daysOfWeek[day]} - ${date}`;
                                                })()
                                            }
                                        </div>
                                        <div onClick={(event) => handleDelete(event, value.scheduleId)} className="film-infor-user-schedule-close" style={{gridColumn: 2, gridRow: "1 / 3", alignItems: "center"}}>
                                            <Icon.X/>
                                        </div>
                                        <div style={{gridColumn: 1, gridRow: 2}}>
                                            {`No. seat: ${value.seatNumber}`}
                                        </div>

                                    </div>
                                    
                                </ListGroupItem>   
                            </>
                        )    
                    })}
               
            </ListGroup>         

        </>
    )
}

export {FilmScheduleListUser};