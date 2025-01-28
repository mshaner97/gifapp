import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

const API_KEY = 'd1lgw3dmuT68Vv3MCwp8wpvFOQRkFq07';

function SearchPage() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
                        params: {
                            api_key: API_KEY,
                            q: searchTerm,
                            limit: 10
                }
            });
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Error fetching GIFs:', error);
        }
    };
    fetchData();
        }
    }, [searchTerm]);

    const addToFavorites = (gif) => {
        if(!favorites.some(fav => fav.id===gif.id)) {
            setFavorites([...favorites, gif]);
        }
    };

const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h2>Search</h2>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="search for gifs"
                />
                <button type="submit">Search</button>
            </form>
           <div>
                <h3>Search Results</h3>
                {searchResults.map((gif) => (
                    <div key={gif.id}>
                        <img src={gif.images.fixed_height.url} alt={gif.title} />
                        <button onClick={() => addToFavorites(gif)}>Add to Favorites</button>
                    </div>
                ))}
            </div>
            <div>
                <h3>Favorites</h3>
                {favorites.map((gif) => (
                    <div key={gif.id}>
                        <img src={gif.images.fixed_height.url} alt={gif.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;