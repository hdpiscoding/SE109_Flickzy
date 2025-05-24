import React from 'react';
import {Flex} from "antd";
import { AiFillStar } from "react-icons/ai";
import './MovieCard.css'

const ageRatingColors={
    "P": "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30"
}

export default function MovieHorizontalCard(props){
    return (
        <Flex gap={10}>
            <img src={props.image} alt={'image'} style={{width:'64px', height:'92px', borderRadius: '5px'}}/>

            <Flex vertical gap={2}>
                <div style={{width: '24px', textAlign: 'center', fontSize: '12px', backgroundColor: `${ageRatingColors[props.ageRating]}`, borderRadius: '3px', color: '#fff'}}>{props.ageRating}</div>
                <span className='title' style={{color: '#333', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer'}}>{props.title}</span>
                <span style={{color: '#A69BA2', fontSize: '14px'}}>{props.genres}</span>
                <Flex gap={3} align={'center'}>
                    <AiFillStar style={{color: '#fadb14'}}/>
                    <span style={{color: '#A69BA2', fontSize: '14px'}}>{props.rating}</span>
                </Flex>
            </Flex>
        </Flex>
    );
}