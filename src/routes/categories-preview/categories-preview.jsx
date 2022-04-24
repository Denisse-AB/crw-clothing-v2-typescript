import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category-selector";
// import { CategoriesContext } from "../../context/categories-context";
import CategoryPreview from '../../components/category-preview/category-preview';
import Spinner from "../../components/spinner/spinner";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  // using redux
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
      // fragment shorthand
      <>
      {
        isLoading ? <Spinner />
        : Object.keys(categoriesMap).map((key) => {
          const products = categoriesMap[key];
          return <CategoryPreview key={key} title={key} products={products} />;
        })
      }
      </>
  );
}

export default CategoriesPreview;
