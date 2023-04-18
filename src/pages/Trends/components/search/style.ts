import styled from "styled-components";


export const SearchProvider = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  color: ${props => props.theme.tx_color_secondary};
  border-radius: 8px;
  
  svg {
    font-size: 1.5rem;
  }
  label, input {
    color: ${props => props.theme.tx_color_secondary};
  }
  .MuiAutocomplete-root {
    background-color: ${props => props.theme.bg_color_secondary};
  }

`;