import { createContext, useState } from "react";
import { OfferType } from "../types";

type Props = {
  children?: React.ReactNode;
};

type State = {
  offers: OfferType[];
  setOffers: (offers: OfferType[]) => void;
};

const initialState: State = {
  offers: [],
  setOffers: () => {},
};

export const OffersContext = createContext<State>(initialState);

export const OffersProvider = ({ children }: Props) => {
  const [offers, setOffers] = useState<OfferType[]>([]);

  return (
    <OffersContext.Provider value={{ offers, setOffers }}>
      {children}
    </OffersContext.Provider>
  );
};
