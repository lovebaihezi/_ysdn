import React from 'react';
import Carousel from './Carousel';
import Monographic from './monographic';
import QAGrid from './recommend/QA';
import ArticlesGrid from './recommend/articles';
import Tags from './recommend/Tags';

export default function Index() {
    return (
        <>
            <Carousel />
            <Monographic />
            <ArticlesGrid />
            <QAGrid />
            <Tags />
        </>
    );
}
