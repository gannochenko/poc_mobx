import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { PageLoadProgress } from '@gannochenko/ui';

import { PageProgressPropsType } from './type';
import { Container, Bar } from './style';

export const PageProgress: FunctionComponent<PageProgressPropsType> = observer(
    ({ state }) => {
        console.log('L: ' + state.loading);

        return (
            <PageLoadProgress loading={state.loading}>
                {({ progress, shown, fading }) => (
                    <Container>
                        {shown && <Bar progress={progress} fading={fading} />}
                    </Container>
                )}
            </PageLoadProgress>
        );
    },
);
