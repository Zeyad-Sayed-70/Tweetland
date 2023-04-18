import styled from "styled-components";

export const AuthProvider = styled.div`
    max-width: 400px;
    margin: 0 auto;
    .box {
        border-color: ${props => props.theme.bg_color_variant};
    }
    .header {
        color: ${props => props.theme.tx_color_primary};
    }
    .subHeader {
        color: ${props => props.theme.tx_color_secondary};
    }
    button {
        background-color: ${props => props.theme.primary_color};
        font-weight: 600;
        color: '#fcfcfc';
        text-transform: capitalize;
    }
`;