import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Dimensions, LogBox } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Importar íconos de clima
import sol from '../../images/icons_weather/sol.png';
import nubes from '../../images/icons_weather/parcialmente_nublado.png';
import parcialmente_nublado from '../../images/icons_weather/nube.png';
import lluvia from '../../images/icons_weather/lluvia.png';
import tormenta from '../../images/icons_weather/tormenta.png';
import nieve from '../../images/icons_weather/niieve.png';
import niebla from '../../images/icons_weather/niebla.png';
import viento from '../../images/icons_weather/viento.png';
import llovizna from '../../images/icons_weather/llovizna.png';

const LoadingSpinner = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Cargando datos del tiempo...</Text>
  </View>
);

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const currentDate = new Date();
  const formattedDate = `${daysOfWeek[currentDate.getDay()]} ${currentDate.getDate()} de ${monthsOfYear[currentDate.getMonth()]}`;

  const current = weatherData.currentConditions;
  const possibleConditions = {
    'Clear': 'Despejado',
    'Partially cloudy': 'Parcialmente Nublado',
    'Cloudy': 'Nublado',
    'Rain': 'Lluvia',
    'Thunderstorms': 'Tormentas',
    'Snow': 'Nieve',
    'Fog': 'Niebla',
    'Windy': 'Ventoso',
    'Overcast': 'Cubierto',
    'Drizzle': 'Llovizna',
    'Showers': 'Aguaceros',
    'Freezing Rain': 'Lluvia Helada',
    'Sleet': 'Aguacero de Hielo',
  };
  const currentCondition = possibleConditions[current.conditions as keyof typeof possibleConditions] || current.conditions;

  const weatherIcons: { [key: string]: any } = {
    'Clear': sol,
    'Partially cloudy': nubes,
    'Cloudy': nubes,
    'Rain': lluvia,
    'Thunderstorms': tormenta,
    'Snow': nieve,
    'Fog': niebla,
    'Windy': viento,
    'Overcast': parcialmente_nublado,
    'Drizzle': llovizna,
    'Showers': lluvia,
    'Freezing Rain': lluvia,
    'Sleet': lluvia,
  };

  const getIcon = (condition: string) => {
    for (const conditionKey in weatherIcons) {
      if (condition.startsWith(conditionKey)) {
        return weatherIcons[conditionKey];
      }
    }
    return null;
  };

  const labels = weatherData.days.slice(1, 16).map((day: any) => new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'short' }));
  const maxTemps = weatherData.days.slice(1, 16).map((day: any) => day.tempmax);
  const minTemps = weatherData.days.slice(1, 16).map((day: any) => day.tempmin);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pronóstico del Tiempo - Formosa, Argentina</Text>
      <Text style={styles.date}>{formattedDate}</Text>

      <View style={styles.currentConditions}>
        <View style={styles.currentMain}>
          <Image source={getIcon(current.conditions)} style={styles.weatherIcon} />
          <View style={styles.weatherDetails}>
            <Text style={styles.temperature}>{current.temp}°C</Text>
            <Text style={styles.condition}>{currentCondition}</Text>
          </View>
        </View>
        <View style={styles.currentDetails}>
          <Text style={styles.detailText}>Sensación térmica: {current.feelslike}°C</Text>
          <Text style={styles.detailText}>Humedad: {current.humidity}%</Text>
          <Text style={styles.detailText}>Viento: {current.windspeed} km/h</Text>
        </View>
      </View>
      <View style={{
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  padding: 15,
  marginVertical: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
}}>
  <Text style={{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  }}>
    Detalles
  </Text>
  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <View style={{
      width: '45%',
      marginBottom: 10,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
      }}>
        Amanecer: {current.sunrise}
      </Text>
    </View>
    <View style={{
      width: '45%',
      marginBottom: 10,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
      }}>
        Atardecer: {current.sunset}
      </Text>
    </View>
    <View style={{
      width: '45%',
      marginBottom: 10,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
      }}>
        Precipitación: {current.precip ? `${current.precip} mm` : "N/A"}
      </Text>
    </View>
    <View style={{
      width: '45%',
      marginBottom: 10,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
      }}>
        Presión: {current.pressure} hPa
      </Text>
    </View>
  </View>
</View>


      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pronóstico por horas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weatherData.days[0].hours.map((hour: any, index: number) => (
            <View key={index} style={styles.hourlyForecast}>
              <Text style={styles.hourlyTime}>{hour.datetime.slice(0, 5)}</Text>
              <Image source={getIcon(hour.conditions)} style={styles.smallWeatherIcon} />
              <Text style={styles.hourlyTemp}>{hour.temp}°C</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.dailyForecastContainer}>
        {weatherData.days.slice(1, 10).map((day: any, index: number) => (
          <View key={index} style={styles.dailyForecast}>
            <Text style={styles.dailyDate}>
              {new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })}
            </Text>
            <View style={styles.iconContainer}>
              <Image source={getIcon(day.conditions)} style={styles.smallWeatherIcon} />
            </View>
            <View style={styles.dailyTemps}>
              <Text style={styles.maxTemp}>{day.tempmax}°C</Text>
              <Text style={styles.minTemp}>{day.tempmin}°C</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.chartContainer}>
        {/* Código para el gráfico */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  currentConditions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  currentMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  weatherIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  weatherDetails: {
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
    color: '#888',
  },
  currentDetails: {
    justifyContent: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hourlyForecast: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  hourlyTime: {
    fontSize: 14,
    marginBottom: 4,
  },
  smallWeatherIcon: {
    width: 30,
    height: 30,
  },
  hourlyTemp: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dailyForecastContainer: {
    marginBottom: 20,
  },
  dailyForecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dailyDate: {
    fontSize: 14,
    textAlign: 'left',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dailyTemps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maxTemp: {
    fontSize: 16,
    color: '#f44336',
  },
  minTemp: {
    fontSize: 16,
    color: '#2196f3',
    marginLeft: 8,
  },
  chartContainer: {
    marginBottom: 20,
  },
});

export default WeatherPage;
