import styled from "styled-components";

export const TrendsProvider = styled.div`
  position: sticky;
  top: 8px;
  background-color: ${props => props.theme.bg_color_secondary};
  color: ${props => props.theme.tx_color_primary};
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 1rem;

  .sub-trend {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-bottom: 1px solid #ccc;
    padding: .5rem 0;
  }
  .sub-hd {
    color: ${props => props.theme.tx_color_secondary}
  }
  .tag {
    color: ${props => props.theme.tx_color_variant};
    /* color: ${props => props.theme.tx_color_primary}; */
    font-weight: bold;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .box {
    border: 1px solid ${props => props.theme.tx_color_secondary};
    border-radius: 1rem;
    overflow: hidden;
  }

  svg {
    color: ${props => props.theme.primary_color};
  }
`;