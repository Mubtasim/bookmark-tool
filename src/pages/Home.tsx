import { addDoc, collection, getDocs } from 'firebase/firestore';
import AddBookmark from '../components/AddBookmark';
import AllBookmarks from '../components/AllBookmarks';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import Pokemon from '../types/Pokemon';
import { db } from '../firebaseConfig';

const Home = () => {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  const pokemonCollection = collection(db, 'pokemons');
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  const addDataToCollection = async (data: Pokemon) => {
    try {
      const result = await addDoc(pokemonCollection, data);
      return result;
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  if (data) {
    const toFireFromFire = async () => {
      try {
        const result = await addDataToCollection(data);
        console.log('Data added successfully', result);
        const fetchedData = await getDocs(pokemonCollection);
        // console.log('fetchedData', fetchedData);
        fetchedData.docs.forEach((doc) => {
          console.log('doc data', doc.data());
        });
      } catch (error) {
        console.log(error);
      }
    };
    toFireFromFire();
  }

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
