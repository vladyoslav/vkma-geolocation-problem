import { FC, useEffect, useState } from 'react';
import bridge, { VKUpdateConfigData } from '@vkontakte/vk-bridge';
import {
  AdaptivityProvider,
  AppRoot,
  Appearance,
  ConfigProvider,
  Platform,
  WebviewType,
  platform
} from '@vkontakte/vkui';
import { SMALL_TABLET_SIZE } from '@vkontakte/vkui/dist/components/AdaptivityProvider/AdaptivityProvider';

import { Layout } from '@/layout';

import '@/app.css';
import '@vkontakte/vkui/dist/vkui.css';
import { MapProvider } from 'react-map-gl';

export const App: FC = () => {
  const [platform, setPlatform] = useState<Platform>(currentPlatform);
  const [appearance, setAppearance] = useState<Appearance>();

  useEffect(() => {
    function updateConfig({
      appearance
    }: VKUpdateConfigData & { appearance?: Appearance }) {
      if (appearance) setAppearance(appearance);
    }

    bridge.send('VKWebAppGetConfig').then((config) => {
      updateConfig(config as VKUpdateConfigData);

      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === 'VKWebAppUpdateConfig')
          updateConfig(data as VKUpdateConfigData);
      });
    });

    bridge.send('VKWebAppInit');
  }, []);

  useEffect(() => {
    function onResize(): void {
      setPlatform(currentPlatform);
    }

    window.addEventListener('resize', onResize, false);
    return () => window.removeEventListener('resize', onResize, false);
  }, []);

  return (
    <ConfigProvider
      platform={platform}
      appearance={appearance}
      webviewType={
        platform === Platform.VKCOM ? WebviewType.INTERNAL : WebviewType.VKAPPS
      }
    >
      <AdaptivityProvider>
        <AppRoot noLegacyClasses>
          <MapProvider>
            <Layout />
          </MapProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

function currentPlatform(): Platform {
  if (window.innerWidth >= SMALL_TABLET_SIZE) return Platform.VKCOM;

  return platform() as Platform;
}
