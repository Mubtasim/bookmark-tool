import AddBookmark from '../components/AddBookmark';
import AllBookmarks from '../components/AllBookmarks';
import { useGetPokemonByNameQuery } from '../services/pokemon';

const Home = () => {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  console.log(data);

  return (
    <div className='grid grid-cols-12 gap-4 p-5'>
      <div className='col-span-8 overflow-y-scroll no-scrollbar max-h-screen'>
        <AllBookmarks />
      </div>
      <div className='col-span-4'>
        <AddBookmark />
      </div>
    </div>
  );
};

export default Home;
