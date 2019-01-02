import styled from "styled-components";


export default styled.div`

    img{
        height: 250px;
        object-fit: contain;
        width: 100%;
    }

    min-height: 100vh;
    overflow: auto;
    padding: 1em;
    padding-top: 3em;
    background: #1b232d; //#1c2338; //royalblue;
    position: relative;
    
    .up{
        position: relative;
        z-index: 1;
    }

    h1{
        font-weight: 700;
        color: snow;
        padding-bottom: 1.25em;

    }
    p{
        color: #f5f5f5;
        font-size: 25px;
        font-weight: 300;
        padding-bottom: 1.5em;
    
    }
    
    a.btn{
        margin:0  7.5px;
        background: transparent;
        border-width: 1px;
        font-size: 22px;
        font-weight: 200;
        width: 100px;
    }

`