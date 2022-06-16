// Display only 4 products
import ProductCard from '../product-card/product-card';
import { Link } from "react-router-dom";
import { CategoryItem } from '../../store/categories/category-types';
import './category-preview.scss';

type CategoryPreview = {
  title: string,
  products: CategoryItem[]
}

const CategoryPreview = ({title, products}: CategoryPreview) => {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={title}>{title.toUpperCase()}</Link>
      </h2>
        <div className='preview'>
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
  );
}

export default CategoryPreview;