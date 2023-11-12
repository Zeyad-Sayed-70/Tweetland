import styled from "styled-components";

export const NavigationProvider = styled.main`
  width: 200px;
  position: sticky;
  top: 0px;
  padding: 2rem 4rem;
  @media (max-width: 1200px) {
    width: calc(100% - 48px);
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1.5rem 2rem;

    .logo-box {
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: 787px) {
    padding: 1rem;
    gap: 1rem;
    flex-direction: column;
    svg {
      font-size: 25px;
    }
  }
  .ul {
    @media screen and (max-width: 1200px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 auto;
    }
    @media screen and (max-width: 787px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .list {
    transition: 0.3s;
    user-select: none;

    .title,
    svg {
      color: ${(props) => props.theme.tx_color_secondary};
    }

    &:hover {
      background-color: ${(props) => props.theme.bg_color_secondary};
    }
    &.active {
      background-color: ${(props) => props.theme.bg_color_secondary};
      color: ${(props) => props.theme.primary_color};
      .title,
      svg {
        color: ${(props) => props.theme.primary_color};
      }
    }

    @media screen and (max-width: 1200px) {
      .title {
        display: none;
      }
    }
    @media screen and (max-width: 787px) {
      svg {
        font-size: 25px;
      }
    }
  }
`;
