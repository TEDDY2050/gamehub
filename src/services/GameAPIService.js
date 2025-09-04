// GameAPIService.js - Handles multiple gaming APIs

class GameAPIService {
  constructor() {
    // API configurations
    this.apis = {
      gamezop: {
        baseUrl: 'https://api.gamezop.com/v2',
        // You need to register at business.gamezop.com for API key
        apiKey: 'YOUR_GAMEZOP_API_KEY',
        embedUrl: 'https://games.gamezop.com'
      },
      htmlgames: {
        baseUrl: 'https://www.htmlgames.com',
        // Free to use with their ads
        indexUrl: 'https://www.htmlgames.com/rss.xml'
      },
      gamepix: {
        baseUrl: 'https://gamepix.com',
        // Register at partners.gamepix.com
        partnerId: 'YOUR_GAMEPIX_PARTNER_ID'
      },
      marketjs: {
        baseUrl: 'https://api.marketjs.com',
        // Premium service - contact marketjs.com
        apiKey: 'YOUR_MARKETJS_API_KEY'
      }
    };

    this.games = [];
  }

  // Gamezop API Integration
  async fetchGamezopGames() {
    try {
      const response = await fetch(`${this.apis.gamezop.baseUrl}/games`, {
        headers: {
          'Authorization': `Bearer ${this.apis.gamezop.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.games.map(game => ({
          id: game.id,
          title: game.name,
          thumbnail: game.thumbnail,
          category: game.category,
          embedUrl: `${this.apis.gamezop.embedUrl}/${game.id}`,
          source: 'gamezop',
          description: game.description
        }));
      }
    } catch (error) {
      console.error('Gamezop API Error:', error);
    }
    return [];
  }

  // HTML Games Integration (Free)
  async fetchHTMLGames() {
    try {
      // These are free HTML5 games that can be embedded
      return [
        {
          id: 'tetris-html',
          title: 'Tetris Classic',
          thumbnail: '/api-games/tetris.png',
          category: 'puzzle',
          embedUrl: 'https://www.htmlgames.com/embed/tetris-classic',
          source: 'htmlgames',
          description: 'Classic Tetris game'
        },
        {
          id: 'snake-html',
          title: 'Snake Game',
          thumbnail: '/api-games/snake.png',
          category: 'arcade',
          embedUrl: 'https://www.htmlgames.com/embed/snake',
          source: 'htmlgames',
          description: 'Classic Snake game'
        },
        {
          id: 'pacman-html',
          title: 'Pac-Man',
          thumbnail: '/api-games/pacman.png',
          category: 'arcade',
          embedUrl: 'https://www.htmlgames.com/embed/pacman',
          source: 'htmlgames',
          description: 'Classic Pac-Man game'
        },
        {
          id: 'breakout-html',
          title: 'Breakout',
          thumbnail: '/api-games/breakout.png',
          category: 'arcade',
          embedUrl: 'https://www.htmlgames.com/embed/breakout',
          source: 'htmlgames',
          description: 'Classic Breakout game'
        },
        {
          id: 'frogger-html',
          title: 'Frogger',
          thumbnail: '/api-games/frogger.png',
          category: 'arcade',
          embedUrl: 'https://www.htmlgames.com/embed/frogger',
          source: 'htmlgames',
          description: 'Classic Frogger game'
        }
      ];
    } catch (error) {
      console.error('HTML Games Error:', error);
    }
    return [];
  }

  // Free alternative games (using existing web games)
  getFreeEmbedGames() {
    return [
      {
        id: '2048-game',
        title: '2048',
        thumbnail: '/api-games/2048.png',
        category: 'puzzle',
        embedUrl: 'https://play2048.co',
        source: 'web',
        description: 'Popular 2048 number puzzle'
      },
      {
        id: 'slither-io',
        title: 'Slither.io',
        thumbnail: '/api-games/slither.png',
        category: 'multiplayer',
        embedUrl: 'https://slither.io',
        source: 'web',
        description: 'Multiplayer snake game'
      },
      {
        id: 'agar-io',
        title: 'Agar.io',
        thumbnail: '/api-games/agar.png',
        category: 'multiplayer',
        embedUrl: 'https://agar.io',
        source: 'web',
        description: 'Multiplayer cell game'
      },
      {
        id: 'diep-io',
        title: 'Diep.io',
        thumbnail: '/api-games/diep.png',
        category: 'shooter',
        embedUrl: 'https://diep.io',
        source: 'web',
        description: 'Tank shooter game'
      },
      {
        id: 'wordle',
        title: 'Wordle',
        thumbnail: '/api-games/wordle.png',
        category: 'word',
        embedUrl: 'https://www.nytimes.com/games/wordle/index.html',
        source: 'web',
        description: 'Daily word puzzle'
      },
      {
        id: 'chess-com',
        title: 'Chess.com',
        thumbnail: '/api-games/chess.png',
        category: 'strategy',
        embedUrl: 'https://www.chess.com/play/computer',
        source: 'web',
        description: 'Play chess online'
      },
      {
        id: 'sudoku-web',
        title: 'Sudoku',
        thumbnail: '/api-games/sudoku.png',
        category: 'puzzle',
        embedUrl: 'https://sudoku.com/easy/',
        source: 'web',
        description: 'Classic Sudoku puzzle'
      },
      {
        id: 'solitaire-web',
        title: 'Solitaire',
        thumbnail: '/api-games/solitaire.png',
        category: 'card',
        embedUrl: 'https://solitaire.org',
        source: 'web',
        description: 'Classic Solitaire card game'
      }
    ];
  }

  // Get all games from all sources
  async getAllGames() {
    try {
      const [gamezopGames, htmlGames, freeGames] = await Promise.all([
        this.fetchGamezopGames(),
        this.fetchHTMLGames(),
        Promise.resolve(this.getFreeEmbedGames())
      ]);

      this.games = [
        ...gamezopGames,
        ...htmlGames,
        ...freeGames
      ];

      return this.games;
    } catch (error) {
      console.error('Error fetching games:', error);
      // Return free games as fallback
      return this.getFreeEmbedGames();
    }
  }

  // Get games by category
  getGamesByCategory(category) {
    return this.games.filter(game => 
      game.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Search games
  searchGames(query) {
    return this.games.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get embed HTML for a game
  getEmbedHTML(gameId, width = '800', height = '600') {
    const game = this.games.find(g => g.id === gameId);
    if (!game) return null;

    return `
      <iframe 
        src="${game.embedUrl}" 
        width="${width}" 
        height="${height}" 
        frameborder="0" 
        allowfullscreen
        allow="gamepad; microphone; camera"
        style="border: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);"
      ></iframe>
    `;
  }
}

export default new GameAPIService();