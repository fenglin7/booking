import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Input } from '@smooth-ui/core-sc'

export default {
    Search: styled(Input)`
      width: 100%;
    `,
    SignInLink: styled(Link)`
        color: white;
        text-decoration: none;
    `
}  