import Carousel from './Carousel';
import Monographic from './monographic';
import ArticlesGrid from './recommend/articles';

export default function Index() {
    return (
        <>
            <Carousel />
            <Monographic />
            <ArticlesGrid />
        </>
    );
}
