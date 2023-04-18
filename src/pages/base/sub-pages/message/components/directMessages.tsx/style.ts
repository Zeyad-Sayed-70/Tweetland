import styled from "styled-components";


export const DirectMessagesProvider = styled.div`
  color: ${props => props.theme.tx_color_secondary};
  height: calc(100% - 130px);
  overflow-y: auto;
  overflow-x: hidden;
  .header {
    color: ${props => props.theme.tx_color_primary};
  }
  .direct-box {
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    transition: .3s;
    position: relative;

    &:hover, &.active {
      background-color: ${props => props.theme.bg_color_secondary};
    }
    
    &.active {
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        background-color: ${props => props.theme.primary_color};
        width: 2px;
      }
    }

    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: block;
      /* width: 100%; */
      min-width: 1px;
    }
  }
`;