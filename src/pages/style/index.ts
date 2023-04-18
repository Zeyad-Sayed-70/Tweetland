import styled from "styled-components";

export const LayoutProvider = styled.main`
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
    gap: .5rem;
    background-color: ${props => props.theme.bg_color_primary};
`;