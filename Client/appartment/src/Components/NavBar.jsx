import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch} from 'react-redux';
import { logout_suc } from './redux/action';


export function Navbar(){
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")

    
    const handleLogout = ()=>{
        dispatch(logout_suc())
    }

    return (
        <Wrapper>
            <Container>
                <div>
                    <input
                    placeholder="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                     <button> Search </button>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    background: #e5c8ff;
    height: 50px;
    position: fixed;
`
const Container = styled.div`
    width: 70%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    img {
        background: transparent;
        border-radius: 50%;
    }
    div{
        display: flex;
        width:50%;
    }
    input {
        width: 100%;
        height: 12px;
        margin: auto 0px;
        padding: 10px;
        font-size:15px;
        font-weight:600;
        background-color: white;
        border: none;
        outline: none;
    }
    button {
        margin-left: 0px;
        margin: auto 0px;
        padding: .45rem;
        background-color: #982bff;
        color: white;
        border: 1px solid lightgray;
        cursor: pointer;
    }
    h4{
        margin-top: 15px;
    }
`