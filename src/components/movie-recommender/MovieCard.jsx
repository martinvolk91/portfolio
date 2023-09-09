import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Card} from "react-bootstrap";

const StyledMovieCard = styled.div`
  .card {
    height: 60px;
    display: flex;
    justify-content: space-between; /* Add this to align items side by side */
    align-items: center;
    color: ${({theme}) => theme.color};
    background: ${({theme}) => (theme.name === "light" ? "" : "#797B7B")};
    box-shadow: ${({theme}) =>
    theme.name === "light"
        ? "0 3px 10px rgb(0 0 0 / 0.2)"
        : "0 3px 10px rgb(255 255 255 / 0.2)"};

    .card-title {
      font-size: 0.9rem;
      text-align: ${({rankStatus}) => (rankStatus === "ranked" ? "left" : "center")}; // Align title left when ranked
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
      background: ${({theme}) =>
    theme.name === "light" ? "" : "#404040"};
    }
  }
`;

const CardBodyWithFlex = styled(Card.Body)`
    display: flex;
    justify-content: space-between;
    align-items: right; /* Vertically center the elements */
    width: 100%;
`;

const TitleWrapper = styled.div`
    margin-right: auto;
`;

const StarRatingContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const Star = styled.span`
    color: ${({ filled, hovered }) =>
    (hovered || filled) ? "gold" : "gray"}; /* Change color based on hovered and filled props */

    font-size: 1.2rem;
    cursor: pointer;
    margin-right: 5px;

`;

export default function MovieCard({title, onClick, rankStatus, initialRating}) {
    const [rating, setRating] = useState(initialRating !== undefined ? initialRating : 0);
    const [hovered, setHovered] = useState(null);

    const handleStarClick = (newRating) => {
        setRating(newRating);
    };

    useEffect(() => {
        // Update the rating when the initialRating prop changes
        if (initialRating !== undefined) {
            setRating(initialRating);
        }
    }, [initialRating]);

    return (
        <StyledMovieCard rankStatus={rankStatus}>
            <Card onClick={onClick}>
                {rankStatus === "ranked" ? (
                    <CardBodyWithFlex className="overflow-auto">
                        <TitleWrapper>
                            <Card.Title>{title}</Card.Title>
                        </TitleWrapper>
                        <StarRatingContainer>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Star
                                    key={value}
                                    filled={value <= rating}
                                    hovered={value <= hovered} // Pass hovered state to Star component
                                    onMouseEnter={() => setHovered(value)} // Set hovered state on mouse enter
                                    onMouseLeave={() => setHovered(null)} // Reset hovered state on mouse leave
                                    onClick={() => handleStarClick(value)}
                                >
                                    ★
                                </Star>
                            ))}
                        </StarRatingContainer>
                    </CardBodyWithFlex>
                ) : (
                    <Card.Body className="overflow-auto text-center">
                        <Card.Title>{title}</Card.Title>
                    </Card.Body>
                )}
            </Card>
        </StyledMovieCard>
    );
}
