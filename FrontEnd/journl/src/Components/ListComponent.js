import { Link } from "react-router-dom";
import '../Components/ListComponent.css';


const ListComponent = ({articles}) => {
        
    return  (
        <>
        {articles.length > 0 && articles.map(article =>(
            <div className="blur rounded-3 mb-3 article-box">
                <div className="ml-3 mr-3 content-box ">
                    {article && <Link className="Link content" to={`/articles/${article.name && article.name}`}>
                        <h3>{article.name}</h3>                        
                        <p>{article.content[0].substring(0,300)}...</p>
                    </Link>
                    }
                </div>
            </div>
        ))}
        </>
    );
}

export default ListComponent;