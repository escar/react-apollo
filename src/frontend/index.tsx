import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './app';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

const element = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(element);
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
