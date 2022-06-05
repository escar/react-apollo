import { render } from '@testing-library/react';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import AutoComplete from '../components/Autocomplete';

describe('Home page', () => {
    it('Renders text input', async () => {
        
    
      const renderElement = render(
        <MockedProvider addTypename={false}>
            <AutoComplete 
                label='input label' 
                filter='filter' 
                filteredSuggestions={[]} 
                selectedSuggestions={[]} 
                onFilterChange={() => console.log('filter')}
                onAddSuggestions={() => console.log('add')}
                onSelect={() => console.log('select')} />
        </MockedProvider>);
    
      const label = renderElement.getByText(/input label/)
      expect(label).toBeTruthy();
    });
    
    it('Renders suggestions list', async () => {
      const renderElement = render(
        <MockedProvider addTypename={false}>
            <AutoComplete 
                label='input label' 
                filter='filter' 
                filteredSuggestions={['1', '2', '3']} 
                selectedSuggestions={[]} 
                onFilterChange={() => console.log('filter')}
                onAddSuggestions={() => console.log('add')}
                onSelect={() => console.log('select')} />
        </MockedProvider>);
    
      const items = renderElement.getAllByRole(/listitem/)
      expect(items.length).toBe(3);
    });
    
    it('Renders add suggestions button', async () => {
      const renderElement = render(
        <MockedProvider addTypename={false}>
            <AutoComplete 
                label='input label' 
                filter='filter' 
                filteredSuggestions={['1', '2', '3']} 
                selectedSuggestions={['1']} 
                onFilterChange={() => console.log('filter')}
                onAddSuggestions={() => console.log('add')}
                onSelect={() => console.log('select')} />
        </MockedProvider>);
    
      const button = renderElement.getByRole(/button/)
      expect(button).toBeTruthy();
    });
});
