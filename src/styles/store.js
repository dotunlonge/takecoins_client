import s from 'styled-components';

export default s.div`

.match{
    margin: 5px 0;
    display: block;
    font-size: 12px;
    &.found{
        color: teal;
    }
    &.not-found{
        color: red;
    }
}

height: 100vh;
overflow: auto;
background: #1b232d; //#1c2338;
position: relative;

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

canvas {
    margin: auto;
    display: block;
}

.form-con{

    background: white;
    padding: 20px 35px;
    z-index: 1;
    text-align: left;
    @media(min-width: 768px){
        border-radius: 5px;
    }
    div{
        .unit-price{
        label{
            text-align: right !important;
        }
            h5{
                margin: 0;
                font-size: 15px;
                border: 1px solid #d8d1d1;
                width: 95%;
                margin-left: 5%;
                height: 38px;
                text-align: center !important;
        
                line-height: 38px;
                border-radius: 5px;
                color: tomato;
            }
        }

        .form-group{
            margin: 0.95em 0;
        }

        label{
            text-align:left;
            font-size: 13px;
            color: gray;
            font-weight: 300;
            display : block;
        }
    }
}


#company-logo{
    margin-top: 20px;
    color: #6465ff;
}




.step-2{

    .form-group{
        &.bar{
            border-top: 1px solid #eee;
            padding: 15px 0 0;
            margin: 10px 0 0;
        }
    }
    h4{
        font-weight: 300;
        font-size: 16px;
        padding: .25em .5em;
        color: #666;
    }

    #refresh{
        color: darkslategray;
        font-size: 12px;
        padding: 0;
        margin: 0;
        height: 40px;
        line-height: 40px;
        float: right;

        span{
            color: red;
        }
    }

    .well{
        background: #e4e4e4;
        padding: 1em;
        border-radius: 5px;
        font-size: 13px;
        font-size: 13px;
        overflow-wrap: break-word;
        text-overflow: inherit;

        @media(max-width: 768px){
            max-width: 304px;
        }
    
    }
}


.step-0{
    .form-group{
        margin: .5em 0 !important;
    }
    a{
        font-weight: 300;
        font-size: 15px;
    }
}

p{
    color: #4a4a4a !important;
    font-size: 20px;
    text-align: center;
}
`;