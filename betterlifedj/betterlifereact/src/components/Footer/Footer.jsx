import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaGithub,
    FaRegCopyright,
  } from "react-icons/fa6";
  import style from "./Footer.module.css";
  import { SocialLink } from "../SocialLink/SocialLink";
  
  export const Footer = () => {
    return (
      <footer className={style.footer_container}>
        <div className={style.footer_container_grid}>
          <div className={style.footer_container_group_name}>
            <p className={style.footer_text_group_name}>Grupo 31</p>
            <SocialLink href="https://github.com/BrunoFerrada/betterLifeProject">
              <FaGithub className="text-4xl" />
            </SocialLink>
          </div>
          <div>
            <p className={style.footer_title}>¿Quienes Somos?</p>
            <div>
              <div className={style.footer_text}>
                <SocialLink href="https://github.com/diazfabrici0">
                  <FaGithub />
                </SocialLink>
                <p>Fabricio Diaz</p>
              </div>
              <div className={`${style.footer_text} my-2`}>
                <SocialLink href="https://github.com/BrunoFerrada">
                  <FaGithub />
                </SocialLink>
                <p>Ferrada Bruno</p>
              </div>
              <div className={style.footer_text}>
                <SocialLink href="https://github.com/MauroFerrada">
                  <FaGithub />
                </SocialLink>
                <p>Ferrada Mauro</p>
              </div>
            </div>
          </div>
          <div>
            <p className={style.footer_title}>Nuestras Redes sociales</p>
            <div className={style.footer_container_button}>
              <SocialLink href="https://www.facebook.com">
                <FaFacebookF
                  className={`${style.footer_button} hover:fill-blue-700`}
                />
              </SocialLink>
              <SocialLink href="https://twitter.com/">
                <FaXTwitter
                  className={`${style.footer_button} hover:fill-cyan-700`}
                />
              </SocialLink>
              <SocialLink href="https://www.instagram.com">
                <FaInstagram
                  className={`${style.footer_button} hover:fill-red-700`}
                />
              </SocialLink>
            </div>
          </div>
        </div>
        <hr className={style.horizontal_line} />
        <div className={`${style.footer_text} p-4`}>
          <FaRegCopyright />
          <p>GRUPO 31 Todos los derechos reservados, 2024</p>
        </div>
      </footer>
    );
  };
  