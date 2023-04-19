import styled from "styled-components";


export const MessagesProvider = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  color: ${props => props.theme.tx_color_primary};

  button {
    color: ${props => props.theme.tx_color_secondary};
  }
  
  @media (max-width: 1209px) {
    height: calc(100vh - 110px);
  }
  @media (max-width: 787px) {
    height: calc(100vh - 150px);
  }
  @media (max-width: 545px) {
    height: calc(100vh - 200px);
  }

  .loading {
    color: ${props => props.theme.tx_color_primary};
  }
  
  .hero {
    color: ${props => props.theme.tx_color_secondary};
  }

  input {
    padding: 1rem;
    background-color: ${props => props.theme.bg_color_secondary};
    color: ${props => props.theme.tx_color_primary};
    font-weight: bold;
  }

  @media (max-width: 900px) {
    .chat-box {
      position: fixed; 
      width: 100%;
      height: 100%; 
      top: 0; 
      z-index: 100;
      background-color: ${props => props.theme.bg_color_primary};
    }
  }
`;