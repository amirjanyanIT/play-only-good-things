import styled from 'styled-components';


export const Container = styled.div`
    ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        gap: 15px;
        li {
            display: flex;
            justify-content: space-between;
            gap: 50px;
            span {
                font-size: 1.3rem;
            }
            div {
                display: flex;
                align-items: center;
            }
        }
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 5px
    }
`