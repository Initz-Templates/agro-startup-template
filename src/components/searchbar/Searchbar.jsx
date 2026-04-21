import  { useState } from 'react';
import { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/catalogService';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    border: '1px solid gray',
    borderRadius: theme.shape.borderRadius,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Searchbar = () => {
    const [searchText, setSearchText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const navigate = useNavigate();
    const historyKey = "farmstore:search-history";

    useEffect(() => {
        const loadSuggestions = async () => {
            try {
                const products = await getProducts();
                const names = Array.isArray(products)
                    ? products.map((product) => product.product_name).filter(Boolean)
                    : [];
                setSuggestions(names);
            } catch (error) {
                console.error("Failed to fetch search suggestions", error);
            }
        };

        loadSuggestions();

        const storedHistory = localStorage.getItem(historyKey);
        if (storedHistory) {
            try {
                const parsed = JSON.parse(storedHistory);
                if (Array.isArray(parsed)) {
                    setSearchHistory(parsed);
                }
            } catch (error) {
                console.error("Failed to parse search history", error);
            }
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setShowSuggestions(true);
    };

    const clearSearch = () => {
        setSearchText('');
        setShowSuggestions(false);
    };

    const saveSearchHistory = (value) => {
        const query = value.trim();
        if (!query) return;

        const updated = [query, ...searchHistory.filter((item) => item.toLowerCase() !== query.toLowerCase())].slice(0, 8);
        setSearchHistory(updated);
        localStorage.setItem(historyKey, JSON.stringify(updated));
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchText(suggestion);
        setShowSuggestions(false);
        navigate(`/products?q=${encodeURIComponent(suggestion)}`);
        saveSearchHistory(suggestion);
        clearSearch();
    };

    const handleSearchButtonClick = () => {
        if (searchText.trim() === '') {
            toast.error('Please enter a search query');
            return;
        }

        performSearch();
    };

    const performSearch = () => {
        const query = searchText.trim().toLowerCase();
        const match = suggestions.find((item) => item.toLowerCase().includes(query));
        toast.success(match ? `Showing results for: ${searchText}` : `No exact match found for: ${searchText}`);
        setShowSuggestions(false);
        navigate(`/products?q=${encodeURIComponent(searchText.trim())}`);
        saveSearchHistory(searchText);
        clearSearch();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (searchText.trim() !== '') {
                performSearch();
            } else {
                toast.error('Please enter a search query');
            }
        }
    };

    const filteredSuggestions = searchText.trim()
        ? suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(searchText.toLowerCase())
        )
        : searchHistory;

    return (
        <div>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    value={searchText}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                        window.setTimeout(() => setShowSuggestions(false), 100);
                    }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyDown={handleKeyDown}
                />
                {searchText && (
                    <IconButton
                        onClick={clearSearch}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            padding: theme => theme.spacing(1),
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                <IconButton
                    onClick={handleSearchButtonClick}
                    sx={{
                        position: 'absolute',
                        left: 8,
                        padding: theme => theme.spacing(1),
                    }}
                >
                    <SearchIcon />
                </IconButton>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1400,
                            maxHeight: 'min(320px, calc(100vh - 120px))',
                            overflowY: 'auto',
                        }}
                    >
                        {filteredSuggestions.map((suggestion, index) => (
                            <MenuItem
                                key={index}
                                onMouseDown={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </MenuItem>
                        ))}
                    </Paper>
                )}
            </Search>
        </div>
    );
};

export default Searchbar;
