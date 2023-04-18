import styled from "styled-components";


export const AddDirectMgsProvider = styled.div`
  background-color: ${props => props.theme.bg_color_secondary};
  color: ${props => props.theme.tx_color_primary};
  
  input {
    color: ${props => props.theme.tx_color_primary};
  }
  label {
    color: ${props => props.theme.tx_color_secondary};
  }
`;