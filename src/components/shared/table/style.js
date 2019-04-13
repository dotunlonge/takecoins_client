import s from 'styled-components';

export const DW = s.div`
    h3{
        font-size :15px;

    }

    p{
        color:#eee;
    }

    button{
        width: 100px;
        border: 50px;
        line-height 40px;
        height: 40px;
        margin: 15px;
        padding: 0;
        
        background: transparent;
        color: white;
        cursor: pointer;

        border: 2px solid white;
        border-radius: 5px;

        &:hover{
            background: white;
            color: #444;
        }
    }


`;

const Tw = s.div`

.filter{
    padding: 1em;
}

.fetching{
    padding: 1em;
}

.options{
    a,button{
        margin-right: 15px;
        font-size: 14px;
    }
}
    #details{
        border-bottom: 1px solid #eee;
        padding: .5em 0;
        color: #777;
        font-size: 14px;
        text-align: center;
        margin: 0;
    }
    background: white;

    .th{
        padding: 1em;
        border-bottom: 1px solid #eee;
        h5{
            margin: 0;
            display: block;
            font-size: 15px;
        }
        & + .th{
            border-left: 1px solid #eee;
            
        }
    }

    .rowed{
        & + .rowed{
        border-top: 1px solid #eee;
        }
    }

    .td{
        min-height: 380px;
        & + .td{
            border-left: 1px solid #eee;
        }
        
        padding: 0 1em 1em;
        
        label{
            font-size: 12px;
            font-weight: 900;
            color: #555;
            margin: 15px 0 5px;
            display: block;
        }

        button{
            font-size: 14px;
        }

        a{
            font-size: 14px;
        }

        p{    
            overflow-wrap: break-word;
            font-size: 13px;
            font-weight: 300;
            color: slategray;
        }

        a.hash{
            display: block;
            font-size: 13px;
            font-weight: 300;
        
        }
    }

    #showOnly{
        height: 50px;
        background: transparent;
        margin: 2em 2em 0em;
        font-size: 14px;
        width: 200px;
        border-color: #ddd;
    }
`;

export default Tw;
