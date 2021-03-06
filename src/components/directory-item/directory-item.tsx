import './directory-item.scss'
import { useNavigate } from 'react-router-dom';

type Category = {
  category: {
    imageUrl: string,
    title: string,
    route: string
  }
}

const DirectoryItem = ({ category }: Category) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const routeHandler = () => navigate(route);

  return (
    <div className='directory-item-container' onClick={routeHandler}>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='body'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;
