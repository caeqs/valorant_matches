const express = require('express');
const router = express.Router();
const { getValorantContent } = require('../config/valorantApi');

// Rota para buscar mapas e agentes
router.get('/content', async (req, res) => {
  try {
    const content = await getValorantContent();
    
    if (!content) {
      return res.status(500).json({ error: 'Erro ao buscar conteúdo' });
    }

    // Extrair apenas mapas e agentes
    const mapas = content.maps
      .filter(map => map.assetName !== 'Range') // Remove o tutorial
      .map(map => ({
        id: map.id,
        name: map.name,
        assetName: map.assetName
      }));

    const agentes = content.characters.map(char => ({
      id: char.id,
      name: char.name,
      assetName: char.assetName
    }));

    res.json({
      mapas,
      agentes
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao processar dados' });
  }
});

module.exports = router;