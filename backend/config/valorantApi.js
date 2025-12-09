const axios = require('axios');

const RIOT_API_KEY = process.env.RIOT_API_KEY || 'RGAPI-sua-chave-aqui';
const BASE_URL = 'https://br.api.riotgames.com';

async function getValorantContent() {
  try {
    const response = await axios.get(`${BASE_URL}/val/content/v1/contents`, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY
      },
      params: {
        locale: 'pt-BR'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar conteúdo do Valorant:', error.message);
    return null;
  }
}

module.exports = { getValorantContent };