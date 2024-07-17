import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGeneralContext } from '../contexts/GeneralContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphStore = () => {
    const {darkMode} = useGeneralContext();
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/stores')
      .then(response => {
        setStoreData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las tiendas:', error);
      });
  }, []);

  const transformData = {
    labels: storeData.map(store => store.tienda),
    datasets: [
      {
        label: 'Popularidad',
        data: storeData.map(store => store.popularidad),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: '#9D2FF2',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Bar  data={transformData} options={options} />
    </div>
  );
};

export default GraphStore;
