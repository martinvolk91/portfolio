import React from "react";
import styled from "styled-components";

// Components
import {Card} from "react-bootstrap";

const StyledMovieCard = styled.div`
  .card {
    height: 60px;
    color: ${({theme}) => theme.color};
    background: ${({theme}) => (theme.name === "light" ? "" : "#797B7B")};
    box-shadow: ${({theme}) =>
    theme.name === "light"
        ? "0 3px 10px rgb(0 0 0 / 0.2)"
        : "0 3px 10px rgb(255 255 255 / 0.2)"};

    .card-title {
        font-size: 0.9rem; // Adjust the font size here
    }

    .card-link {
      text-decoration: none;
      font-size: 1.5rem;
      color: ${({theme}) => theme.color};

      &:hover {
        color: var(--primary);
      }
    }

    .card-footer {
      border-top: var(--border);
      background: ${({theme}) => (theme.name === "light" ? "" : "#404040")};
    }
  }
`;

export default function MovieCard({title, onClick}) {
    return (
        <StyledMovieCard>
            <Card onClick={onClick}>
                <Card.Body className="overflow-auto text-center">
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
            </Card>
        </StyledMovieCard>
    );
}