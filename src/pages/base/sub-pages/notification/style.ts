import styled from "styled-components";


export const NotificationProvider = styled.div`
  .main-header {
    p {
      color: ${props => props.theme.tx_color_primary};
    }
  }
  
  .loading, .notfound {
    color: ${props => props.theme.tx_color_secondary};
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 2rem 0;
  }
  
  .note {
    border-radius: 1rem;
    padding: 1.5rem;
    color: ${props => props.theme.tx_color_secondary};
    &:hover {
      background-color: ${props => props.theme.bg_color_secondary};

    }
  }
  
  .tabs {
    button {
      position: relative;
      color: ${props => props.theme.tx_color_secondary};
      &:hover {
        background-color: ${props => props.theme.bg_color_secondary};
      }
      &.active {
        background-color: ${props => props.theme.bg_color_secondary};
        &::before {
          opacity: 1;
        }
      }
      &::before {
        content: '';
        width: 100px;
        height: 5px;
        background-color: ${props => props.theme.primary_color};
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: .3s;
      }

    }
  }
`;