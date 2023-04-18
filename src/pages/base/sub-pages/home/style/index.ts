import styled from "styled-components";

export const HomeProvider = styled.div`
    /* background-color: ${props => props.theme.bg_color_secondary}; */
    padding: 0 3px;
    padding-bottom: 1rem;

    .loading, .notfound {
        color: ${props => props.theme.tx_color_secondary};
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        padding: 2rem 0;
    }

    .main-header {
        background-color: ${props => props.theme.bg_color_primary};

        p {
            color: ${props => props.theme.tx_color_primary} !important;
        }
    }
`;