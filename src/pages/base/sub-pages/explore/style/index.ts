import styled from "styled-components";


export const ExploreProvider = styled.div`
    .main-header {
        p {
            color: ${props => props.theme.tx_color_primary};
        }
    }
    .hashtag {
        .tag {
            color: ${props => props.theme.tx_color_variant};
        }
        p, button {
            color: ${props => props.theme.tx_color_primary};
        }
        p:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
    p {
        color: ${props => props.theme.tx_color_secondary};
    }
    .box {
        transition: .3s;
        cursor: pointer;
        &:hover {
            background-color: ${props => props.theme.bg_color_secondary};
        }
    }
`;