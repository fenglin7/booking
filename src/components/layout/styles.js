import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom'
import { Input } from '@smooth-ui/core-sc'

export default {
    Search: styled(Input)`
      width: 100%;
    `,
    SignInLink: styled(Link)`
        color: white;
        text-decoration: none;
    `,
    Initials: styled(NavLink)`
        background-color: #757575;
        display: inline-block;
        color: #fff;
        position: relative;
        overflow: hidden;
        z-index: 1;
        width: 40px;
        height: 40px;
        line-height: 40px;
        padding: 0;
        border-radius: 50%;
        -webkit-transition: background-color .3s;
        transition: background-color .3s;
        cursor: pointer;
        vertical-align: middle;
        margin-top: -2px;
        margin-left: 15px;
        margin-right: 15px;
        text-decoration: none;
        text-align: center;
        letter-spacing: .5px;
    `,
    NavStyled: styled(NavLink)`
        transition: background-color .3s;
        font-size: 1rem;
        color: #fff;
        display: block;
        padding: 0 15px;
        cursor: pointer;
        text-decoration: none;
    `,
    AStyled: styled.a`
        transition: background-color .3s;
        font-size: 1rem;
        color: #fff;
        display: block;
        padding: 0 15px;
        cursor: pointer;
    `
}  