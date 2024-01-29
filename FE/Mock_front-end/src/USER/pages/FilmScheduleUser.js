import React, { useState } from "react";
import daysOfWeek from "../../utils/DaysOfWeek";

import{
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import * as Icon from 'react-feather';

import "../../css/general.scss";


function FilmScheduleList(props) {

    //console.log(props);

    var scheduleMap = new Map();
    
    props.schedules.forEach(element => {
        let d = new Date(element.timeSlot);
        let seatNumber = element.seatNumber;
        
        let date = `${d.getMonth() + 1}-${d.getDate()}`;
        let hour = d.toLocaleTimeString();

        if (scheduleMap.get(date) === undefined) {
            scheduleMap.set(date, {});
        }
        Object.assign(scheduleMap.get(date), {id: element.scheduleId, hour: hour, seatNumber: seatNumber});
    });
    
    //console.log(scheduleMap);

    const handleDelete = (e) => {
        //console.log(e.currentTarget);
        //console.log(props.schedules);
        //console.log("event", e);
        let d = e.currentTarget.id;
        //scheduleMap.delete(e.currentTarget.id);

        let newSchedules = props.schedules.filter((value, index) => {
            return !value.timeSlot.includes(d);
        })
        //console.log("d:", d, newSchedules, scheduleMap);
        props.setField("filmSchedules", newSchedules);

        // for (let i = 0; i < props.schedules.length; i++)
        //     if (props.schedules[i].timeSlot.startsWith(d)) {
        //         props.schedules.splice(i, 1);
        //     }
        //props.setField("filmSchedules", props.schedules);
    }

    const handleChange = (values) => {

    }

    return (
        <> 
            <ListGroup horizontal style={{borderBottom: "1px solid", borderColor: "#002843", borderRadius: 0}}>
                
                    {Array.from(scheduleMap).map(([key, value], idx) => {
                        return (
                            <>
                                <ListGroupItem  key={key} className="film-infor-schedule-list-item" >
                                    <div style={{display: "grid"}}>
                                        <div style={{fontWeight: "bold", gridRow: 1, gridColumn: 1}} >
                                            {
                                                (() => {
                                                    let d = new Date(key);
                                                    let day = d.getDay();
                                                    let date = `${d.getMonth() + 1}/${d.getDate()}`;
                                                    return `${daysOfWeek[day]} - ${date}`;
                                                })()
                                            }
                                        </div>
                                        <div id={key} onClick={handleDelete} className="film-infor-schedule-close" style={{gridColumn: 2, gridRow: "1 / 3", alignItems: "center"}}>
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

export {FilmScheduleList};