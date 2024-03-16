/* eslint-disable react/jsx-closing-tag-location */
import { useParams } from 'react-router-dom';
import { offers } from '../../mocks/offers';
import { reviews } from '../../mocks/reviews';
import ReviewForm from '../../components/review-form/review-form';
import Error404 from '../error404/error404';
import { Layout } from '../../components/layout/layout';
import Map from '../../components/map/map';
import { OfferList } from '../../components/offer-list/offer-list';
import { Cities } from '../../mocks/city';
import { OfferGallery } from './offer-gallery/OfferGalery';

function OfferPage(): JSX.Element {
  const param = useParams();
  const offer = offers.find((i) => i.id === param.id, offers[0]);
  const nearPlaces = offers.filter((i) => i.id !== param.id);


  if (!offer) {
    return (<Error404/>);
  }
  return (
    <Layout>
      <div className="page">
        <main className="page__main page__main--offer">
          <section className="offer">
            <OfferGallery photos={[offer.previewImage, ...offer.images]}/>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium ? <div className="offer__mark"><span>Premium</span></div> : null}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${offer.rating * 20}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">Whats inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((i)=>
                      <li key={i} className="offer__inside-item">{i}</li>)}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    <span className="offer__user-status">{offer.host.isPro}</span>
                  </div>
                  <div className="offer__description">
                    {offer.description}
                  </div>
                </div>
                <ReviewForm reviews={reviews}/>
              </div>
            </div>
            <Map className='offer__map' city={Cities[0]} offers={nearPlaces} selectedOffer={null}/>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <OfferList type="near-places" offers={nearPlaces}/>
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default OfferPage;