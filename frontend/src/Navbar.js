import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 50px;
    width: 100vw;
    background: #215474;
    display: flex;
    align-items: center;
    padding: 0 25px;
`

export default class Navbar extends React.Component {
    render(){
        return (<NavWrapper>
                <img src="assets/vmware.logo.png" width="125px"></img>
        </NavWrapper>)
    }
}