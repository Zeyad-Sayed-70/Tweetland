import styled from "styled-components";

export const CTweetProvider = styled.div`
  background-color: ${props => props.theme.bg_color_secondary};
  color: ${props => props.theme.tx_color_primary};
  padding: .5rem;
  p {
    padding: 1rem 0;
  }
  
  .tx-primary {
    color: ${props => props.theme.tx_color_primary};
  }

  .tx-secondary {
    color: ${props => props.theme.tx_color_secondary};
  }

  .bg-primary {
    background-color: ${props => props.theme.bg_color_primary};
  }

  .bg-secondary {
    background-color: ${props => props.theme.bg_color_secondary};
  }
`;