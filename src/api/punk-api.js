import axios from "axios";

// https://punkapi.com/documentation/v2
const ENDPOINT = "https://api.punkapi.com/v2";

export const api = {
  /**
	  abv_gt	number	Returns all beers with ABV greater than the supplied number
		abv_lt	number	Returns all beers with ABV less than the supplied number
		ibu_gt	number	Returns all beers with IBU greater than the supplied number
		ibu_lt	number	Returns all beers with IBU less than the supplied number
		ebc_gt	number	Returns all beers with EBC greater than the supplied number
		ebc_lt	number	Returns all beers with EBC less than the supplied number
		beer_name	string	Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
		yeast	string	Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		brewed_before	date	Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
		brewed_after	date	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
		hops	string	Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		malt	string	Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		food	string	Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		ids	string (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol.
	 */
  getBeers: (options) => {
    const { page = 1, perPage = 33 } = options;
    let requestUrl = `${ENDPOINT}/beers?page=${page}&per_page=${perPage}`;

    return axios.get(requestUrl).then((result) => {
      return result.data;
    });
  },
  getRandomBeer: () => {
    return axios.get(`${ENDPOINT}/beers/random`).then((result) => {
      return result.data[0];
    });
  },
  getBeerById: (id) => {
    return axios.get(`${ENDPOINT}/beers/${id}`).then((result) => {
      return result.data[0];
    });
  },
};
