import styled from "styled-components";


export const MessageDisplayProvider = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  button {
    color: ${props => props.theme.tx_color_secondary};
  }
  .send-message {
    background-color: ${props => props.theme.bg_color_secondary};
    border-radius: 1rem;
    
    .send-btn {
      color: ${props => props.theme.primary_color};
    }
  }
  
  .other-message, .my-message {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    p {
      width: fit-content;
      max-width: 450px;
      padding: .5rem 1rem;
      border-radius: .5rem;
      background-color: ${props => props.theme.bg_color_secondary};
      color: ${props => props.theme.tx_color_primary};
    }
    span {
      color: ${props => props.theme.tx_color_secondary};
    }
  }
  .other-message {
    align-items: flex-start; 
  }
  .my-message {
    align-items: flex-end;
  }
`;