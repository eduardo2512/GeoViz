/** @jsxImportSource @emotion/react */
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Logo from "../assets/logoGithub.svg";

function Layout({ children }) {
  return (
    <>
      <AppBar
        aria-label="Cabeçalho GeoViz"
        css={css`
          background-color: #394b59;
          height: 70;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
        position="sticky"
      >
        <Toolbar
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                width: 100%;
              `}
            >
              <Typography
                css={css`
                  color: #ffffff;
                  font-family: Raleway;
                  font-style: normal;
                  font-weight: 800;
                  font-size: 36px;
                  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                `}
              >
                GeoViz
              </Typography>
              <div
                css={css`
                  display: flex;
                  width: 740px;
                  padding-left: 100px;
                  justify-content: space-between;
                `}
              >
                <Link
                  to={"/"}
                  css={css`
                    &:link {
                      text-decoration: none;
                    }
                    &:hover {
                      color: #e0e0e0;
                      text-decoration: none;
                    }
                    color: #ffffff;
                    font-family: Raleway;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 24px;
                    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                  `}
                >
                  Inicio
                </Link>
                <Link
                  to={"/contato"}
                  css={css`
                    &:link {
                      text-decoration: none;
                    }
                    &:hover {
                      color: #e0e0e0;
                      text-decoration: none;
                    }
                    color: #ffffff;
                    font-family: Raleway;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 24px;
                    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                  `}
                >
                  Contato
                </Link>
                <Link
                  to={"/sobre"}
                  css={css`
                    &:link {
                      text-decoration: none;
                    }
                    &:hover {
                      color: #e0e0e0;
                      text-decoration: none;
                    }
                    color: #ffffff;
                    font-family: Raleway;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 24px;
                    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                  `}
                >
                  Sobre
                </Link>
              </div>
            </div>

            <Link
              to={"https://github.com/"}
              css={css`
                &:link {
                  text-decoration: none;
                }
                &:hover {
                  color: #e0e0e0;
                  text-decoration: none;
                }
                color: #ffffff;
                font-family: Raleway;
                font-style: normal;
                font-weight: 600;
                font-size: 24px;
                text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                width: 24;
                display: flex;
                align-items: flex-end;
                gap: 10px;
              `}
            >
              <img
                height={25}
                src={Logo}
                alt="Logo GitHub"
                draggable={false}
                css={css`
                  &:hover {
                    color: #e0e0e0;
                  }
                `}
              />
              GitHub
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <main
        css={css`
          height: calc(100% - 64px);
        `}
      >
        {children}
      </main>
    </>
  );
}

export default Layout;
