import { createContext, useEffect, useState } from "react";
import { getCollectionAndDocuments } from '../utils/firebase/firebase.js';

// import SHOP_DATA from '../../src/shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: []
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState([])
  // Add products object to firebase, fire this funct. once
  // useEffect(() => {
  //   addCollectionAndDocument('categories', SHOP_DATA)
  // },[]);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap)
    }

    getCategoriesMap();
  }, [])
  const value = {categoriesMap};
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  )
}
