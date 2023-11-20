import styled from 'styled-components';


export const Container = styled.div`
    .action-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        border-bottom: 1px solid var(--secondary);
        padding: 10px;
        .lifes {
            display: flex;
            gap: 5px;
        }
    }

    .board {
        .line {
            display: flex;
            justify-content: space-between;
            gap: 5px;
            .item {
                display: flex;
                align-items: center;
            }
        }
    }

`