import React, {useState, useEffect} from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import MovieCard from "../components/movie-recommender/MovieCard";
import {
    FormControl,
    InputGroup,
    Pagination,
    Button
} from "react-bootstrap";
import {Icon} from "@iconify/react";

const ListsContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ListWrapper = styled.div`
  flex: 1;
  margin: 8px;
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div`
  flex: 1;
  padding: 16px;
  border: 1px solid #ccc;
  overflow-y: auto; /* Add scroll when content exceeds the container height */
  max-height: ${(props) => props.maxHeight}px;
`;

const ListTitle = styled.h3`
  background-color: white; /* Change this background color as needed */
  position: sticky;
  top: 0;
  z-index: 1;
`;

const CenteredButton = styled(Button)`
  margin-top: 45vh; /* Add margin to separate from lists */
  height: 50px
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledPagination = styled(Pagination)`
  margin: 0;
`;

function ImplicitMovieRecommend() {
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);
    const [loading, setLoading] = useState(false);
    const [crunchAgain, setCrunchAgain] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10; // Adjust the number of items per page as needed

    const handleTransfer = (item, sourceList) => {
        console.log(sourceList)
        if (sourceList === 'list1') {
            setList1(list1.filter((i) => i !== item)); // removes the item from list1
            setList2([...list2, item]); // adds the item to list 2
        } else if (sourceList === 'list2') {
            setList2(list2.filter((i) => i !== item));
            setList1([...list1, item]);
        }
        setCrunchAgain(false)
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    async function sendSelection() {
        setLoading(true);
        console.log("Sent")

        const movieIds = list2.map((item) => item.movie_id);

        const postData = {
            movie_ids: movieIds,
        };
                fetch('http://www.martinvolk.me:8080/api/recommend', {
//        fetch('http://localhost:5000/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data);
                setList3(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setLoading(false);
        setCrunchAgain(true)
    };

    useEffect(() => {
        // Replace with the public S3 URL of your CSV file
        const s3CsvUrl = 'https://s3.eu-west-1.amazonaws.com/martinvolk.me/movies_recommender/movies.csv';

        fetch(s3CsvUrl)
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        setList1(result.data);
                    },
                });
            })
            .catch((error) => {
                console.error('Error fetching CSV:', error);
            });
    }, [currentPage]);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredData = list1.filter((row) =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    return (
        <>
            <div>
                How to use: Select a few movies from the left most column by clicking on the cards. You can use search to browse among 60k+ movies.
                You can remove the movies from your selection the same way. Once ready, click the "Crunch" button to "crunch the numbers" and you will
                receive a list of top 10 movies recommendations based on your selection.
            </div>
            <ListsContainer>
                <ListWrapper>
                    <ListTitle>Select movies</ListTitle>
                    <ListContainer>
                        <InputGroup className="mx-auto mb-3">
                            <InputGroup.Text id="search">
                                <Icon icon="ic:round-search"/>
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Search movies"
                                aria-label="Search projects"
                                aria-describedby="search"
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                        <ul>
                            {filteredData
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((row, index) => (
                                    <MovieCard key={index} title={JSON.stringify(row.title)}
                                               onClick={() => handleTransfer(row, 'list1')}>
                                    </MovieCard>
                                ))}
                        </ul>
                        <PaginationContainer>
                            <StyledPagination>
                                <Pagination.Prev
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                {startPage > 1 && (
                                    <>
                                        <Pagination.Item onClick={() => goToPage(1)}>
                                            1
                                        </Pagination.Item>
                                        {startPage > 2 && (
                                            <Pagination.Ellipsis disabled />
                                        )}
                                    </>
                                )}
                                {Array.from({length: endPage - startPage + 1}).map((_, index) => (
                                    <Pagination.Item
                                        key={startPage + index}
                                        onClick={() => goToPage(startPage + index)}
                                        active={startPage + index === currentPage}
                                    >
                                        {startPage + index}
                                    </Pagination.Item>
                                ))}
                                {endPage < totalPages && (
                                    <>
                                        {endPage < totalPages - 1 && (
                                            <Pagination.Ellipsis disabled />
                                        )}
                                        <Pagination.Item onClick={() => goToPage(totalPages)}>
                                            {totalPages}
                                        </Pagination.Item>
                                    </>
                                )}
                                <Pagination.Next
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                />
                            </StyledPagination>
                        </PaginationContainer>
                    </ListContainer>
                </ListWrapper>
                <ListWrapper>
                    <ListTitle>Your selection</ListTitle>
                    <ListContainer>
                        <ul>
                            {list2.map((item) => (
                                <MovieCard
                                    key={item.movie_id} // Correctly uses a unique key prop
                                    title={item.title}
                                    onClick={() => handleTransfer(item, 'list2')}
                                >
                                </MovieCard>
                            ))}
                        </ul>
                    </ListContainer>
                </ListWrapper>
                <CenteredButton variant="primary" onClick={sendSelection} disabled={loading}>
                    {/*{loading ? 'Loading...' : 'Crunch'}*/}
                    {loading ? 'Loading...' : crunchAgain ? 'Crunch Again' : 'Crunch'}
                </CenteredButton>
                <ListWrapper>
                    <ListTitle>Top 10 recommended for you</ListTitle>
                    <ListContainer>
                        <ul>
                            {list3.map((item) => (
                                <MovieCard key={item} title={item}>
                                </MovieCard>
                            ))}
                        </ul>
                    </ListContainer>
                </ListWrapper>
            </ListsContainer>
        </>
    );
}

export default ImplicitMovieRecommend;
