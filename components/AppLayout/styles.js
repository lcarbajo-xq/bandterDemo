import css from "styled-jsx/css"

import { fonts, colors, breakpoints } from "styles/theme"

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${colors.primary} 1px, transparent 1px),
      radial-gradient(${colors.secondary} 1px, transparent 1px);
    background-position: 0 0, 25px, 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
  textarea {
    font-family: ${fonts.base};
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100%;
    position: relative;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
