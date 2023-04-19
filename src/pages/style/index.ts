import styled from "styled-components";

export const LayoutProvider = styled.main`
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
    gap: .5rem;
    background-color: ${props => props.theme.bg_color_primary};

    @media (max-width: 900px) {
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 0;
    }
`;