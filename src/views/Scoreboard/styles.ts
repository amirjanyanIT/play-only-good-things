import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .board {
        flex: 1;
        overflow: auto;    
        width: 100%;

        .line {
            display: flex;
            border-bottom: 1px solid var(--secondary);
            > div {
                flex: 1;
            }
            .score {
                padding-left: 10px;
                border-left: 1px solid var(--secondary)
            }
        }
    }
    .actions {
        margin-bottom: 5px;
    }
`