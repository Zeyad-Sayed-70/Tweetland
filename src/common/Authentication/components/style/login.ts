import styled from "styled-components";

export const LoginProvider = styled.div`
    color: ${props => props.theme.tx_color_primary};
    
    label, .close {
        color: ${props => props.theme.tx_color_secondary};
    }
    
    .MuiInputBase-root {
        border-color: ${props => props.theme.bg_color_variant};
        input {
            color: ${props => props.theme.tx_color_primary};
        }
    }

    .login, .content {
        background-color: ${props => props.theme.bg_color_primary};
    }

    p {
        color: ${props => props.theme.tx_color_secondary};
    }

    .error {
        font-size: 12px;
        color: #d6362a;
    }
`;