import React from 'react'
import './MovieCard.css'

export default function ScheduleCard(props) {
    return (
        <div className="schedule-card" style={{transition: "background-color 0.3s ease", width:'120px', height:'32px', backgroundColor: `#fff`, borderRadius: '5px', border: `1px solid #6cc832`, cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span className="schedule-span" style={{transition: "color 0.3s ease", color: `#6cc832`, fontWeight: 'bold'}}>{props.from} ~ {props.to}</span>
        </div>
    );
}