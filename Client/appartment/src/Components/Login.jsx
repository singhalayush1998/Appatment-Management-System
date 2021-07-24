import React, { useState } from 'react'
import loginimg from "../Assects/building.jpg"
import { useDispatch , useSelector} from 'react-redux'
import styled from "styled-components"
import socialMedia from "../Assects/logins.png"
import { loginUser } from './redux/action'
import {Redirect} from "react-router-dom"


const Login = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state=>state.login)
    const init = {
        email:"",
        password:""
    }
    const [data,setData] = useState(init)

    const handleChange=(e)=>{
        const {name , value} = e.target
        setData({...data,[name]:value})
    }
    const handleSubmit = (e)=>{
        dispatch(loginUser({...data}))
    }
    if(isAuth){
       return <Redirect to="/" push />
    }
    return (
        <Wrapper>
            <Left>
                <LeftImg src={loginimg} alt="design"/>
            </Left>
            <Right>
                <InputDiv>
                    <h3>Log In To Your Account</h3>
                    <Input placeholder="Email" onChange={handleChange} name= "email" value={data.email}/><br/>
                    <Input placeholder="Password" onChange={handleChange} name= "password" value={data.password}/>
                    <ForgotPara>Forget Password</ForgotPara>
                    <LoginButton onClick={handleSubmit}>Login</LoginButton>
                </InputDiv>
                <div style={{textAlign:"center"}}>
                    <p>or login with</p>
                    <div style={{
                        width:"40%",
                        margin:"auto",
                    }}>
                        <SocialMedia src={socialMedia} alt="google"/>
                    </div>
                    <p>Need an account ? Sign up</p>
                </div>
            </Right>
        </Wrapper>
    )
}

export {Login}

const Wrapper = styled.div`
    display:flex;
    gap:10%
`
const Left = styled.div`
    left:0;
    width:50%;
    margin-Top:-3px;
`
const LeftImg = styled.img`
    background:transparent;
    width:100%;
    height:100vh;
    left:0;
    background:transparent;
`
const Right = styled.div`
    align-items: center;
    width:50%;
`
const InputDiv = styled.div`    
    padding-top: 15%;
    width:50%;
    margin-top:50px;
    margin:auto;
`
const Input = styled.input`
    background : #FFFFFF;
    font-size:18px;
    border: 1px solid #808080;
    border-radius: 4px;
    padding:  4% ;
    width:94%;
    margin-bottom: 10px;
`
const ForgotPara = styled.p`
    color: #374375;
    text-align: right;
    font-size : 12px;
    margin-bottom: 20px
`
const LoginButton = styled.button`
    background: #1F4F73;
    border-radius: 4px;
    font-size: 18px;
    color: white;
    outline: none;
    border: none;
    width:100%;
    height: 40px;
    :hover{
        cursor: pointer;
    }
`
const SocialMedia = styled.img`
    width: 50%;
    margin:10px;
    margin:auto;
`