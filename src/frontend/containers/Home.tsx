import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import AutoComplete from '../components/Autocomplete';

const GET_SUGGESTIONS = gql`
query listOfSuggestions($filter: String!) {
    listOfSuggestions(filter: $filter) 
}
`;

const ADD_SUGGESTIONS = gql`
        mutation($items: [String]) {
            getSuggestionWithDate(items: $items) 
        }
`;

export default function Home() {
    const [filteredSuggestions, setFilteredSuggestions] = useState<Array<string>>([]);
    const [selectedSuggestions, setSelectedSuggestions] = useState<Array<string>>([]);
    const [addedSuggestions, setAddedSuggestions] = useState<Array<string>>([]);
    const [filter, setFilter] = useState<string>('');
    const isMounted = useRef(false)

    const [ loadSuggestions ] = useLazyQuery(GET_SUGGESTIONS, { onCompleted: (data) => setFilteredSuggestions(data.listOfSuggestions) });

    useEffect(() => {

        if(!isMounted.current){
            isMounted.current = true;
            return;
        }

        loadSuggestions({variables: { filter } });
    }, [filter.length]);

    const toggleSuggestion = (suggestion: string) => {
        let suggestions: Array<string>;

        if (selectedSuggestions.includes(suggestion)) {
            suggestions = selectedSuggestions.filter(s => s !== suggestion);
        } else {
            suggestions = [...selectedSuggestions, suggestion];
        }
        setSelectedSuggestions(suggestions);
    };

    const [ addSuggestionsMutation ] = useMutation(ADD_SUGGESTIONS, { onCompleted: (data) => setAddedSuggestions(data.getSuggestionWithDate) });

    const addSuggestions = () => {
        addSuggestionsMutation({ variables: { items: selectedSuggestions } });
        setFilter('')
        setSelectedSuggestions([])
        setFilteredSuggestions([])
    };

    return (
        <div>
            <AutoComplete
                label="Select suggestions:"
                filter={filter}
                filteredSuggestions={filteredSuggestions}
                selectedSuggestions={selectedSuggestions}
                onFilterChange={setFilter}
                onSelect={toggleSuggestion}
                onAddSuggestions={addSuggestions}
            />
            <div className="added-suggestions">
                {addedSuggestions.map((suggestion, index) => {
                    return (
                        <li key={index}>{suggestion}</li>
                    );
                })}
            </div>
        </div>
    );
}