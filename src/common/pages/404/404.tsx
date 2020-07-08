import React from 'react';
import { RendererType } from '@gannochenko/ui';

import { Container, Layout } from '../../components';
import { SEO } from '../../components/SEO';
import { ErrorPage } from '../../components/ErrorPage';
import { useCurrentPageName, useScrollTop } from '../../lib';

// eslint-disable-next-line global-require
const image = require('./assets/image.jpg').default as string;

export const NotFoundPage = ({ state }) => {
    useScrollTop();
    useCurrentPageName(state, 'notFound');

    return (
        <>
            <SEO title="404 &mdash; Not found" />
            <Container>
                <ErrorPage
                    code="404"
                    message="Not found."
                    image={image}
                    imageAuthor="Giuseppe Martini"
                    imageSource="https://unsplash.com/@bear61"
                    imageSourceText="Unsplash"
                />
            </Container>
        </>
    );
};

export const NotFoundPageRenderer: RendererType = () => (
    <Layout>
        <NotFoundPage />
    </Layout>
);
