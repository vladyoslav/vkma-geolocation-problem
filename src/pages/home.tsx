import { ErrorSnackbar, setSnackbar } from '@/components';
import { FC, useCallback, useState } from 'react';
import { Button, Div, NavIdProps, Panel, PanelHeader } from '@vkontakte/vkui';
import { Map as Mapbox, Marker, useMap } from 'react-map-gl';
import { mapboxToken } from '@/config';
import 'mapbox-gl/dist/mapbox-gl.css';
import './home.css';
import bridge, { ReceiveData } from '@vkontakte/vk-bridge';

type Location = {
  longitude: number;
  latitude: number;
  accuracy: number;
};

export const Home: FC<NavIdProps> = ({ nav }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const { map } = useMap();

  const updateLocation = useCallback(async () => {
    if (!bridge.supports('VKWebAppGetGeodata')) {
      return setSnackbar(
        <ErrorSnackbar>Платформа не поддерживает геолокацию!</ErrorSnackbar>
      );
    }

    try {
      setLocation(null);
      const data: ReceiveData<'VKWebAppGetGeodata'> = await bridge.send(
        'VKWebAppGetGeodata'
      );

      if (data.available) {
        setLocation({
          longitude: data.long,
          latitude: data.lat,
          accuracy: data.accuracy
        });
        map?.flyTo({
          center: [data.long, data.lat],
          zoom: 15
        });
      } else {
        setSnackbar(
          <ErrorSnackbar>
            Пожалуйста, включите геолокацию на устройстве!
          </ErrorSnackbar>
        );
      }
    } catch {
      setSnackbar(
        <ErrorSnackbar>Пожалуйста, разрешите геолокацию!</ErrorSnackbar>
      );
    }
  }, [map]);

  return (
    <Panel nav={nav}>
      <PanelHeader>Проблемка</PanelHeader>
      <Mapbox
        id="map"
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {location && <Marker {...location} />}
      </Mapbox>
      <div className="data-container">
        <Div className="data">
          long: {location?.longitude ?? 'null'} lat:{' '}
          {location?.latitude ?? 'null'} accuracy:{' '}
          {location?.accuracy ?? 'null'}
        </Div>
        <Button size="l" onClick={updateLocation} mode="overlay_primary">
          Запросить геолокацию
        </Button>
      </div>
    </Panel>
  );
};
