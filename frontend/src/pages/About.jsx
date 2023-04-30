/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HeaderContent from "../shared/components/HeaderContent";

function About() {
  return (
    <div>
      <HeaderContent title={"Sobre"} />
      <p
        css={css`
          color: #656d75;
          font-family: Raleway;
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          padding-left: 24px;
          text-indent: 4rem;
          padding-top: 10px;
        `}
      >
        O GeoViz foi desenvolvido por Eduardo de Paiva Dias, aluno de gradução de Ciência da
        Computação da Universidade Federal de Minas Gerais. Além disso, esse trabalho foi realizado
        sob a orientação do Professor Dr. Clodoveu Davis Jr. como projeto de conclusão de curso.
      </p>
    </div>
  );
}

export default About;
