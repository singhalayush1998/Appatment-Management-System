import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from "styled-components"


export const OneFlat = () => {
    const isAuth = useSelector(state => state.login.isAuth);
    const [data, setData] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:1122/flats/${id}`)
            .then(res => {
                console.log(res.data.residents)
                setData(res.data.residents);
            });

    }, [id])

    if (!isAuth) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <div style={{ display: "flex",flexWrap:"wrap",width:"80%",justifyContent:"space-between",margin:"auto"}}>
                {data?.map(item => <div style={{border:"1px solid black" ,padding:"20px", marginBottom:"10px"}}>
                    <h4>Name - {item.name}</h4>
                    <h4>age - {item.age}</h4>
                    <h4>Gender - {item.gender}</h4>
                </div>)}
            </div>
        </div>
    )
}
