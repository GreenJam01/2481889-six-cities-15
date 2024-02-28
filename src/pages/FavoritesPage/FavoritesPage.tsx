import { Link } from 'react-router-dom';
import OfferCard from '../../components/OfferCard/OfferCard';
import { offerType } from '../../types/offer';
import { routes } from '../../constants';

type favoritesProps = {offers:offerType[]}
function FavoritesPage(props : favoritesProps){
  const cards = props.offers.map((i) =>
    (<OfferCard key={i.id}
      id={i.id}
      title={i.title}
      type={i.type}
      price={i.price}
      previewImage={i.previewImage}
      isFavorite={i.isFavorite}
      isPremium={i.isPremium}
      rating={i.rating}
      onMouseOver={() => null}
    // eslint-disable-next-line react/jsx-closing-bracket-location
    />
    ));
  return(
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={routes.Main}>
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <Link to={routes.Login}>
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cards}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cards}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={routes.Main}>
          <a className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </a>
        </Link>
      </footer>
    </div>
  );
}
export default FavoritesPage;
