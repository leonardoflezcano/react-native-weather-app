import React from 'react';
import { NewsItem } from '../types/news';
import styles from '../styles/NewsWidget.module.css';

interface NewsCardProps {
  news: NewsItem;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <div className={styles.newsCard} onClick={onClick}>
      <img
        src={news.image || 'https://via.placeholder.com/150'}
        alt={news.title}
        className={styles.newsImage}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/150';
        }}
      />
      <div className={styles.newsContent}>
        <h3 className={styles.newsCardTitle}>{news.title}</h3>
        <p className={styles.newsDescription}>{news.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;

