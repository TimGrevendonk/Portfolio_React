import { useOutletContext } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from 'react';
import { ActionButton } from 'components/inputs/ActionButton';
import { LinkButton } from "components/inputs/LinkButton";
import { ImageCarousel } from "components/carousel/ImageCarousel";
import { ImageCarouselItem } from "components/carousel/ImageCarouselItem";
import { LogoIcon } from 'components/icon/LogoIcon';
import projectsJSon from "assets/projects.json"
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import styles from "pages/home/homePage.module.scss";
import { NavigationContext } from "utils/contexts/navigationContext";
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';

// Home function:
export function HomePage() {
    const images = require.context('../../assets/images', true);
    const vectors = require.context('../../assets/vectors', true);
    const allProjectsShuffeled = projectsJSon
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    const {worksRef} = useContext(NavigationContext)
    const {aboutRef} = useContext(NavigationContext)
    const {skillsRef} = useContext(NavigationContext)

    ReactGA.send({hitType: 'pageview', page: window.location.pathname});


    {/* Fade on scoll test function. ==> */}
    // https://dev.to/fpaghar/how-to-check-if-an-element-is-visible-in-the-viewport-using-javascript-and-react-hook-4648
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        {
          root: null, // viewport
          rootMargin: '0px', // no margin
          threshold: 0.5, // 50% of target visible
        }
      );
  
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }
  
      // Clean up the observer
      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, []);
    {/* Fade on scoll test function. <== */}

    return (
        <>
        <Helmet>
            <title>Portfolio Tim Grevendonk</title>
            <meta
                name="description"
                content="The Portfolio website from Tim Grevendonk. To see the processes and works from throughout his bachelors degree and beyond."
                data-rh="true"
            />
            <link rel="canonical" href="/portfolio"></link>
        </Helmet>
        <section id='home' className={styles.hero}>
            <div className={"FadeInNotInfinite"}>
                <h1 className={"movedown"}>Tim Grevendonk</h1>
                <ActionButton path="/projects">
                    <h2>my projects</h2>
                </ActionButton>
            </div>
            <div>
                <ul>
                    <li className={styles.mail}>
                        <LinkButton path="mailto:<no-name-due-to-webscrapers>@hotmail.com">
                            <address>Grevendonk@</address>
                        </LinkButton>
                    </li>
                    <li>
                        <LinkButton path="https://www.linkedin.com/in/tim-grevendonk/">
                            Linkedin
                        </LinkButton>
                    </li>
                    <li className={styles.phone}>
                        <LinkButton path="#">
                        <address/>
                        </LinkButton>
                    </li>
                </ul>
            </div>
        </section>

        <section id="works" ref={worksRef} className={`${styles.works} mountain-blue`}>
            {/* Fade on scoll test. */}
            {/* <div ref={targetRef} className={`${styles.title} ${isVisible ? "FadeInNotInfinite" : ''}`}> */}
            <div className={`${styles.title}`}>
                <h2><HomeRepairServiceOutlinedIcon />Works</h2>
                <LinkButton path={"/projects"} size="small" endContent={<ArrowRightOutlinedIcon/>}>
                    All projects 
                </LinkButton>
                <ImageCarousel>
                {allProjectsShuffeled.map((project, index) => {
                    return (
                        <ImageCarouselItem key={project.id} project={project}>

                        </ImageCarouselItem>
                    );
                })}
                </ImageCarousel>
            </div>
            <div>

            </div>
        </section>

        <section id="about" ref={aboutRef} className={`${styles.about}`}>
            <div className={styles.title}>
                <h2><BadgeOutlinedIcon/>About</h2>
            </div>
            <article>
                <div>
                    <h3>Thats me</h3>
                    <p className={"popout"}>I'm a really invested person in doing it right. I would rather take a bit more time to do things thoroughly and learn everything there is to know along the way. Even if things arent part of my skills or learned knowledge I still challenge myself to get a feel for the knows hows, this way I work on my quality and contentness.</p>
                    <p className={"popout"}>Personaly I enjoy being around people who we can all share interests with. Sharing experiences, knowledge and good times!</p>
                    <p className={"popout"}>Besides learning the vast topics of the IT world I enjoy a good boardgame and a get-together. Or doing a nice activity fit for one and all like a good walk, folk games, or even something more action packed like my hobby airsofting.</p>
                </div>
                <div className={`${styles.carouselItem}`}>
                    <figure>
                        <img 
                            src={images(`./${"me-train"}.jpg`)} 
                            alt="thats me" 
                            title="me waiting for train"
                            loading="eager"
                        />
                    </figure>
                    <div className={styles.headers}>
                        <h3>Ready to go...</h3>
                        <p>on a train towards my education.</p>
                    </div>
                </div>
            </article>
        </section>

        <section id="skills" ref={skillsRef} className={`${styles.skills} mountain-blue`}>
            <div className={styles.title}>
                <h2><TipsAndUpdatesOutlinedIcon />Skills</h2>
            </div>
            <div className={`${styles.skillContent}`}>
                <div className={styles.skillCard}>
                    <h3>Programming</h3>
                    <div>
                        <LogoIcon name="Java"></LogoIcon>
                        <LogoIcon name="Csharp" cleanName="C#"></LogoIcon>
                        <LogoIcon name="Angular"></LogoIcon>
                        <LogoIcon name="React"></LogoIcon>
                    </div>
                </div>
                <div className={styles.skillCard}>
                    <h3>Tools</h3>
                    <div>
                        <LogoIcon name="Figma"></LogoIcon>
                        <LogoIcon name="Illustrator"></LogoIcon>
                        <LogoIcon name="Git"></LogoIcon>
                        <LogoIcon name="Tailwind"></LogoIcon>
                        <LogoIcon name="Photoshop"></LogoIcon>
                    </div>
                </div>
                <div className={styles.skillCard}>
                    <h3>Soft skills</h3>
                    <div>
                        <LogoIcon name="Handshake" cleanName="Social"></LogoIcon>
                        <LogoIcon name="Learn" cleanName="Learner"></LogoIcon>
                        <LogoIcon name="measure"cleanName="Detailed"></LogoIcon>
                        <LogoIcon name="Wizard" cleanName="Creative"></LogoIcon>
                    </div>
                </div>
            </div>
        </section>

        <section id="journeys" className={`${styles.journeys}`}>
            <div className={styles.title}>
                <h2><AutoStoriesOutlinedIcon />journeys</h2>
            </div>
            <div className={`${styles.journeyContent}`}>
                <LinkButton path="CV_Tim_Grevendonk" endContent={<PictureAsPdfOutlinedIcon />} pdf={true}>
                    Curriculum vitae (CV)
                </LinkButton>
                <LinkButton path={"https://thomasmore.be/nl/opleidingen/professionele-bachelor/toegepaste-informatica/application-development/geel/basistraject"} endContent={<LaunchOutlinedIcon />}>
                    Application development
                </LinkButton>
                <LinkButton path={"https://thomasmore.be/nl/opleidingen/professionele-bachelor/informatiemanagement-en-multimedia/digital-experience-design/mechelen/verkort-traject"} endContent={<LaunchOutlinedIcon />}>
                    Digital Experience Design
                </LinkButton>
                <LinkButton path={"https://en.rodekruis.be/wat-kan-jij-doen/leer-eerste-hulp/volg-een-opleiding/#wat-leer-je-tijdens-een-opleiding-ehbp"} endContent={<LaunchOutlinedIcon />}>
                    First Aid
                </LinkButton>
                <LinkButton path={"https://www.provil.be/nl/studie/operator-cnc-gestuurde-houtbewerkingsmachines-duaal"} endContent={<LaunchOutlinedIcon />}>
                    Industrial Woodworking
                </LinkButton>
                <LinkButton path={"/process"} endContent={<ArrowRightOutlinedIcon />} highlighted={true} attentionGrabbing={true}>
                   design approach
                </LinkButton>
            </div>

        </section>
        </>
    );
}

export default HomePage;
