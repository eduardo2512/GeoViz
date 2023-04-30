/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HeaderContent from "../shared/components/HeaderContent";

function Contact() {
  return (
    <div>
      <HeaderContent title={"Contato"} />
      <p
        css={css`
          color: #656d75;
          font-family: Raleway;
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          padding-left: 24px;
          padding-bottom: 10px;
          padding-top: 10px;
        `}
      >
        Clodoveu Davis: clodoveu@dcc.ufmg.br
      </p>
      <p
        css={css`
          color: #656d75;
          font-family: Raleway;
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          padding-left: 24px;
        `}
      >
        Eduardo Dias: eduardopaivadias@gmail.com
      </p>
    </div>
  );
}

export default Contact;
