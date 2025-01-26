import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'd1lgw3dmuT68Vv3MCwp8wpvFOQRkFq07';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
                {searchResults.map((gif) => (
                    <div key={gif.id}>
                        <img src={gif.images.fixed_height.url} alt={gif.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;