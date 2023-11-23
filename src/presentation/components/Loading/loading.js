import React from 'react';
import { css } from '@emotion/react';
import { MoonLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <MoonLoader css={override} color={'#36D7B7'} loading={true} />
        </div>
    );
};

export default Loading;
