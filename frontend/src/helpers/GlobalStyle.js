import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    h1{
        font-family: Metropolis;
        font-weight: medium;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: #90C3DA;
    }
    h2{
        font-family: Metropolis;
        font-weight: lighter;
        font-size: 2rem;
        color: #90C3DA;
        margin: 0;
    }
    h3{
        font-family: Metropolis;
        font-weight: lighter;
        font-size: 1rem;
        margin: 0;
    }
    h4{
        font-family: Metropolis;
        font-weight: lighter;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: #90C3DA;
        margin-top: -5px;
        margin-bottom: 5px;
    }
`

export const theme = {
    color1: 'rgb(73,122,54)',
    color1transparent: 'rgba(73,122,54, 0.25)',
    color2: 'rgb(51, 118, 182)',
    color2transparent: 'rgba(51, 118, 182, 0.25)',
    color3: 'rgb(185, 53, 73)',
    color3transparent: 'rgba(185, 53, 73, 0.25)'
};
 
export default GlobalStyle