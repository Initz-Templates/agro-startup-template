/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';

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

const suggestions = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
];

const Searchbar = () => {
    const [searchText, setSearchText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setShowSuggestions(true);
    };

    const clearSearch = () => {
        setSearchText('');
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchText(suggestion);
        setShowSuggestions(false);
    };

    const handleSearchButtonClick = () => {
        if (searchText.trim() === '') {
            toast.error('Please enter a search query');
            return;
        }

        performSearch();
    };

    const performSearch = () => {
        toast.success(`Searching for: ${searchText}`);
        setShowSuggestions(false);
        clearSearch(); 
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (searchText.trim() !== '') {
                performSearch();
            } else {
                toast.error('Please enter a search query');
            }
        }
    };

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchText.toLowerCase())
    );

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
                    onBlur={() => setShowSuggestions(false)}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={handleKeyPress}
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
                            zIndex: 1,
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
