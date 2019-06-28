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
export default GlobalStyle