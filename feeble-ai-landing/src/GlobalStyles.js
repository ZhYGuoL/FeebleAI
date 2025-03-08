import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Import Neue Haas Grotesk Display font */
  @import url('https://stagnansi.github.io/nhg/ff.css');

  :root {
    --primary: #FFD633;
    --primary-light: #FFE066;
    --secondary: #333333;
    --text-dark: #222222;
    --text-light: #666666;
    --background: #FFFFFF;
    --background-alt: #F8F9FA;
    --border: #EEEEEE;
    --shadow: rgba(0, 0, 0, 0.05);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Neue Haas Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-dark);
    line-height: 1.6;
    background-color: var(--background);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Neue Haas Grotesk', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3.5rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2.8rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: 'Neue Haas Grotesk', sans-serif;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  section {
    padding: 100px 0;
    
    @media (max-width: 768px) {
      padding: 60px 0;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  
  .section-title {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .gradient-text {
    background: linear-gradient(90deg, var(--primary) 0%, #FF9900 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  /* Animation classes */
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.8s ease forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Transitions */
  .page-transition-enter {
    opacity: 0;
  }
  
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  
  .page-transition-exit {
    opacity: 1;
  }
  
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }

  .highlight {
    font-weight: 700;
    position: relative;
    display: inline-block;
  }
`;

export default GlobalStyles;
