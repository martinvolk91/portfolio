// Skills icons - https://icon-sets.iconify.design/
import {Icon} from "@iconify/react";

// Projects Images (add your images to the images directory and import below)
import Logo from "./images/logo.svg";

// Hero Images (add your images to the /images directory with the same names)
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";
// If you change the import names above then you need to change the export names below
export {HeroLight as Light};
export {HeroDark as Dark};

/* START HERE
 **************************************************************
  Add your GitHub username (string - "YourUsername") below.
*/
export const githubUsername = "martinvolk91";

// Navbar Logo image
export const navLogo = undefined;

// Blog link icon - https://icon-sets.iconify.design/
export const Blog = <Icon icon="ph:link-bold"/>;

/* About Me
 **************************************************************
  Add a second paragraph for the about me section.
*/

export const moreInfo = (
    <>
        Hi! My name is Martin and I'm a data scientist. Over the past few years,
        I have been involved in the sports betting and gaming industry where I specialized in developing recommender
        systems and other personalization machine learning solutions. My passion is tackling challenging problems
        across various domains e.g. science, computer science, economics, logistics, robotics, and more. <br/>
        Visit <a href="#/My-Projects">My Projects</a> page if you want to check out some of my personal projects and
        demos or visit my Kaggle or GitHub profiles.
    </>
)

/* Skills
 ************************************************************** 
  Add or remove skills in the SAME format below, choose icons here - https://icon-sets.iconify.design/
*/
export const skillData = [
    {
        id: 1,
        skill: <Icon icon="devicon:python" className="display-4"/>,
        name: "Python",
    },
    {
        id: 2,
        skill: <Icon icon="devicon:git" className="display-4"/>,
        name: "Git",
    },
    {
        id: 3,
        skill: <Icon icon="devicon:scikitlearn" className="display-4"/>,
        name: "Scikit learn",
    },
    {
        id: 4,
        skill: <Icon icon="devicon:pandas-wordmark" className="display-4"/>,
        name: "Pandas",
    },
    {
        id: 5,
        skill: <Icon icon="devicon:numpy-wordmark" className="display-4"/>,
        name: "NumPy",
    },
    {
        id: 6,
        skill: <Icon icon="devicon:docker" className="display-4"/>,
        name: "Docker",
    },
    {
        id: 7,
        skill: <Icon icon="devicon:googlecloud" className="display-4"/>,
        name: "Google Cloud",
    },
    {
        id: 8,
        skill: <Icon icon="devicon-plain:django" className="display-4"/>,
        name: "Django",
    },
    {
        id: 9,
        skill: <Icon icon="mdi:matrix" className="display-4"/>,
        name: "Recommender systems",
    },
];

// Resume link (string - "https://YourResumeUrl") - I am using CloudFront to share my resume (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
export const resume = null;

/* Projects
 ************************************************************** 
  List the repo names (string - "your-repo-name") you want to include (they will be sorted alphabetically). If empty, only the first 3 will be included.
*/
export const filteredProjects = ["example-1", "example-2", "example-3"];

// Replace the defualt GitHub image for matching repos below (images imported above - lines 4-5)
export const projectCardImages = [
    {
        name: "example-1",
        image: Logo,
    },
];

export const projectData = [
    {
        image: "",
        name: 'Movie Recommender',
        description: "A movie recommender system based on the MovieLens 25M dataset.",
        homepage: "/MovieRecommender",
//        html_url: "https://www.bing.com",
    },
//    {
//        name: 'repo2',
        // other properties
//    },
    // Add more data as needed
];

/* Contact Info
 ************************************************************** 
  Add your formspree endpoint below.
  https://formspree.io/
*/
export const formspreeUrl = "https://formspree.io/f/YourEndpoint";
