import styled from 'styled-components';

export default styled.div`
background: white;
    .large-menu{
        nav{
            background: black;
            width: 100%;
            float: left;
            .inner {
                float: right;
                li {
                    list-style-type: none;
                    display: inline-block;

                    a{
                        display: block;
                        padding: 1em;
                        text-decoration: none;  
                        color: white;
                        font-weight: 300;                  
                    }
                }

            }
        }
    }

    .small-menu{

        div[role='button']{
            background: white;
            float: left;
            clear: both;
            height: auto;
            width: 100%;
            button{
                float: right;
                margin: .5em 1em;
                background: white;
                border: 0;
                color: #736565;
                font-weight: 100;
                font-size: 18px;
                
            }
        }
        nav{
            background: white;
            width: 100%;
            .inner {
                li {
                    list-style-type: none;
                    display: block;
                    background: white;

                    a{
                        display: block;
                        padding: 1em;
                        text-decoration: none;                    
                    }
                }

            }
        }
    }
`;