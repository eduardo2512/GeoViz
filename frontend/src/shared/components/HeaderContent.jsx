/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function HeaderContent({ title, children }) {
  return (
    <div
      css={css`
        height: 117px;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          height: 115px;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <h2
          css={css`
            color: #656d75;
            font-family: Raleway;
            font-style: normal;
            font-weight: 700;
            font-size: 36px;
            padding-left: 24px;
          `}
        >
          {title}
        </h2>
        {children ? (
          <div
            css={css`
              padding-right: 24px;
            `}
          >
            {children}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        css={css`
          height: 2px;
          width: 100%;
          background-color: #e3e8f1;
        `}
      />
    </div>
  );
}

export default HeaderContent;
