import { AppData, CITIES, Sorts } from '../../constants';
import { City } from '../../types/city';
import { Offer, Offers } from '../../types/offer';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Sort } from '../../types/sort';
import { fetchOffersAction } from '../../store/api-actions';

export type OffersState = {
    city: City;
    offers: Offers;
    sort: Sort;
    isOffersDataLoading: boolean;
}
export const initialState : OffersState = {
  city: CITIES[0],
  offers: [],
  sort: Sorts.Popular,
  isOffersDataLoading: false,
};

const offersSlice = createSlice({
  initialState,
  name: AppData.Offers,
  reducers: {
    setCity: (state, action:PayloadAction<City>) => {
      state.city = action.payload;
    },
    setIsOffersDataLoading: (state, action:PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    setSort: (state, action:PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setFavoriteOffers: (state, action:PayloadAction<{offer: Offer; newBool: boolean}>) => {
      const newOffers = state.offers.map((offer) => {
        if (offer.id === action.payload.offer.id) {
          return {...offer, isFavorite: action.payload.newBool};
        }
        return offer;
      });
      state.offers = newOffers;
    },

  },
  extraReducers(builder) {
    builder.addCase(fetchOffersAction.fulfilled, (state, action) =>{
      state.isOffersDataLoading = false;
      state.offers = action.payload;
    });
    builder.addCase(fetchOffersAction.pending, (state) =>{
      state.isOffersDataLoading = true;
    });
  },
  selectors: {
    getCity: (state:OffersState) => state.city,
    getOffers: (state:OffersState) => state.offers,
    getSort: (state:OffersState) => state.sort,
    getIsOffersDataLoading: (state:OffersState) => state.isOffersDataLoading,
  }
});
export const {setFavoriteOffers, setCity, setIsOffersDataLoading, setSort} = offersSlice.actions;
const offersSelectors = {...offersSlice.selectors,
  getOffersByCityAndSort: createSelector(offersSlice.selectors.getOffers,
    offersSlice.selectors.getCity, offersSlice.selectors.getSort, (allOffers, city, sort) =>
      allOffers.filter((offer) => offer.city.name === city.name).sort(sort.func))};

export { offersSlice, offersSelectors};
