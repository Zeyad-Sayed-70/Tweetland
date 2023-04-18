import styled from "styled-components";


export const BookmarksProvider = styled.div`
  color: ${props => props.theme.tx_color_primary};

  .tweet-provider {
    padding: .5rem 1rem 1rem;

    .delete {
      color: tomato;
      margin-left: auto;
      margin-bottom: .5rem;
      display: block;
      opacity: 1;
      width: 40px;
      height: 40px;
    }
    &:hover {
      background-color: ${props => props.theme.bg_color_variant};
    }
  }

  .notfound {
    color: ${props => props.theme.tx_color_secondary};
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 2rem 0;
  }
`;