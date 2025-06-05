import React from 'react';
import {Flex, Tooltip} from "antd";
import { AiFillStar } from "react-icons/ai";
import './MovieCard.css'
import {useNavigate} from "react-router-dom";

const ageRatingColors={
    "P": "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30"
}

export default function MovieHorizontalCard(props){
    const navigate = useNavigate();
    return (
        <Flex gap={10}>
            <img src={props.image} alt={'Ảnh phim'} style={{width:'64px', height:'92px', borderRadius: '5px'}}/>

            <Flex vertical gap={2}>
                <div style={{width: '24px', textAlign: 'center', fontSize: '12px', backgroundColor: `${ageRatingColors[props.ageRating]}`, borderRadius: '3px', color: '#fff'}}>{props.ageRating}</div>
                <Tooltip title={props.title}>
                    <span className='title' style={{color: '#333', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}} onClick={() => navigate(`/movie/${props.id}`)}>{props.title}</span>
                </Tooltip>
                <span style={{color: '#A69BA2', fontSize: '14px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.genres}</span>
                {props.rating !== '0.0' && props.rating
                    ?
                    <Flex gap={3} align={'center'}>
                        <AiFillStar style={{color: '#fadb14'}}/>
                        <span style={{color: '#A69BA2', fontSize: '14px'}}>{props.rating}</span>
                    </Flex>
                    :
                    <div/>
                }
            </Flex>
        </Flex>
    );
}