import styled from "styled-components";

export const LayoutProvider = styled.main`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.bg_color_primary};

  @media (max-width: 900px) {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0;
  }

  .main {
    width: 100%;
  }

  .sub-main {
    width: 100%;
    display: flex;

    @media (max-width: 989px) {
      flex-direction: column-reverse;
      flex-wrap: nowrap;
      gap: 0;
    }
  }
`;
