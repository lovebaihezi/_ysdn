import Carousel from './Carousel';
import Monographic from './monographic';
import VideosGrid from './recommend/videos';
import ArticlesGrid from './recommend/articles';
import Tags from './recommend/Tags';

export default function Index() {
    return (
        <>
            <Carousel />
            <Monographic />
            <ArticlesGrid />
            <VideosGrid />
            <Tags />
        </>
    );
}
