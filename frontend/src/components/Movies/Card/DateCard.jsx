import React from 'react'

const getWeekday = (dateStr) => {
    const days = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const date = new Date(dateStr);
    return days[date.getDay()];
};

const isToday = (dateStr) => {
    const today = new Date();
    const inputDate = new Date(dateStr);

    return (
        today.getFullYear() === inputDate.getFullYear() &&
        today.getMonth() === inputDate.getMonth() &&
        today.getDate() === inputDate.getDate()
    );
};

export default function DateCard(props) {
    return (
        <div style={{transition: 'all 0.3s ease', width: "62px", height: "62px", border: `1px solid ${props.isFocus ? "#6cc832" : "#d6d1d4"}`, borderRadius: "5px", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", cursor: "pointer"}}>
            <div style={{backgroundColor: `${props.isFocus ? "#6cc832" : "#f5f4f5"}`, width: "100%", textAlign: "center", borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}}>
                <span style={{color: `${props.isFocus ? "#fff" : "#333"}`, fontWeight: "bold", fontSize: "20px"}}>{new Date(props.date).getDate()}</span>
            </div>

            <div style={{textAlign: "center"}}>
                <span style={{fontSize: '12px', color: `${props.isFocus ? "#6cc832" : "#c7c7c7"}`}}>{isToday(props.date) ? "Hôm nay" : getWeekday(props.date)}</span>
            </div>
        </div>
    );
}