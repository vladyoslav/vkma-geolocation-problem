import { FC } from 'react';
import { View } from '@itznevikat/router';

import { AdaptivityLayout } from '@/components';
import { Home } from '@/pages';

/* eslint-disable react/jsx-key */
export const Layout: FC = () => {
  return (
    <AdaptivityLayout>
      <View nav="/">
        <Home nav="/" />
      </View>
    </AdaptivityLayout>
  );
};
