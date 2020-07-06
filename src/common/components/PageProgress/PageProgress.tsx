import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
// import { PageLoadProgress } from '@gannochenko/ui';
import { PageLoadProgress as PageLoadProgressInner } from '../PageLoadProgressInner';

import { PageProgressPropsType } from './type';
import { Container, Bar } from './style';
import { withState } from '../../mobx/context';

export const PageProgressComponent: FunctionComponent<PageProgressPropsType> = observer(
    ({ state }) => (
        <PageLoadProgressInner
            loading={state.loading}
            observeGlobalLock={false}
        >
            {({ progress, shown, fading }) => {
                console.log('SL: ' + state.loading);
                console.log(shown);
                console.log(progress);

                return (
                    <Container>
                        {shown && <Bar progress={progress} fading={fading} />}
                    </Container>
                );
            }}
        </PageLoadProgressInner>
    ),
);

export const PageProgress = withState(PageProgressComponent);
