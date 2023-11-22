import styled from "styled-components";

export const Container = styled.div<{ resolution: [number, number] }>`
  width: ${({ resolution }) => resolution[0]}px;
  height: ${({ resolution }) => resolution[1]}px;
  margin: 10px auto;
  border: 1px solid var(--secondary);
`;
