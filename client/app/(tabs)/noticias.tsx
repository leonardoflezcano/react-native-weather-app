import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Button, StyleSheet } from 'react-native';


const NewsWidget = ({ searchTerm = '' }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/noticia/all')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
      })
      .catch(error => {
        console.error('Error al obtener los artículos:', error);
      });
  }, []);

  // Filtrar las noticias obtenidas de la API
  const filteredNews = articles.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (index: number) => {
    setCurrentNewsIndex(index);
    setShowModal(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.newsWidget}>
        <Text style={styles.newsTitle}>Noticias sobre el Tiempo en Formosa</Text>
        <ScrollView contentContainerStyle={styles.newsGrid}>
          {filteredNews.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.newsCard}
              onPress={() => window.open(item.url, '_blank')} // Abrir la URL en una nueva pestaña
            >
              {/* Mostrar la imagen si está disponible */}
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.newsImage}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Imagen de respaldo
                />
              ) : (
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }} // Imagen predeterminada
                  style={styles.newsImage}
                />
              )}
              <View style={styles.newsContent}>
                <Text style={styles.newsCardTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {showModal && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {currentNewsIndex !== null && filteredNews[currentNewsIndex].title}
                </Text>
                <View style={styles.modalBody}>
                  <Comentario />
                </View>
                <Button title="Cerrar" onPress={() => setShowModal(false)} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para toda la página
  },
  newsWidget: {
    backgroundColor: '#FFFFFF', // Fondo blanco para el widget
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    minHeight: 600,
    zIndex: 1,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  newsGrid: {
    flexDirection: 'column',
    paddingBottom: 20,
  },
  newsCard: {
    backgroundColor: '#f3e5f5', // Fondo rosa suave
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d1c4e9',
    marginBottom: 15,
    flexDirection: 'column', // Asegura que la tarjeta crezca con su contenido
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a148c',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: '#424242',
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 15,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f3e5f5',
    padding: 20,
    borderRadius: 12,
    maxWidth: 600,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 10,
  },
  modalBody: {
    paddingVertical: 10,
  },
});

export default NewsWidget;
