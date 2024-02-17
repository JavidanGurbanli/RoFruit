import { BiBadgeCheck, BiListCheck, BiTime } from "react-icons/bi";
import Img from "../../assets/images/about_page.webp";
import "./About.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const About = () => {
  const { t } = useTranslation(["about", "header"]);
  return (
    <section className="about">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.about")}</title>
        </Helmet>
        <h1>{t("about:header")}</h1>
        <div className="about_top">
          <div className="img">
            <img src={Img} alt="img" />
          </div>
          <div className="content">
            <h1>{t("about:topSection.title")}</h1>
            <p>{t("about:topSection.description")}</p>
          </div>
        </div>
        <div className="about_bottom">
          <h1>{t("about:bottomSection.title")}</h1>
          <ul>
            {t("about:bottomSection.listItems", { returnObjects: true }).map(
              (item, index) => (
                <li key={index}>
                  <div className="head">
                    {index === 0 && <BiBadgeCheck className="head_icon" />}
                    {index === 1 && <BiTime className="head_icon" />}
                    {index === 2 && <BiListCheck className="head_icon" />}
                    <h2>{item.title}</h2>
                  </div>
                  <p>{item.description}</p>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
