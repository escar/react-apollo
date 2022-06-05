import { Fragment, KeyboardEvent, MouseEvent, useState } from 'react';

type AutocompleteProps = {
    label: string;
    filter: string;
    filteredSuggestions: Array<string>;
    selectedSuggestions: Array<string>;
    onFilterChange: (filter: string) => void;
    onSelect: (suggestion: string) => void;
    onAddSuggestions: () => void;
}

const AutoComplete = ({ label, filter, filteredSuggestions, selectedSuggestions, onFilterChange, onSelect, onAddSuggestions }: AutocompleteProps) => {
    const [active, setActive] = useState(0);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                onSelect(filteredSuggestions[active]);
                break;
            case 'ArrowUp':
                if (active === 0) {
                    return;
                }
                setActive(active - 1)
                break;
            case 'ArrowDown':
                if (active + 1 === filteredSuggestions.length) {
                    return;
                }
                setActive(active + 1)
                break;
        }
    };

    let suggestionsListComponent;

    if (filter) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <div className="suggestions">
                    <ul>
                        {filteredSuggestions.map((suggestion, index) => {
                            const classNames = [];

                            if (index === active) {
                                classNames.push('suggestion-active');
                            }

                            if (selectedSuggestions.includes(suggestion)) {
                                classNames.push('suggestion-selected');
                            }

                            return (
                                <li
                                    className={classNames.join('')}
                                    key={index}
                                    onClick={(e: MouseEvent<HTMLLIElement>) => onSelect(e.currentTarget.innerText)}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                    {selectedSuggestions.length > 0 && <button className="add-items" onClick={onAddSuggestions}>add suggestions</button>}
                </div>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No suggestions</em>
                </div>
            );
        }
    }

    return (
        <Fragment>
            <label htmlFor="search-input" className='search-input-label'>{label}</label>
            <input
                id="search-input"
                type="text"
                ref={input => input && input.focus()}
                onChange={e => onFilterChange(e.target.value)}
                onKeyDown={onKeyDown}
                value={filter}
            />
            {suggestionsListComponent}
        </Fragment>
    );
};

export default AutoComplete;