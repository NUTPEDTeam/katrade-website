import { useHistory } from 'react-router-dom';
import './Recommend.css';

function Recommend(props: any) {
    const { item, index } = props;
    const history = useHistory();
    function LinkItemData() {
        history.push(`/app/product`);
    }

    return (
        <div className="recommend-card" onClick={LinkItemData}>
            <div 
                className="recommend-photo-card" 
                style={{ backgroundImage: `url(${item.photo_src})` }}
            >
            </div>
            <div className="recommend-text-card py-3">
                <p>{item.name_item}</p>
                <p className="desc item-desc text-truncate">Cat is weird when they are with human.</p>
            </div>
        </div>
    );
};

export default Recommend;