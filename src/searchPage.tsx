import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import './GifGallery.css';


const API_KEY = 'd1lgw3dmuT68Vv3MCwp8wpvFOQRkFq07';

function SearchPage() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);

    const fetchGifs = useCallback(async () => {
        if (!searchTerm) return [];
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
            params: {
                api_key: API_KEY,
                q: searchTerm,
                limit: 10
            }
        });
        return response.data.data;
    }, [searchTerm]);

    const { data: searchResults, isLoading, isError } = useQuery({
        queryKey: ['gifs', searchTerm],
        queryFn: fetchGifs,
        enabled: !!searchTerm,
        placeholderData: keepPreviousData
      });

    const addToFavorites = (gif) => {
        if(!favorites.some(fav => fav.id === gif.id)) {
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
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching GIFs</p>}
                <div className="gif-gallery">
                    {searchResults && searchResults.map((gif) => (
                        <div key={gif.id} className="gif-item">
                            <img src={gif.images.fixed_height.url} alt={gif.title} className="gif-image" />
                            <button onClick={() => addToFavorites(gif)} className="favorite-button">Add to Favorites</button>
                    </div>
                ))}
            </div>
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