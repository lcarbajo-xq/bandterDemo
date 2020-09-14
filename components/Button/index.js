import { colors } from "styles/theme"

export default function Button({ children, disabled, onClick }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
                button {
                    align-items: center;
                    background: ${colors.black};
                    border: 0;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    border-radius: 9999px;
                    font-size: 16px;
                    font-weight: 800;
                    padding: 8px 24px;
                    transition: opacity .3% ease:
                    user-select: none;
                }
                button[disabled] {
                  pointer-events: none;
                  opacity: 0.2;
                }

                button > :global(svg)  {
                    margin-right: 8px;
                }

                button:hover {
                    opacity: .7;
                }

            `}</style>
    </>
  )
}
