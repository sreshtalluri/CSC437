import { css } from 'lit';

const styles = css`
  e-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: var(--color-primary);
    color: white;
  }

  e-header .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  e-header .logo .icon {
    width: 2rem;
    height: 2rem;
    fill: currentColor;
  }

  e-header .logo span {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
  }

  e-header a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  e-header a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  e-header button {
    background: none;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;
  }

  e-header button:hover {
    background-color: white;
    color: var(--color-primary);
  }

  e-header .auth-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  e-header .auth-section span {
    color: white;
  }

  @media (max-width: 768px) {
    e-header {
      padding: 0.75rem 1rem;
    }

    e-header .logo span {
      font-size: 1.25rem;
    }
  }
`;

export default { styles }; 