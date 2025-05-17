import React from 'react'
import {Tooltip} from "antd";

export default function CinemaCard(props) {
    return (
        <div style={{transition: 'all 0.3s ease', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "64px", height: "72px", cursor: "pointer"}}>
            <img src={props.cinemaIcon} alt={"icon"} style={{borderRadius: "10px", width: "50px", height: "50px", border: `1px solid ${props.isFocus ? "#6cc832" : "#d6d1d4"}`}}/>

            <Tooltip title={props.cinemaName}>
                <span style={{color: `${props.isFocus ? "#6cc832" : "#c7c7c7"}`, fontWeight: 600, fontSize: "12px", display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.cinemaName}</span>
            </Tooltip>
        </div>
    );
}