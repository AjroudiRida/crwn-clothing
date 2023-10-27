import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";
const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toLowerCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
