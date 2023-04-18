import styled from "styled-components";


export const SettingProvider = styled.div`
  background-color: ${props => props.theme.bg_color_primary};
  color: ${props => props.theme.tx_color_primary};
  
  .col {
    flex: 1;
    justify-content: center;
    height: 100px;
    align-items: center;
    display: flex;
    background-color: ${props => props.theme.bg_color_secondary};
    padding: 2rem 1rem;
    width: calc(100% - 2rem);
  }
  .cont {
    display: flex;
    align-items: center;
    padding: 3rem 0;
    
    @media (max-width: 767px) {
      flex-direction: column;
      height: auto;
      gap: 1rem;
    }
  }
  
  .MuiInputBase-root {
    color: ${props => props.theme.tx_color_primary};
    border-color: red
  }
  
  label {
    color: ${props => props.theme.tx_color_secondary};
  }
`; 