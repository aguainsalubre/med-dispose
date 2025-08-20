<template>
  <div class="h-screen w-screen relative">
    <!-- Alert for Demo Mode -->
    <div v-if="!apiKey" class="absolute top-0 left-0 right-0 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 z-30" role="alert">
      <p class="font-bold">Modo Demonstração:</p>
      <p>Este é um mapa simulado. Para usar o Google Maps real, você precisará obter uma chave da API do Google Maps.</p>
    </div>

    <!-- Botão de voltar flutuante -->
    <button 
      @click="$router.go(-1)" 
      class="absolute top-4 left-4 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
    </button>

    <!-- Map Container - Tela Cheia -->
    <div id="map" class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
      <div v-if="loadingLocation" class="flex flex-col items-center">
        <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-3">Obtendo sua localização...</p>
      </div>
      <div v-else-if="locationError" class="text-red-600">
        Erro ao obter localização: {{ locationError }}
      </div>
      <div v-else-if="!mapLoaded" class="text-gray-500">
        Carregando mapa...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const apiKey = ref('AIzaSyC5hy4SCnyZNX2yRGi-z94uOSmS6JYmATo'); // Sua chave da API do Google Maps
const map = ref(null);
const userLocation = ref(null);
const loadingLocation = ref(true);
const locationError = ref(null);
const mapLoaded = ref(false);
const farmacias = ref([]);

// Dados de farmácias de exemplo (substituir por dados reais do backend)
const locaisDescarteExemplo = [
  {
    id: 1,
    nome: 'Farmácia Central',
    endereco: 'Rua Principal, 123, Centro',
    latitude: -22.245,
    longitude: -45.69,
    // Adicionando campos para compatibilidade com o display
    avaliacao: 4.5,
    numAvaliacoes: 120,
    distancia: 0.5,
    aberta: true,
    vinteQuatroHoras: false,
  },
  {
    id: 2,
    nome: 'Drogaria Popular',
    endereco: 'Av. Secundária, 456, Bairro Novo',
    latitude: -22.248,
    longitude: -45.685,
    avaliacao: 4.0,
    numAvaliacoes: 80,
    distancia: 1.2,
    aberta: true,
    vinteQuatroHoras: true,
  },
  {
    id: 3,
    nome: 'Farmácia Bem Estar',
    endereco: 'Praça da Matriz, 789, Centro Histórico',
    latitude: -22.242,
    longitude: -45.695,
    avaliacao: 4.8,
    numAvaliacoes: 200,
    distancia: 0.8,
    aberta: false,
    vinteQuatroHoras: false,
  },
  {
    id: 4,
    nome: 'Farmácia do Povo',
    endereco: 'Rua das Flores, 101, Jardim Botânico',
    latitude: -22.25,
    longitude: -45.70,
    avaliacao: 3.9,
    numAvaliacoes: 50,
    distancia: 2.1,
    aberta: true,
    vinteQuatroHoras: false,
  },
  {
    id: 5,
    nome: 'Drogaria Saúde',
    endereco: 'Av. do Contorno, 321, Vila Rica',
    latitude: -22.255,
    longitude: -45.68,
    avaliacao: 4.2,
    numAvaliacoes: 150,
    distancia: 1.8,
    aberta: true,
    vinteQuatroHoras: false,
  },
];

const selectFarmacia = (farmacia) => {
  // Lógica para centralizar o mapa na farmácia selecionada
  console.log('Farmácia selecionada:', farmacia);
  if (map.value && window.google) {
    const latLng = new window.google.maps.LatLng(farmacia.latitude, farmacia.longitude);
    map.value.setCenter(latLng);
    map.value.setZoom(15); // Zoom para ver a farmácia mais de perto
  }
};

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        loadingLocation.value = false;
        initMap();
      },
      (error) => {
        locationError.value = error.message;
        loadingLocation.value = false;
        // Fallback para localização padrão se houver erro
        userLocation.value = { lat: -22.245, lng: -45.69 }; // Localização padrão (Itajubá, MG)
        initMap();
      }
    );
  } else {
    locationError.value = 'Geolocalização não é suportada por este navegador.';
    loadingLocation.value = false;
    // Fallback para localização padrão
    userLocation.value = { lat: -22.245, lng: -45.69 }; // Localização padrão (Itajubá, MG)
    initMap();
  }
};

const initMap = () => {
  // Verificar se todos os requisitos estão atendidos
  if (!userLocation.value) {
    console.log('Aguardando localização do usuário...');
    return;
  }
  
  if (!document.getElementById('map')) {
    console.log('Elemento do mapa não encontrado...');
    return;
  }
  
  if (!window.google || !window.google.maps) {
    console.log('Google Maps API não carregada...');
    return;
  }

  console.log('Inicializando mapa...');

  try {
    map.value = new window.google.maps.Map(document.getElementById('map'), {
      center: userLocation.value,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    
    mapLoaded.value = true;
    console.log('Mapa inicializado com sucesso');

    // Adicionar marcador para a localização do usuário
    new window.google.maps.Marker({
      position: userLocation.value,
      map: map.value,
      title: 'Sua Localização',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });

    // Adicionar marcadores para as farmácias
    farmacias.value = locaisDescarteExemplo; // Usando dados de exemplo por enquanto
    farmacias.value.forEach(farmacia => {
      const marker = new window.google.maps.Marker({
        position: { lat: farmacia.latitude, lng: farmacia.longitude },
        map: map.value,
        title: farmacia.nome,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h4 class="font-semibold">${farmacia.nome}</h4>
            <p>${farmacia.endereco}</p>
            <p>Avaliação: ${farmacia.avaliacao} (${farmacia.numAvaliacoes})</p>
            <p>Distância: ${farmacia.distancia} km</p>
            <p>${farmacia.aberta ? 'Aberta' : 'Fechada'} ${farmacia.vinteQuatroHoras ? '(24h)' : ''}</p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map.value, marker);
      });
    });
  } catch (error) {
    console.error('Erro ao inicializar mapa:', error);
    locationError.value = 'Erro ao inicializar o mapa';
    loadingLocation.value = false;
  }
};

const loadGoogleMapsScript = () => {
  // Se o Google Maps já está carregado, inicializar diretamente
  if (window.google && window.google.maps) {
    getUserLocation();
    return;
  }

  // Verificar se o script já está sendo carregado
  if (document.querySelector('script[src*="maps.googleapis.com"]')) {
    // Script já existe, aguardar carregamento
    const checkGoogleMaps = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(checkGoogleMaps);
        getUserLocation();
      }
    }, 100);
    return;
  }

  // Criar e carregar o script do Google Maps
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.value}&libraries=places&callback=initGoogleMaps`;
  script.async = true;
  script.defer = true;
  
  // Definir callback global antes de adicionar o script
  window.initGoogleMaps = () => {
    getUserLocation();
  };
  
  script.onload = () => {
    console.log('Google Maps API carregada com sucesso');
  };

  script.onerror = () => {
    console.error('Erro ao carregar a API do Google Maps');
    locationError.value = 'Erro ao carregar a API do Google Maps. Verifique sua chave.';
    loadingLocation.value = false;
    // Fallback para localização padrão se a API não carregar
    userLocation.value = { lat: -22.245, lng: -45.69 }; // Localização padrão (Itajubá, MG)
    initMap();
  };

  document.head.appendChild(script);
};

onMounted(() => {
  nextTick(() => {
    loadGoogleMapsScript();
  });
});
</script>

<style scoped>
#map {
  min-height: 100vh; /* Garante que o mapa tenha altura total da tela */
}
</style>


