import styled from "styled-components";

export const CreateTweetProvider = styled.div`
    margin-top: 2px;
    padding: 1rem 1.5rem;
    background-color: ${props => props.theme.bg_color_secondary};
    border-radius: 1rem;
    input {
        color: ${props => props.theme.tx_color_secondary};
        font-weight: bold;
    }
    input::placeholder {
        font-weight: bold;
        text-transform: capitalize;
    }
`;