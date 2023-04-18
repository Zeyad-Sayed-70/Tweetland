import styled from "styled-components";


export const TweetsProvider = styled.div`
    display: flex;
    gap: .85rem;
    padding: 1rem 1rem;
    background-color: ${props => props.theme.bg_color_secondary};
    border-radius: 10px;
    color: ${props => props.theme.tx_color_primary};

    .header {
        p {
            color: ${props => props.theme.tx_color_secondary};
        }
        p:first-of-type {
            color: ${props => props.theme.tx_color_primary};
        }
    }
    
    svg {
        color: ${props => props.theme.tx_color_secondary};
    }

    .hashtag {
        color: #179cf0;
        font-weight: bold;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    .active {
        p {
            color: #179cf0;
        }
        svg {
            color: #179cf0;
        }
    }

    .more-menu {
        background-color: ${props => props.theme.bg_color_variant};
        color: ${props => props.theme.tx_color_primary};
        z-index: 1000;
    }
`;