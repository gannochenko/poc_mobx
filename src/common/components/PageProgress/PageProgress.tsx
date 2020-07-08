import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { PageLoadProgress } from '@gannochenko/ui';

import { PageProgressPropsType } from './type';
import { Container, Bar } from './style';
import { withState } from '../../state/context';

export const PageProgressComponent: FunctionComponent<PageProgressPropsType> = observer(
    ({ state }) => (
        <PageLoadProgress loading={state.loading} observeGlobalLock={false}>
            {({ progress, shown, fading }) => (
                <Container>
                    {shown && <Bar progress={progress} fading={fading} />}
                </Container>
            )}
        </PageLoadProgress>
    ),
);

export const PageProgress = withState(PageProgressComponent);
