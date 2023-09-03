import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MovieCard from "../components/movie-recommender/MovieCard";
//import axios from 'axios'; // Import Axios

// Styled components for the lists
const ListsContainer = styled.div`
  display: flex;
`;

const List = styled.div`
  flex: 1;
  padding: 16px;
  border: 1px solid #ccc;
  margin: 8px;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    cursor: pointer;
    padding: 8px;
    margin: 4px 0;
    background-color: #f4f4f4;
  }
  li:hover {
    background-color: #ddd;
  }
`;

function ListTransferApp() {
    const [list1, setList1] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTransfer = (item, sourceList) => {
        console.log(sourceList)
        if (sourceList === 'list1') {
            setList1(list1.filter((i) => i !== item)); // removes the item from list1
            setList2([...list2, item]); // adds the item to list 2
        } else if (sourceList === 'list2') {
            setList2(list2.filter((i) => i !== item));
            setList1([...list1, item]);
        }
    };

    const fetchDataFromApi = async () => {
        setLoading(true);
        try {
            // Simulate an API call with a timeout
            await new Promise((resolve) => setTimeout(resolve, 1000));
//      const response = await axios.get('https://api.example.com/data'); // Replace with your API endpoint
//      setList3(response.data); // Assuming the API response is an array
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        // Fetch data when the component mounts
        fetchDataFromApi();
    }, []);

    return (
        <ListsContainer>
            <List>
                <h3>List 1</h3>
                <ul>
                    {list1.map((item) => (
                        <MovieCard key={item} title={item} onClick={() => handleTransfer(item, 'list1')}>
                            {item}
                        </MovieCard>
                    ))}
                </ul>
            </List>
            <List>
                <h3>List 2</h3>
                <ul>
                    {list2.map((item) => (
                        <MovieCard key={item} title={item} onClick={() => handleTransfer(item, 'list2')}>
                            {item}
                        </MovieCard>
                    ))}
                </ul>
            </List>
            <List>
                <h3>List 3</h3>
                <ul>
                    {list3.map((item) => (
                        <li key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
            </List>
            <div>
                <button onClick={fetchDataFromApi} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Data'}
                </button>
            </div>
        </ListsContainer>
    );
}

export default ListTransferApp;
