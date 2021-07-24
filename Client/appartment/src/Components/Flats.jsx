import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from "styled-components"


export const Flats = () => {
    const isAuth = useSelector(state => state.login.isAuth);
    const [page, setPage] = useState(1);
    const [totPages, setTotPages] = useState(1);
    const [flatt, setFlatt] = useState([]);
    const [sort, setSort] = useState(0);
    const [type,setType] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:1122/flats?page=${page}&size=${3}&sort=${sort}&type=${type}`)
            .then(res => {
                console.log(res);
                setFlatt([...res.data.flats])
                setTotPages(res.data.totalPages)
            });
    }, [page,sort,type])

    if (!isAuth) {
        return <Redirect to="/login" />
    }

    return (
        <div>
               
            <div>
                <button onClick = {()=>setSort(1)}>Sort by Increasing</button>
                <button onClick = {()=>setSort(-1)}>Sort by Decreasing</button>
                <button onClick = {()=>setType("Owner")}>Fitter Owner's Flats</button>
                <button onClick = {()=>setType("Tenant")}>Filter Tendant's Flats</button>
                <button onClick = {()=>setType("null")}>All Flats</button>

            </div>
            
            <Container >
                {flatt?.map((item) =><WrapperDiv  key={item.id}>
                        <div>
                            <img style={{ height: "150px", width: "150px", border: "1px solid gray",objectFit:"cover" }} src={item.pictures} alt="" />
                        </div>
                        
                        <div  >
                            <h4>Type - {item.type}</h4>
                            <h4>Block - {item.block}</h4>
                            <h4>Flat Number - {item.flatnumber}</h4>
                        </div>
                        <div>
                            <h3>Number of Residents</h3>
                            <h3>{item.residents.length}</h3>
                            <ViewDiv>
                                <Link to={`/flat/${item._id}`}>
                                    View All
                                </Link>
                            </ViewDiv>
                        </div>
                    </WrapperDiv>
                )}
                <PaginationButtonDiv >
                    <PaginationButton disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Prev
                    </PaginationButton>
                    <PageNumber >{page}</PageNumber>
                    <PaginationButton disabled={page === totPages} onClick={() => setPage(page + 1)} >
                        Next
                    </PaginationButton>
                </PaginationButtonDiv>
            </Container>
        </div>
    )
}


const Container = styled.div`
    width:100%;
    a{
        text-decoration: none;
        color:black;
    }
`
const WrapperDiv = styled.div`
    display: flex;
    justify-content: space-around;
`
const ViewDiv = styled.div`
    
    a{
        text-decoration: none;
        color:black;
        padding:1px 5px;
        color:white;
        background:gray;
        /* border:1px solid ; */

    }
`
const PaginationButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width:120px;
    margin:auto;
    
`
const PaginationButton = styled.button`
    background-color: #55198b;
    border: solid 1px #55198b;
    color: white;
    padding: 13px 22px;
    text-transform: uppercase;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease-in-out 0s;
    :hover {
        background-color: #ffffff;
        color: #55198b;
        transition: all 0.3s ease 0s;
        transform: translateY(-3px);
    }
    :disabled{
        background-color: #c38cf3;
        border: solid 1px #c38cf3;
        color: white;
        transition:none;
        transform: none;
    
    }
`
const PageNumber = styled.div`
    display: "inline";
    margin-left: "20px";
    margin-right: "20px";
    padding: 13px 22px;
    font-size: 18px;
`