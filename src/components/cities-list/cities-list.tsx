import classNames from 'classnames';
import { useActionCreators, useAppSelector } from '../../hooks/use-app';
import { offersAction, offersSelectors } from '../../slices/offers';
import { City } from '../../types/city';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';

type CitiesListProps = {cities: City[]}

export const CitiesList = (props:CitiesListProps) => {
  const {setCity} = useActionCreators(offersAction);
  const city = useAppSelector(offersSelectors.city);
  return(
    props.cities.map((c) => (
      <li className="locations__item" key={c.name}>
        <Link
          className={classNames('locations__item-link', 'tabs__item',
            {'tabs__item--active': c.name === city.name})}
          onClick={()=> setCity(c)}
          to={AppRoutes.Main}
        >
          <span>{c.name}</span>
        </Link>
      </li>)));
};
