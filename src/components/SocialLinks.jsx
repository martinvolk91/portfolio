import React from "react";
import {useSelector} from "react-redux";
import {selectData} from "../pages/homeSlice";
import styled from "styled-components";
// Data
// Icons
import {Icon} from '@iconify/react';

const StyledSocialLinks = styled.div`
  a {
    margin: 0 1rem;
  }
`;

export default function SocialLinks() {
    const {blog, html_url} = useSelector(selectData);

    return (
        <StyledSocialLinks>
            <a
                href="https://www.kaggle.com/vuko91"
                aria-label="Check out my Kaggle profile."
                className="link-icons"
            >
                <Icon icon="simple-icons:kaggle"/>
            </a>
            <a
                href={html_url}
                aria-label="Check out my GitHub profile."
                className="link-icons"
            >
                <Icon icon="icomoon-free:github"/>
            </a>
            <a
                href="https://www.linkedin.com/in/martin-volk-43bb0061/"
                aria-label="Check out my LinkedIn profile."
                className="link-icons"
            >
                <Icon icon="fa-brands:linkedin"/>
            </a>


        </StyledSocialLinks>
    );
}
