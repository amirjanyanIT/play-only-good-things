import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  .action-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid var(--secondary);
    padding: 10px;
    flex: 1;
    .info{
      text-align: center;
    }
    .main-info {
      display: flex;
      justify-content: space-between;
      .lifes {
        display: flex;
        gap: 5px;
      }
    }
    .actions {
      display: flex;
      justify-content: center;
    }
  }
  .gameplay {
    width: 245px;
    height: 100%;
    .board {
      .line {
        display: flex;
        justify-content: space-between;
        .item {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
        }
      }
    }
    .player {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      .item {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
      }
    }
    .black-box {
      height: 60px;
      background-color: black;
    }
  }
`;
