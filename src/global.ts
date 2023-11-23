import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --primary: #72ff8a;
        --secondary: black;
    }

    html {
        box-sizing: border-box;
        font-family: 'Pixelify Sans', monospace;
        margin: 0;
    }

    body {
        font-size: 24px;
        background-color: var(--primary);
    }

    .action-view {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }    

    button {
        cursor: pointer;
        width: 200px;
        height: 50px;
        background-color: transparent;
        font-family: 'Pixelify Sans', monospace;
        border: 1px solid var(--secondary);
    }

    input {
        width: 100px;
        background-color: transparent;
        border: 1px solid var(--secondary);
        outline: none;
        margin-top: 3px;

        font-family: 'Pixelify Sans', monospace;
    }

    .title {
        margin-top: 50px;
        font-size: 4rem;
    }
`;
