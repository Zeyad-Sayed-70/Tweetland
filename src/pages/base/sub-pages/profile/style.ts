import styled from "styled-components";

export const ProfileProvider = styled.div`
  color: ${props => props.theme.tx_color_secondary};
  padding: 1rem 0;

    .loading, .notfound {
      color: ${props => props.theme.tx_color_secondary};
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      padding: 2rem 0;
    }

  .banar {
    height: 250px;
    background-color: ${props => props.theme.bg_color_variant};
  }

  .title {
    color: ${props => props.theme.tx_color_primary};
  }
  
  .sub-title {
    color: ${props => props.theme.tx_color_secondary};
  }
  
  button {
    /* color: ${props => props.theme.tx_color_primary}; */
  }
`;