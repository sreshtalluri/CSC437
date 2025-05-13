import { css } from "lit";

const styles = css`
    .card {
        background-color: var(--color-background-card);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
        
    .card p {
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .card p:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .card strong {
      color: var(--color-primary);
      font-weight: 600;
      margin-right: 0.5rem;
    }
`;

export default { styles }; 