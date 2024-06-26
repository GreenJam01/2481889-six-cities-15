import Layout from '../../components/header-component/header-component';
import CitiesList from '../../components/cities-list/cities-list';
import { CITIES} from '../../constants';
import OffersCity from './offers/offers-city';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { offersSelectors, setCity } from '../../slices/offers/offers';
import Spinner from '../../components/spinner/spinner';
import NoOffers from './no-offers/no-offers';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const MainPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const cityName = params.city;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(cityName){
      const city = CITIES.find((i) => i.name === cityName);
      if(city) {
        dispatch(setCity(city));
      } else {
        navigate('/');
      }
    }
  }, [cityName, dispatch, navigate]);
  const isOffersDataLoading = useAppSelector(offersSelectors.getIsOffersDataLoading);
  const offers = useAppSelector(offersSelectors.getOffersByCityAndSort);
  return(
    <div className={`page page--gray page--main ${offers.length === 0 && 'page__main--index-empty'}`}>
      <Layout/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {<CitiesList cities={CITIES}/>}
            </ul>
          </section>
        </div>
        <div className="cities">
          {isOffersDataLoading && <Spinner/>}
          {!isOffersDataLoading && offers.length === 0 && <NoOffers/>}
          {!isOffersDataLoading && offers.length !== 0 && <OffersCity/>}
        </div>
      </main>
    </div>
  );
};
export default MainPage;
